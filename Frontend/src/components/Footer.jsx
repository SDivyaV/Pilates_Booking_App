import React from 'react';

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-14 my-10 mt-40 text-sm">

        {/* Left Section */}
        <div className="flex flex-col items-start text-center sm:text-left">
          <img 
            src="https://t3.ftcdn.net/jpg/03/62/27/68/360_F_362276875_1JHK5DLxW4KAYKqsaGXn2MQV8yUjkm1c.jpg" 
            alt="Pilates logo" 
            className="mb-5 w-40 mx-auto sm:mx-0" 
          />
          <p className="text-gray-600 leading-6">
            Achieve your fitness goals with certified Pilates instructors and flexible booking options. Enhance your wellness journey with expert guidance. Join our community today for a balanced and healthy lifestyle.
          </p>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <p className="text-xl font-medium mb-5 mt-5 ml-20">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600 ml-20">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <p className="text-xl font-medium mb-5 mt-5">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Phone: +91 98765 43210</li>
            <li>Email: pilatesfitapp@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Text */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          &copy; 2024Pilates - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
