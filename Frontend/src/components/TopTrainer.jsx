import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopTrainer = () => {

  const navigate = useNavigate();
  const {trainersData} = useContext(AppContext) 

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Meet Our Certified Pilates Instructors</h1>
      <p className='sm:w-1/2 text-center text-sm'>Our team of certified Pilates instructors is dedicated to helping you reach your fitness and wellness goals. </p>
      <div className='w-full grid grid-cols-auto gap-10 pt-5 gap-y-6 px-3 sm:px-0'>
        {trainersData.slice(0,8).map((item,index)=>(
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
        ))}
      </div>
      <button onClick={()=>{ navigate('/instructors');scrollTo(0,0)}} className='bg-primary text-black px-12 py-3 rounded-full mt-10'>More</button>
    </div>
  )
}

export default TopTrainer
