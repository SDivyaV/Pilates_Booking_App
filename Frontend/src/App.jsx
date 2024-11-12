import React from 'react';
import {Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Instructors from './pages/Instructors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer />
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/instructors' element={<Instructors />}/>
        <Route path='/instructors/:speciality' element={<Instructors />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/appointment' element={<Appointments />}/>
        <Route path='/appointments/:trainerId' element={<Appointment />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
