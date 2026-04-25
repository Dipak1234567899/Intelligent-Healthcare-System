import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                toast.error('Please select a profile picture')
                return
            }

            if (!name.trim()) {
                toast.error('Doctor name is required')
                return
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                toast.error('Please enter a valid email address')
                return
            }

            if (!password || password.length < 6) {
                toast.error('Password must be at least 6 characters')
                return
            }

            if (!fees || fees <= 0) {
                toast.error('Please enter a valid consultation fee')
                return
            }

            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name.trim())
            formData.append('email', email.trim().toLowerCase())
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about.trim())
            formData.append('speciality', speciality)
            formData.append('degree', degree.trim())
            formData.append('address', JSON.stringify({ line1: address1.trim(), line2: address2.trim() }))

            const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, { 
                headers: { 
                    aToken,
                    'Content-Type': 'multipart/form-data'
                } 
            })
            
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
                setExperience('1 Year')
                setSpeciality('General physician')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add doctor')
            console.error('Add doctor error:', error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent'>
                    Add New Doctor
                </h2>
                <p className='text-gray-500 text-sm mt-1'>Register a new healthcare professional</p>
            </div>

            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                <div className='px-8 py-8 max-h-[80vh] overflow-y-scroll'>
                    
                    <div className='flex items-center gap-6 mb-8 p-4 bg-gray-50 rounded-xl'>
                        <label htmlFor="doc-img" className='cursor-pointer group'>
                            <div className='relative'>
                                <img 
                                    className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-all group-hover:scale-105' 
                                    src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                                    alt="Doctor profile"
                                />
                                <div className='absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                    <span className='text-white text-xs'>Change</span>
                                </div>
                            </div>
                        </label>
                        <input 
                            onChange={(e) => setDocImg(e.target.files[0])} 
                            type="file" 
                            id="doc-img" 
                            hidden 
                            accept="image/jpeg,image/png,image/jpg"
                        />
                        <div>
                            <p className='font-medium text-gray-700'>Profile Picture</p>
                            <p className='text-sm text-gray-400 mt-1'>JPEG, PNG (Max 5MB)</p>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-8'>
                        <div className='flex-1 space-y-5'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name *</label>
                                <input 
                                    onChange={e => setName(e.target.value)} 
                                    value={name} 
                                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all' 
                                    type="text" 
                                    placeholder='Dr. John Doe' 
                                    required 
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address *</label>
                                <input 
                                    onChange={e => setEmail(e.target.value)} 
                                    value={email} 
                                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all' 
                                    type="email" 
                                    placeholder='doctor@example.com' 
                                    required 
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Password *</label>
                                <input 
                                    onChange={e => setPassword(e.target.value)} 
                                    value={password} 
                                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all' 
                                    type="password" 
                                    placeholder='Minimum 6 characters' 
                                    required 
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Experience *</label>
                                <select 
                                    onChange={e => setExperience(e.target.value)} 
                                    value={experience} 
                                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                                >
                                    {['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years', '9 Years', '10 Years', '10+ Years'].map(exp => (
                                        <option key={exp} value={exp}>{exp}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Consultation Fee (₹) *</label>
                                <input 
                                    onChange={e => setFees(e.target.value)} 
                                    value={fees} 
                                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500' 
                                    type="number" 
                                    placeholder='500' 
                                    min="0"
                                    required 
                                />
                            </div>
                        </div>

                        <div className='flex-1 space-y-5'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Speciality *</label>
                                <select 
                                    onChange={e => setSpeciality(e.target.value)} 
                                    value={speciality} 
                                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                                >
                                    {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist', 'Cardiologist', 'Orthopedist', 'Ophthalmologist', 'Psychiatrist'].map(spec => (
                                        <option key={spec} value={spec}>{spec}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Medical Degree *</label>
                                <input 
                                    onChange={e => setDegree(e.target.value)} 
                                    value={degree} 
                                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500' 
                                    type="text" 
                                    placeholder='MBBS, MD, MS' 
                                    required 
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Clinic Address *</label>
                                <input 
                                    onChange={e => setAddress1(e.target.value)} 
                                    value={address1} 
                                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 mb-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500' 
                                    type="text" 
                                    placeholder='Street Address' 
                                    required 
                                />
                                <input 
                                    onChange={e => setAddress2(e.target.value)} 
                                    value={address2} 
                                    className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500' 
                                    type="text" 
                                    placeholder='City, State, PIN Code' 
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>About Doctor *</label>
                        <textarea 
                            onChange={e => setAbout(e.target.value)} 
                            value={about} 
                            className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500' 
                            rows={5} 
                            placeholder='Qualifications, experience, achievements, and specializations...'
                            required
                        />
                    </div>

                    <div className='mt-8 flex justify-end'>
                        <button 
                            type='submit' 
                            className='bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105'
                        >
                            Add Doctor
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddDoctor