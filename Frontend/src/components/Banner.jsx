import React from 'react';
//import Banner_img from '../assets/Banner_img.jpeg'
import Banner_1 from '../assets/Banner_1.webp';
import { useNavigate } from 'react-router-dom';

const Banner = () => {

  const navigate = useNavigate();

  return (
    <div className='relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden'>
      <img src={Banner_1} alt='Banner_img' className="w-full h-full object-cover"/>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-50 p-6">
        <div className="text-white max-w-lg text-left space-y-4 ml-0">
          <p className="text-3xl font-bold">
            Book Appointment
            <br />
            With Certified Instructors
          </p>
          <button onClick={() => {navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner;
