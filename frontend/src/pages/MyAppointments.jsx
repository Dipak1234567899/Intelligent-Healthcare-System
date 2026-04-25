import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState([])
    const [paymentMethod, setPaymentMethod] = useState({})
    const [loading, setLoading] = useState(true)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/cancel-appointment', 
                { appointmentId }, 
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }   
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        backendUrl + "/api/user/verifyRazorpay", 
                        response, 
                        { headers: { token } }
                    );
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/payment-razorpay', 
                { appointmentId }, 
                { headers: { token } }
            )
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/payment-stripe', 
                { appointmentId }, 
                { headers: { token } }
            )
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    My Appointments
                </h1>
                <p className="text-gray-600 mt-2">Manage your scheduled appointments</p>
            </div>

            {appointments.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-700 mt-4">No appointments yet</h3>
                    <p className="text-gray-500 mt-2">You haven't booked any appointments yet.</p>
                    <button 
                        onClick={() => navigate('/doctors')}
                        className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                        Book an Appointment
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {appointments.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                            <div className="p-6 md:flex md:items-start md:space-x-6">
                                {/* Doctor Image */}
                                <div className="flex-shrink-0 mb-4 md:mb-0">
                                    <div className="w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-md">
                                        <img 
                                            className="w-full h-full object-cover" 
                                            src={item.docData.image} 
                                            alt={item.docData.name} 
                                        />
                                    </div>
                                </div>

                                {/* Appointment Details */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800">{item.docData.name}</h3>
                                    <p className="text-blue-600 font-medium">{item.docData.speciality}</p>
                                    
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Address</p>
                                                <p className="text-sm text-gray-600">{item.docData.address.line1}</p>
                                                <p className="text-sm text-gray-600">{item.docData.address.line2}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Date & Time</p>
                                                <p className="text-sm text-gray-600">
                                                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 md:mt-0 flex flex-col space-y-3 min-w-[180px]">
                                    {!item.cancelled && !item.payment && !item.isCompleted && !paymentMethod[item._id] && (
                                        <button 
                                            onClick={() => setPaymentMethod({...paymentMethod, [item._id]: true})}
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-md transition-all"
                                        >
                                            Pay Online
                                        </button>
                                    )}
                                    
                                    {!item.cancelled && !item.payment && !item.isCompleted && paymentMethod[item._id] && (
                                        <>
                                            <button 
                                                onClick={() => appointmentStripe(item._id)}
                                                className="flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-200 transition-all"
                                            >
                                                <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
                                                Pay with Stripe
                                            </button>
                                            <button 
                                                onClick={() => appointmentRazorpay(item._id)}
                                                className="flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-200 transition-all"
                                            >
                                                <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
                                                Pay with Razorpay
                                            </button>
                                        </>
                                    )}
                                    
                                    {!item.cancelled && item.payment && !item.isCompleted && (
                                        <span className="bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium text-sm text-center">
                                            Payment Completed
                                        </span>
                                    )}

                                    {item.isCompleted && (
                                        <span className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium text-sm text-center">
                                            Appointment Completed
                                        </span>
                                    )}

                                    {!item.cancelled && !item.isCompleted && (
                                        <button 
                                            onClick={() => cancelAppointment(item._id)}
                                            className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-md transition-all"
                                        >
                                            Cancel Appointment
                                        </button>
                                    )}
                                    
                                    {item.cancelled && !item.isCompleted && (
                                        <span className="bg-red-100 text-red-700 py-2 px-4 rounded-lg font-medium text-sm text-center">
                                            Appointment Cancelled
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Status Bar */}
                            <div className={`px-6 py-3 text-sm font-medium ${
                                item.cancelled ? 'bg-red-100 text-red-800' : 
                                item.isCompleted ? 'bg-blue-100 text-blue-800' : 
                                item.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {item.cancelled ? 'Cancelled' : 
                                 item.isCompleted ? 'Completed' : 
                                 item.payment ? 'Confirmed' : 'Pending Payment'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyAppointments