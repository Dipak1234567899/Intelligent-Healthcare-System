import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-sm'>
      <div className='flex items-center gap-4'>
        {/* Logo Section - Same as frontend navbar */}
        <div onClick={() => navigate('/')} className="group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-400 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all shadow-lg">
                <span className="text-white text-xl">⚕</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-light tracking-tight">
                <span className="font-bold text-gray-800">HEALTH</span>
                <span className="font-extralight text-teal-600">CONNECT</span>
              </h1>
              <div className="h-0.5 w-0 group-hover:w-full bg-teal-400 transition-all duration-500"></div>
            </div>
          </div>
        </div>
        
        {/* Role Badge */}
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-xs'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>
      
      <button 
        onClick={() => logout()} 
        className='bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm px-8 py-2 rounded-full hover:shadow-lg transition-all transform hover:scale-105'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar