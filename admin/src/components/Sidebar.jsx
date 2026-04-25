import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const menuItems = aToken 
    ? [
        { path: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard', color: 'blue' },
        { path: '/all-appointments', icon: assets.appointment_icon, label: 'Appointments', color: 'purple' },
        { path: '/add-doctor', icon: assets.add_icon, label: 'Add Doctor', color: 'green' },
        { path: '/doctor-list', icon: assets.people_icon, label: 'Doctors List', color: 'orange' }
      ]
    : dToken 
    ? [
        { path: '/doctor-dashboard', icon: assets.home_icon, label: 'Dashboard', color: 'blue' },
        { path: '/doctor-appointments', icon: assets.appointment_icon, label: 'Appointments', color: 'purple' },
        { path: '/doctor-profile', icon: assets.people_icon, label: 'Profile', color: 'teal' }
      ]
    : []

  const getGradient = (color, isActive) => {
    if (!isActive) return 'bg-gray-100 group-hover:bg-gray-200'
    const gradients = {
      blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
      purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
      green: 'bg-gradient-to-br from-green-500 to-green-600',
      orange: 'bg-gradient-to-br from-orange-500 to-orange-600',
      teal: 'bg-gradient-to-br from-teal-500 to-teal-600'
    }
    return gradients[color]
  }

  return (
    <div className='h-screen bg-white border-r border-gray-100 shadow-sm sticky top-0'>
      <div className='h-full flex flex-col py-6 overflow-y-auto'>
        {/* Role Header */}
        <div className='px-5 mb-8 flex-shrink-0'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md'>
              <span className='text-white text-lg'>{aToken ? '👑' : '⚕'}</span>
            </div>
            <div>
              <p className='text-xs text-gray-400 uppercase tracking-wider'>Logged in as</p>
              <p className='text-sm font-semibold text-gray-700'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <ul className='space-y-1 px-3 flex-1'>
          {menuItems.map((item, idx) => (
            <NavLink key={idx} to={item.path}>
              {({ isActive }) => (
                <li className={`
                  relative flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer
                  ${isActive 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}>
                  {/* Active Indicator */}
                  {isActive && (
                    <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-r-full'></div>
                  )}
                  
                  {/* Icon */}
                  <div className={`
                    w-9 h-9 rounded-lg flex items-center justify-center transition-all flex-shrink-0
                    ${isActive 
                      ? getGradient(item.color, true) + ' shadow-sm' 
                      : 'bg-gray-100'
                    }
                  `}>
                    <img 
                      className={`w-4 h-4 ${isActive ? 'brightness-0 invert' : 'opacity-60'}`} 
                      src={item.icon} 
                      alt={item.label}
                    />
                  </div>
                  
                  {/* Label */}
                  <span className='hidden md:inline text-sm font-medium whitespace-nowrap'>{item.label}</span>
                </li>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Footer */}
        <div className='px-5 pt-4 mt-auto flex-shrink-0'>
          <div className='border-t border-gray-100 pt-4'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-teal-500 rounded-full animate-pulse'></div>
              <span className='text-xs text-gray-400'>Secure Connection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar