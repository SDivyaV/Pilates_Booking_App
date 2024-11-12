import React from 'react';
import Header_1 from '../assets/Header_1.jpg';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Header = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
      {/* Image */}
      <img src={Header_1} alt="Pilates Header" className="w-full h-full object-cover" />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-50 p-6">
        <div className="text-white max-w-lg text-left space-y-4 ml-0">
          <p className="text-3xl font-bold">
            Book Appointment <br /> With Certified Instructors
          </p>
          <p className="text-lg leading-relaxed">
            We connect you with certified instructors who tailor each session to your unique needs and goals. 
            <br />
            Book a session today to experience the transformative benefits of Pilates – from improved flexibility and core strength to stress relief and better posture.
          </p>
          <a href="#speciality" className="flex items-center gap-1 px-1 py-3 text-lg m-auto md:m-0  text-white ">
            Book Session <ArrowRightAltIcon className="ml-2 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
