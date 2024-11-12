import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Instructors = () => {

  const { speciality } = useParams();

  const navigate = useNavigate();

  const [ filterTrainer, setFilterTrainer ] = useState([]);

  const { trainersData } = useContext(AppContext);

  const applyFilter = () => {
    if(speciality) {
      setFilterTrainer(trainersData.filter(trainer => trainer.speciality === speciality))
    }
    else{
      setFilterTrainer(trainersData)
    }
  }

  useEffect(() => {
    applyFilter();
  },[trainersData, speciality]);

  return (
    <div>
      <p className='text-black text-lg text-center font-medium'>Explore our team of specialized trainers.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='w-full grid grid-cols-auto gap-8 gap-y-6'>
          {filterTrainer.map((item,index)=>( 
                <div onClick={()=>navigate(`/appointments/${item._id}`)} key={index} className='border border-blue-200 rounded-md cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                   <img src={item.image} alt='' className='w-35 h-35 object-cover rounded-md bg-blue-50'/>
                   <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-800'>
                      <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                   </div>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default Instructors
