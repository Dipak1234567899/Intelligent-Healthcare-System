import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [selectedDateIndex, setSelectedDateIndex] = useState(0)
    const [selectedTime, setSelectedTime] = useState('')
    const [isBooking, setIsBooking] = useState(false)
    const [activeTab, setActiveTab] = useState('details')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSlots = async () => {
        if (!docInfo) return

        setDocSlots([])
        let today = new Date()
        let availableSlots = []

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date(currentDate)
            endTime.setHours(21, 0, 0, 0)

            if (currentDate.getDate() === today.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = `${day}_${month}_${year}`
                const isSlotAvailable = !docInfo.slots_booked[slotDate] || !docInfo.slots_booked[slotDate].includes(formattedTime)

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                        date: slotDate
                    })
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            availableSlots.push(timeSlots)
        }

        setDocSlots(availableSlots)
    }

    const bookAppointment = async () => {
        if (!selectedTime) {
            toast.warning('Please select a time slot')
            return
        }

        if (!token) {
            toast.warning('Please login to book an appointment')
            navigate('/login')
            return
        }

        setIsBooking(true)
        try {
            const selectedSlot = docSlots[selectedDateIndex].find(slot => slot.time === selectedTime)
            const { data } = await axios.post(
                backendUrl + '/api/user/book-appointment',
                { 
                    docId, 
                    slotDate: selectedSlot.date, 
                    slotTime: selectedTime 
                },
                { headers: { token } }
            )

            if (data.success) {
                toast.success('Appointment booked successfully!')
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Booking failed')
        }
        setIsBooking(false)
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots()
        }
    }, [docInfo])

    if (!docInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Appointment</span>
                    </h1>
                    <p className="text-lg text-gray-600">Secure your consultation with our expert doctor</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Doctor Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
                            <div className="text-center">
                                <div className="relative inline-block">
                                    <img 
                                        className="w-32 h-32 rounded-2xl object-cover mx-auto border-4 border-white shadow-lg" 
                                        src={docInfo.image} 
                                        alt={docInfo.name}
                                    />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                
                                <h2 className="text-2xl font-bold text-gray-900 mt-4 flex items-center justify-center gap-2">
                                    {docInfo.name}
                                    <img className="w-5" src={assets.verified_icon} alt="Verified" />
                                </h2>
                                
                                <div className="flex items-center justify-center gap-2 mt-2 text-gray-600">
                                    <span>{docInfo.degree}</span>
                                    <span>•</span>
                                    <span>{docInfo.speciality}</span>
                                </div>
                                
                                <div className="mt-3 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                                    {docInfo.experience} years experience
                                </div>

                                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                    <div className="text-center">
                                        <span className="text-gray-600">Consultation Fee</span>
                                        <div className="text-2xl font-bold text-gray-900 mt-1">
                                            {currencySymbol}{docInfo.fees}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Tabs */}
                            <div className="mt-6 border-b border-gray-200">
                                <nav className="flex space-x-4">
                                    <button
                                        onClick={() => setActiveTab('details')}
                                        className={`py-2 px-3 text-sm font-medium rounded-t-lg transition-colors ${
                                            activeTab === 'details'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className={`py-2 px-3 text-sm font-medium rounded-t-lg transition-colors ${
                                            activeTab === 'reviews'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Reviews
                                    </button>
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="mt-4">
                                {activeTab === 'details' && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About Doctor</h3>
                                        <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
                                        
                                        <div className="mt-6 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-600">Average wait time: 15 mins</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-600">Available for online consultation</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'reviews' && (
                                    <div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="text-3xl font-bold text-gray-900">4.9</div>
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <div className="text-sm text-gray-600">Based on 127 reviews</div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Panel */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Time Slot</h2>
                            
                            {/* Date Selection */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Dates</h3>
                                <div className="flex gap-3 overflow-x-auto pb-4">
                                    {docSlots.map((slots, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setSelectedDateIndex(index)
                                                setSelectedTime('')
                                            }}
                                            className={`flex flex-col items-center justify-center p-4 min-w-[90px] rounded-xl cursor-pointer transition-all duration-300 ${
                                                selectedDateIndex === index
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                            }`}
                                        >
                                            <div className="text-sm font-medium">
                                                {slots[0] && daysOfWeek[slots[0].datetime.getDay()].substring(0, 3)}
                                            </div>
                                            <div className="text-xl font-bold mt-1">
                                                {slots[0] && slots[0].datetime.getDate()}
                                            </div>
                                            <div className="text-xs opacity-75 mt-1">
                                                {slots[0] && months[slots[0].datetime.getMonth()]}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Available Time Slots
                                    {docSlots[selectedDateIndex] && (
                                        <span className="text-sm font-normal text-gray-600 ml-2">
                                            ({docSlots[selectedDateIndex].length} slots available)
                                        </span>
                                    )}
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {docSlots[selectedDateIndex]?.map((slot, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedTime(slot.time)}
                                            className={`p-4 rounded-xl text-center transition-all duration-300 ${
                                                selectedTime === slot.time
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                            }`}
                                        >
                                            <div className="font-semibold">{slot.time.toLowerCase()}</div>
                                            <div className="text-xs opacity-75 mt-1">30 mins</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Booking Action */}
                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="text-gray-600">Selected Time</div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {selectedTime ? (
                                                <>
                                                    {docSlots[selectedDateIndex]?.[0] && 
                                                        `${daysOfWeek[docSlots[selectedDateIndex][0].datetime.getDay()]}, 
                                                        ${docSlots[selectedDateIndex][0].datetime.getDate()} 
                                                        ${months[docSlots[selectedDateIndex][0].datetime.getMonth()]} • 
                                                        ${selectedTime.toLowerCase()}`
                                                    }
                                                </>
                                            ) : (
                                                'No time selected'
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-gray-600">Total Amount</div>
                                        <div className="text-2xl font-bold text-gray-900">{currencySymbol}{docInfo.fees}</div>
                                    </div>
                                </div>

                                <button
                                    onClick={bookAppointment}
                                    disabled={!selectedTime || isBooking}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                                >
                                    <span className="relative z-10">
                                        {isBooking ? 'Booking...' : 'Confirm Appointment'}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    {isBooking && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                        </div>
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-600 mt-4">
                                    You won't be charged until the appointment is confirmed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Doctors */}
                <div className="mt-16">
                    <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
                </div>
            </div>
        </div>
    )
}

export default Appointment