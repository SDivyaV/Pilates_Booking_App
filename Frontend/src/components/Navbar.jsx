import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { AppContext } from '../context/AppContext';


const Navbar = () => {

    const navigate = useNavigate();

    const {token,setToken,userData} = useContext(AppContext)

    const [showMenu,setShowMenu] = useState(false);

    const logout = () => {
      setToken(false)
      localStorage.removeItem('token')
    }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={() => navigate('/')} src='https://t3.ftcdn.net/jpg/03/62/27/68/360_F_362276875_1JHK5DLxW4KAYKqsaGXn2MQV8yUjkm1c.jpg' alt='' className='w-44 cursor-pointer' />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>Home</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/instructors'>
            <li className='py-1'>Instructors</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
           token && userData 
           ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={userData.image} alt=''/>
              <KeyboardArrowDownIcon className='w-2.5'/>
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p className='hover:text-black cursor-pointer' onClick={()=>navigate('/profile')}>My Profile</p>
                  <p className='hover:text-black cursor-pointer' onClick={()=>navigate('/appointment')}>My Appointments</p>
                  <p className='hover:text-black cursor-pointer' onClick={logout}>Logout</p>
                </div>
              </div>
           </div>
           :
           <button onClick={() => navigate('/login')}  className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
        }
        <MenuIcon className='w-6 md:!hidden cursor-pointer' onClick={()=>setShowMenu(true)} />
        {/* Mobile Menu */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src='https://t3.ftcdn.net/jpg/03/62/27/68/360_F_362276875_1JHK5DLxW4KAYKqsaGXn2MQV8yUjkm1c.jpg' alt='' />
            <CloseIcon onClick={()=>setShowMenu(false)} className='cursor-pointer w-7'/>
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/instructors'><p className='px-4 py-2 rounded inline-block'>Instructors</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
