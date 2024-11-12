import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointments = () => {

  const { backendUrl, token, getTrainerData } = useContext(AppContext)

  const [sessions,setSessions] = useState([])

  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserSessions = async () => {
    try {

      const {data} = await axios.get(backendUrl + '/api/user/sessions',{ headers: {token}})

      if(data.success) {
        setSessions(data.sessions.reverse())
        console.log(data.sessions)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelSession = async (sessionId) => {
    try {
      
      const {data} = await axios.post(backendUrl + '/api/user/cancel-session',{sessionId},{headers:{token}})

      if(data.success){
        toast.success(data.message || 'Appointment Cancelled')
        getUserSessions()
        getTrainerData()
      } else {
        toast.error(data.message || 'Failed to Cancel Appointment')
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(token) {
      getUserSessions()
    }
  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {sessions.map((item,index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
            <div>
              <img src={item.trainerData.image} alt='' className='w-32 rounded-lg bg-indigo-50'/>
            </div>
            <div className='flex-1 text-sm text-gray-600'>
              <p className='text-neutral-800 font-bold'>{item.trainerData.name}</p>
              <p>{item.trainerData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-sm'>{item.trainerData.address}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && <button onClick={() => cancelSession(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
              {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Appointments
