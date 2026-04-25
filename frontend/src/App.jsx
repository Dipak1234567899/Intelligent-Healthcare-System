import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Verify from './pages/Verify'
import Department from './pages/Department'
import Blogs from './pages/Blogs'
import Careers from './pages/Careers'

import Service from './pages/Service'
import Diagnosis from './pages/Diagnosis'
import ImageUpload from './pages/ImageUpload'
import Dashboard from './pages/Dashboard'
import Chatbot from './pages/Chatbot'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">

      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/department" element={<Department />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/careers" element={<Careers />} />

        {/* New Routes */}
        <Route path="/services" element={<Service />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/image" element={<ImageUpload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
