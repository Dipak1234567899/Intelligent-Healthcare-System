   import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const [hoveredCard, setHoveredCard] = useState(null)

    return (
        <div className='relative py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden'>
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>
            
            <div className='relative z-10 flex flex-col items-center gap-6 text-center mb-12'>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Trusted Professionals
                </div>
                
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900'>
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Top Doctors</span>
                </h1>
                
                <p className='max-w-2xl text-lg text-gray-600 leading-relaxed'>
                    Connect with our highly qualified medical professionals for the best healthcare experience
                </p>
            </div>

            <div className='relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4'>
                {doctors.slice(0, 8).map((item, index) => (
                    <div 
                        key={index}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                    >
                        {/* Card Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Doctor Image */}
                        <div className="relative h-56 overflow-hidden">
                            <img 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                src={item.image} 
                                alt={item.name}
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Availability Badge */}
                            <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${item.available ? 'bg-green-500/20 text-green-800' : 'bg-gray-500/20 text-gray-800'}`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                {item.available ? 'Available' : 'Not Available'}
                            </div>
                            
                            {/* Quick View Button */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-blue-50 transition-colors">
                                    Book Appointment
                                </button>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 relative">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                {item.name}
                            </h3>
                            
                            <p className="text-blue-600 font-medium mb-3">{item.speciality}</p>
                            
                            {/* Rating Stars */}
                            <div className="flex items-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className="w-4 h-4 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="text-sm text-gray-500 ml-1">(4.9)</span>
                            </div>
                            
                            {/* Specialties Tags */}
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full">
                                    Cardiology
                                </span>
                                <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded-full">
                                    Surgery
                                </span>
                            </div>
                        </div>

                        {/* Hover Effect Border */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300 transition-all duration-500 pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* View More Button */}
            <div className="relative z-10 text-center mt-12">
                <button 
                    onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
                    className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 overflow-hidden"
                >
                    <span className="relative z-10">Explore All Doctors</span>
                    
                    {/* Button Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700">
                        <div className="w-1/2 h-full bg-white/20"></div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <svg 
                        className="w-5 h-5 ml-2 relative z-10 inline-block group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </button>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute top-1/4 right-10 w-6 h-6 bg-blue-300 rounded-full opacity-20 animate-float"></div>
            <div className="absolute bottom-1/3 left-8 w-8 h-8 bg-purple-300 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-2/3 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
    )
}

export default TopDoctors
