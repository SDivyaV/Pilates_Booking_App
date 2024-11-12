import React from 'react';
import about_us from '../assets/about_us.webp'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p className='text-gray-700 font-medium'>About Us</p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img src={about_us} alt='' className='w-full md:max-w-[360px]'/>
        <div className='flex flex-col justify-center gap-4 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to Pilates App.Pilates app is designed to bring the rejuvenating power of Pilates right to your fingertips, no matter where you are.</p>
          <p>We connect you with professional instructors, guided routines, and a supportive community to help you reach your wellness goals.</p>
          <p>Whether you're a beginner or a seasoned Pilates enthusiast, our app provides you with everything you need to build strength, flexibility, and mindfulness.</p>
        </div>
      </div>

      <div className='text-sl my-4'>
        <p className='text-gray-700 font-semibold'>What We Offer</p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 ms:px-16 py-8 sm:py-12 rounded-lg mr-4 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Professional Instructors</b>
          <p>Access highly qualified Pilates instructors who bring expertise, enthusiasm, and personalized guidance to your practice.</p>
        </div>

        <div className='border px-10 ms:px-16 py-8 sm:py-12 rounded-lg mr-4 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Flexible Booking System</b>
          <p> Easily browse, book, and manage your appointments with instructors based on your schedule. No more hassle of phone calls or coordination issues.</p> 
        </div>

        <div className='border px-10 ms:px-16 py-8 sm:py-12 rounded-lg flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Customizable Workouts</b>
          <p>Choose from a variety of workouts tailored to different skill levels, body goals, and time constraints. From quick stretches to full-length classes, there's something for everyone.</p>
        </div>
      </div>
    </div>
  )
}

export default About
