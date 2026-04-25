import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { 
                headers: { token } 
            })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                <p className="text-gray-600 mt-2">Manage your personal information</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                        {isEdit ? (
                            <label htmlFor='image' className="cursor-pointer">
                                <div className="relative group">
                                    <img 
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" 
                                        src={image ? URL.createObjectURL(image) : userData.image} 
                                        alt="Profile" 
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <img className="w-8" src={assets.upload_icon} alt="Upload" />
                                    </div>
                                </div>
                                <input 
                                    onChange={(e) => setImage(e.target.files[0])} 
                                    type="file" 
                                    id="image" 
                                    accept="image/*" 
                                    hidden 
                                />
                            </label>
                        ) : (
                            <img 
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" 
                                src={userData.image} 
                                alt="Profile" 
                            />
                        )}
                    </div>
                    
                    {isEdit ? (
                        <input 
                            className="text-2xl font-semibold text-center text-gray-800 bg-transparent border-b-2 border-gray-200 focus:border-primary focus:outline-none mt-4 px-2 py-1"
                            type="text" 
                            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                            value={userData.name} 
                        />
                    ) : (
                        <h2 className="text-2xl font-semibold text-gray-800 mt-4">{userData.name}</h2>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            CONTACT INFORMATION
                        </h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email ID</label>
                                <p className="text-blue-600">{userData.email}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                                {isEdit ? (
                                    <input 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        type="text" 
                                        onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                        value={userData.phone} 
                                    />
                                ) : (
                                    <p className="text-blue-600">{userData.phone}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                                {isEdit ? (
                                    <div className="space-y-2">
                                        <input 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            type="text" 
                                            placeholder="Address Line 1"
                                            onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                            value={userData.address.line1} 
                                        />
                                        <input 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            type="text" 
                                            placeholder="Address Line 2"
                                            onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                            value={userData.address.line2} 
                                        />
                                    </div>
                                ) : (
                                    <p className="text-gray-600">
                                        {userData.address.line1} {userData.address.line2 && <br />}
                                        {userData.address.line2}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            BASIC INFORMATION
                        </h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                                {isEdit ? (
                                    <select 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                        value={userData.gender}
                                    >
                                        <option value="Not Selected">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    <p className="text-gray-600">{userData.gender || "Not specified"}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                                {isEdit ? (
                                    <input 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        type="date" 
                                        onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                        value={userData.dob} 
                                    />
                                ) : (
                                    <p className="text-gray-600">{userData.dob || "Not specified"}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                    {isEdit ? (
                        <>
                            <button 
                                onClick={updateUserProfileData}
                                className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Save Changes
                            </button>
                            <button 
                                onClick={() => {
                                    setIsEdit(false)
                                    setImage(false)
                                }}
                                className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => setIsEdit(true)}
                            className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile