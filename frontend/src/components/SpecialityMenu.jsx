import React, { useState } from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    const [hoveredItem, setHoveredItem] = useState(null)

    return (
        <div id='speciality' className='relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-blue-50 overflow-hidden'>
          
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-100 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
            
            {[...Array(15)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-40"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`
                    }}
                ></div>
            ))}

            <div className='relative z-10 flex flex-col items-center gap-6 text-center mb-12'>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Medical Specialties
                </div>
                
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900'>
                    Find by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Speciality</span>
                </h1>
                
                <p className='max-w-2xl text-lg text-gray-600 leading-relaxed'>
                    Discover specialized healthcare professionals tailored to your specific medical needs
                </p>
            </div>

            <div className='relative z-10 flex justify-center gap-6 md:gap-8 flex-wrap px-4'>
                {specialityData.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => window.scrollTo(0, 0)}
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="group relative flex flex-col items-center cursor-pointer transition-all duration-500 transform hover:-translate-y-3"
                        key={index}
                    >
                        <div className="relative mb-4">
                            <div className={`absolute inset-0 bg-blue-200 rounded-full opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500 ${hoveredItem === index ? 'scale-110' : ''}`}></div>
                            
                            <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center transition-all duration-500 group-hover:shadow-xl group-hover:scale-110 ${
                                hoveredItem === index ? 'bg-gradient-to-br from-blue-50 to-purple-50 ring-2 ring-blue-300' : ''
                            }`}>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute top-0 left-0 w-1/2 h-1/2 border-t-2 border-l-2 border-blue-200 opacity-50"></div>
                                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-b-2 border-r-2 border-purple-200 opacity-50"></div>
                                </div>
                                
                                <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center p-3 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-500">
                                    <img 
                                        className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-500" 
                                        src={item.image} 
                                        alt={item.speciality}
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-purple-400/0 rounded-xl group-hover:from-blue-400/10 group-hover:to-purple-400/10 transition-all duration-500"></div>
                                </div>
                          
                                <div className={`absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white group-hover:animate-ping ${hoveredItem === index ? 'opacity-75' : 'opacity-0'} transition-opacity duration-300`}></div>
                            </div>
                            
                            <div className="hidden md:block absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-r from-blue-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        <div className="text-center">
                            <p className={`font-semibold text-sm md:text-base transition-all duration-300 ${
                                hoveredItem === index 
                                ? 'text-blue-600 transform scale-110' 
                                : 'text-gray-700'
                            }`}>
                                {item.speciality}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {Math.floor(Math.random() * 20) + 5} specialists
                            </p>
                        </div>

                        <div className="absolute -z-10 w-32 h-32 rounded-full bg-blue-100 opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-700"></div>
                    </Link>
                ))}
            </div>

            <div className="relative z-10 text-center mt-16">
                <div className="inline-flex flex-col items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                    <p className="text-gray-600 text-lg">Can't find what you're looking for?</p>
                    <Link 
                        to="/doctors" 
                        className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10">Browse All Specialties</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <svg 
                            className="w-4 h-4 ml-2 relative z-10 inline-block group-hover:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </Link>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(5deg); }
                }
            `}</style>
        </div>
    )
}

export default SpecialityMenu