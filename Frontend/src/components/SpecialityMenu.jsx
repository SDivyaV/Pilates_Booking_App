import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 '>
      <h1 className='text-3xl font-medium'>Discover Your Perfect Pilates Fit</h1>
      <p className='sm:w-1/2 text-center text-md'>Explore classes tailored to your needs, from flexibility to strength.<br />Find the right Pilates style to fit your lifestyle and goals.</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {specialityData.map((item,index) => (
                <Link 
                    onClick={() => scrollTo(0, 0)} 
                    key={index} 
                    to={`/instructors/${item.speciality}`} 
                    className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
                    <img src={item.image} alt='' className='rounded-full h-24 w-24 mb-2 object-cover'/>
                    <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu
