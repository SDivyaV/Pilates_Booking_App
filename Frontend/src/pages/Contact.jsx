import React from 'react';
import contact_us from '../assets/contact_us.webp'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p className='text-gray-700 font-semibold'>Contact Us</p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img src={contact_us} alt='' className='w-full md:max-w-[360px]'/>

        <div className='flex flex-col justify-center items-start gap-6 '>
          <p className='text-sm text-gray-600'>We’d love to hear from you! Whether you have questions about Pilates app, need support, or want to share feedback, our team is here to help you every step of the way. Reach out to us through any of the following channels, and we’ll get back to you as soon as possible.</p>
          <p className='text-black'>Email: support@pilatesapp.com</p>
          <p className='text-black'>Phone:+91 98765 43210</p>
          <p className='text-sm text-gray-600'>Our customer support team is available from Monday to Friday, 9:00 AM to 6:00 PM IST.</p>
          <p className='text-sm text-gray-600'>Thank you for choosing us to be part of your wellness journey!</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
