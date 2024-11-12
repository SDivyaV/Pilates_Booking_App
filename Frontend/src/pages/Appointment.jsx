import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import blue_tick from '../assets/blue_tick.webp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { toast } from 'react-toastify';
import axios from 'axios';


const Appointment = () => {

  const navigate = useNavigate()

  const {trainerId} = useParams()

  const {trainersData, backendUrl, token, getTrainerData} = useContext(AppContext)

  const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  const [trainerInfo , setTrainerInfo ] = useState(null)

  const [trainerSlot, setTrainerSlot ] = useState([])

  const [slotIndex, setSlotIndex ] = useState(0)

  const [slotTime, setSlotTime ] = useState('')

  const fetchTrainerInfo = async () => {
    const trainerInfo = trainersData.find(trainer => trainer._id === trainerId);
    setTrainerInfo(trainerInfo);
  };

  const getAvailableSlot = async () => {
    setTrainerSlot([])
    
    // getting current date
    let today = new Date()

    for(let i = 0;i < 7;i++) {
      //getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      //setting end time of the date with the index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)

      //setting hours
      if(today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})
        
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = trainerInfo?.slots_booked?.[slotDate] && 
          trainerInfo.slots_booked[slotDate].include(slotTime) ? 
          false : true

        if(isSlotAvailable) {
          //add slot to time array
          timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
          })
        }

        //Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setTrainerSlot(prev => ([...prev, timeSlots]))
    }

  }

  const bookSession = async () => {
    if(!token) {
      toast.warn('Login to book session')
      return navigate('/login')
    }

    try {
      const date = trainerSlot[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year
      const { data } = await axios.post(`${backendUrl}/api/user/book-session`, 
        { trainerId: String(trainerId), slotDate, slotTime },
        { headers: { token } }
      );

      if(data.success){
        toast.success(data.message)
        getTrainerData()
        navigate('/appointment')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
        console.log(error.response?.data);  // log the response error message from the backend
        toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    fetchTrainerInfo();
  }, [trainersData, trainerId]);

  useEffect(() => {
    getAvailableSlot()
  },[trainerInfo])


  useEffect(() => {
    console.log(trainerSlot)
  },[trainerSlot])

  return trainerInfo && (
    <div>
      {/* ----Trainer Details------ */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img src={trainerInfo.image} alt='' className='w-full h-full object-cover sm:max-w-72 rounded-lg'/>
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* -----------Trainer Info -> name,certification,experience----- */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {trainerInfo.name} 
            <img src={blue_tick} alt="" className='w-5 h-5'/>
          </p>
          <div className='items-center gap-2 text-sm mt-1 text-gray-600'>
            <p className='text-lg text-black mb-3 mt-2'>{trainerInfo.speciality} <button className='py-0.5 px-2 border text-xs rounded-full ml-5'>{trainerInfo.experience}</button></p>
            <p className='text-black'>{trainerInfo.certification}</p>
          </div>

          {/* -----Trainer About */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About 
              <InfoOutlinedIcon />
            </p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{trainerInfo.about}</p>
          </div>
          <p className='text-black font-medium mt-4'>
            Session Fee: <span className='text-gray-600'>{trainerInfo.fees}</span></p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 text-sm'>
        <p>Booking Slots</p>
        <div className='flex gap-5 items-center w-full overflow-x-scroll mt-4'>
          {
            trainerSlot.length && trainerSlot.map((item,index)=>(
              <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-2 px-3 min-w-16 rounded-lg cursor-pointer transition duration-200 transform ${slotIndex === index ? 'bg-primary text-white shadow-md scale-105' : 'border border-gray-200 hover:bg-gray-100 hover:shadow-sm'}`}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-2 w-full overflow-x-scroll mt-4'>
          {/*To get the time */}
          {trainerSlot.length && trainerSlot[slotIndex].map((item,index) => (
            <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white shadow-md scale-105' : 'border border-gray-200 hover:bg-gray-100 hover:shadow-sm'}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookSession} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book Session</button>
      </div>
    </div>
  )
}

export default Appointment
