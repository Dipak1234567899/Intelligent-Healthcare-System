import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 w-full'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent'>
          All Doctors
        </h1>
        <p className='text-gray-500 text-sm mt-1'>Manage your healthcare professionals</p>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='px-8 py-8 max-h-[85vh] overflow-y-scroll'>
          {doctors.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-400 text-lg'>No doctors found</p>
              <p className='text-gray-400 text-sm mt-1'>Add your first doctor to get started</p>
            </div>
          ) : (
            <div className='w-full flex flex-wrap gap-6 gap-y-8'>
              {doctors.map((item, index) => (
                <div 
                  className='border border-gray-100 rounded-2xl w-64 overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white' 
                  key={index}
                >
                  <div className='bg-gradient-to-br from-teal-50 to-blue-50 group-hover:from-teal-100 group-hover:to-blue-100 transition-all duration-500 flex justify-center items-center p-4'>
                    <img 
                      className='h-40 w-40 rounded-full object-cover border-4 border-white shadow-md' 
                      src={item.image} 
                      alt={item.name} 
                    />
                  </div>
                  <div className='p-5'>
                    <p className='text-gray-800 text-lg font-semibold text-center'>{item.name}</p>
                    <p className='text-teal-600 text-sm font-medium mt-1 text-center'>{item.speciality}</p>
                    <div className='mt-4 flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <input 
                          onChange={() => changeAvailability(item._id)} 
                          type="checkbox" 
                          checked={item.available}
                          className='w-4 h-4 text-teal-500 rounded border-gray-300 focus:ring-teal-500 focus:ring-2 cursor-pointer'
                        />
                        <label className='text-sm text-gray-600 cursor-pointer'>
                          Available
                        </label>
                      </div>
                      <div className='text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full'>
                        {item.experience || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorsList