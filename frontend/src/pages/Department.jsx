import React, { useState, useEffect } from 'react';
import {
  FiCalendar, FiClock, FiStar, FiShield, FiBell, FiMapPin, 
  FiSend, FiPlus, FiMinus, FiCheckCircle, FiX, FiSearch, 
  FiUser, FiPhone, FiMail, FiTrendingUp, FiArrowRight,
  FiUsers, FiDownload, FiPrinter, FiAlertCircle, FiEye,
  FiDroplet, FiThermometer, FiHeart, FiActivity, FiFileText,
  FiCreditCard, FiLock, FiGlobe
} from 'react-icons/fi';
import { 
  FaAmbulance, FaPills, FaStethoscope, FaRobot, FaUserMd, 
  FaLungs, FaNotesMedical, FaHospitalUser, FaProcedures,
  FaClipboardList, FaRegClock, FaRegCalendarAlt, FaRegBell,
  FaQrcode, FaShareAlt, FaTruck, FaWhatsapp, FaPhoneAlt,
  FaRupeeSign, FaLanguage
} from 'react-icons/fa';

const HealthcareServices = () => {
  const primaryColor = '#2FA39A';
  
  // ==================== STATE MANAGEMENT ====================
  const [activeTab, setActiveTab] = useState('appointment');
  const [notifications, setNotifications] = useState([]);
  
  // 1. DOCTOR APPOINTMENT BOOKING
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [appointments, setAppointments] = useState([]);
  
  // 2. DIGITAL PRESCRIPTION
  const [prescriptions, setPrescriptions] = useState([]);
  
  // 3. LAB TEST BOOKING
  const [labTests, setLabTests] = useState([
    { id: 1, name: 'Complete Blood Count', price: 499, preparation: 'No fasting required', reportTime: '6 hours' },
    { id: 2, name: 'Lipid Profile', price: 399, preparation: '10-12 hours fasting', reportTime: '8 hours' },
    { id: 3, name: 'Thyroid Profile', price: 349, preparation: 'No fasting required', reportTime: '6 hours' },
    { id: 4, name: 'Blood Sugar (Fasting)', price: 99, preparation: '8 hours fasting', reportTime: '2 hours' },
    { id: 5, name: 'Vitamin D Test', price: 799, preparation: 'No fasting required', reportTime: '24 hours' },
    { id: 6, name: 'Liver Function Test', price: 599, preparation: '8 hours fasting', reportTime: '8 hours' }
  ]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [testAppointment, setTestAppointment] = useState({ date: '', time: '', address: '' });
  
  // 4. MEDICINE DELIVERY
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol 500mg', price: 25, prescription: false, stock: true, image: '💊' },
    { id: 2, name: 'Amoxicillin 250mg', price: 85, prescription: true, stock: true, image: '💊' },
    { id: 3, name: 'Vitamin D3 60k IU', price: 120, prescription: false, stock: true, image: '💊' },
    { id: 4, name: 'Cetirizine 10mg', price: 35, prescription: false, stock: true, image: '💊' },
    { id: 5, name: 'Azithromycin 500mg', price: 150, prescription: true, stock: true, image: '💊' }
  ]);
  const [cart, setCart] = useState([]);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  // 5. HEALTH RECORDS MANAGEMENT
  const [healthRecords, setHealthRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ name: '', type: '', file: null });
  
  // 6. DOCTOR REVIEWS & RATINGS
  const [reviews, setReviews] = useState([
    { id: 1, doctorName: 'Dr. Rajesh Kumar', rating: 5, comment: 'Excellent doctor! Very caring and explained everything well.', patientName: 'Amit S.', date: '2024-01-15' },
    { id: 2, doctorName: 'Dr. Priya Singh', rating: 4, comment: 'Good experience, but waiting time was long.', patientName: 'Neha G.', date: '2024-01-10' }
  ]);
  const [newReview, setNewReview] = useState({ doctorName: '', rating: 5, comment: '' });
  
  // 7. APPOINTMENT REMINDER
  const [reminders, setReminders] = useState([]);
  const [reminderSettings, setReminderSettings] = useState({ sms: true, email: true, whatsapp: false });
  
 
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', experience: '15 years', fee: 800, rating: 4.8, available: true, location: 'Mumbai', languages: ['English', 'Hindi'], image: '👨‍⚕️', nextAvailable: 'Today, 3:00 PM' },
    { id: 2, name: 'Dr. Priya Singh', specialty: 'Neurologist', experience: '12 years', fee: 750, rating: 4.9, available: true, location: 'Delhi', languages: ['English', 'Hindi', 'Punjabi'], image: '👩‍⚕️', nextAvailable: 'Tomorrow, 10:00 AM' },
    { id: 3, name: 'Dr. Amit Patel', specialty: 'Orthopedic', experience: '10 years', fee: 700, rating: 4.7, available: true, location: 'Bangalore', languages: ['English', 'Hindi', 'Kannada'], image: '👨‍⚕️', nextAvailable: 'Today, 5:00 PM' },
    { id: 4, name: 'Dr. Neha Gupta', specialty: 'Pediatrician', experience: '8 years', fee: 650, rating: 4.8, available: true, location: 'Chennai', languages: ['English', 'Hindi', 'Tamil'], image: '👩‍⚕️', nextAvailable: 'Tomorrow, 2:00 PM' },
    { id: 5, name: 'Dr. Sanjay Mehta', specialty: 'Dermatologist', experience: '11 years', fee: 600, rating: 4.6, available: true, location: 'Pune', languages: ['English', 'Hindi'], image: '👨‍⚕️', nextAvailable: 'Today, 4:00 PM' },
    { id: 6, name: 'Dr. Anjali Sharma', specialty: 'Gynecologist', experience: '14 years', fee: 750, rating: 4.9, available: true, location: 'Kolkata', languages: ['English', 'Hindi', 'Bengali'], image: '👩‍⚕️', nextAvailable: 'Tomorrow, 11:00 AM' },
    { id: 7, name: 'Dr. Vikram Singh', specialty: 'Dentist', experience: '7 years', fee: 500, rating: 4.5, available: true, location: 'Jaipur', languages: ['English', 'Hindi'], image: '👨‍⚕️', nextAvailable: 'Today, 2:00 PM' },
    { id: 8, name: 'Dr. Ritu Khanna', specialty: 'Eye Specialist', experience: '9 years', fee: 550, rating: 4.7, available: true, location: 'Hyderabad', languages: ['English', 'Hindi', 'Telugu'], image: '👩‍⚕️', nextAvailable: 'Tomorrow, 1:00 PM' }
  ]);
  
  // 9. MULTI-LANGUAGE SUPPORT
  const [language, setLanguage] = useState('english');
  const translations = {
    english: {
      bookAppointment: 'Book Appointment',
      searchDoctor: 'Search Doctor',
      consultation: 'Consultation',
      viewDetails: 'View Details',
      confirmBooking: 'Confirm Booking',
      paymentSuccess: 'Payment Successful!'
    },
    hindi: {
      bookAppointment: 'अपॉइंटमेंट बुक करें',
      searchDoctor: 'डॉक्टर खोजें',
      consultation: 'परामर्श',
      viewDetails: 'विवरण देखें',
      confirmBooking: 'बुकिंग की पुष्टि करें',
      paymentSuccess: 'भुगतान सफल!'
    }
  };
  const t = translations[language];
  
  // 10. SECURE PAYMENT SYSTEM
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '', cardName: '', upiId: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Add Notification
  const addNotification = (message, type = 'success') => {
    const newNotif = { id: Date.now(), message, type, time: new Date().toLocaleTimeString() };
    setNotifications(prev => [newNotif, ...prev].slice(0, 5));
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== newNotif.id)), 4000);
  };
  
  // ==================== 1. DOCTOR APPOINTMENT BOOKING ====================
  const specialties = ['all', 'Cardiologist', 'Neurologist', 'Orthopedic', 'Pediatrician', 'Dermatologist', 'Gynecologist', 'Dentist', 'Eye Specialist'];
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });
  
  const bookAppointment = (doctor) => {
    if (!selectedDate || !selectedTime) {
      addNotification('Please select date and time', 'error');
      return;
    }
    setPaymentModal(true);
    setSelectedDoctor(doctor);
  };
  
  const completePayment = () => {
    if (paymentMethod === 'card' && (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv)) {
      addNotification('Please enter card details', 'error');
      return;
    }
    if (paymentMethod === 'upi' && !paymentDetails.upiId) {
      addNotification('Please enter UPI ID', 'error');
      return;
    }
    
    const newAppointment = {
      id: Date.now(),
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      bookingDate: new Date().toLocaleString()
    };
    setAppointments([...appointments, newAppointment]);
    addNotification(`Appointment booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`, 'success');
    
    setReminders([...reminders, {
      id: Date.now(),
      doctorName: selectedDoctor.name,
      date: selectedDate,
      time: selectedTime,
      reminderTime: new Date(selectedDate + ' ' + selectedTime).getTime() - 3600000
    }]);
    
    setPaymentModal(false);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setPaymentDetails({ cardNumber: '', expiry: '', cvv: '', cardName: '', upiId: '' });
  };
  
  // ==================== 2. DIGITAL PRESCRIPTION ====================
  const generatePrescription = (appointment) => {
    const newPrescription = {
      id: Date.now(),
      patientName: appointment.doctor?.name || 'Patient',
      doctorName: appointment.doctor?.name,
      date: new Date().toLocaleDateString(),
      medicines: [
        { name: 'Medicine 1', dosage: '1-0-1', duration: '5 days' },
        { name: 'Medicine 2', dosage: '1-0-0', duration: '7 days' }
      ],
      advice: 'Take medicines as prescribed. Follow up after 7 days.'
    };
    setPrescriptions([...prescriptions, newPrescription]);
    addNotification('Prescription generated successfully!', 'success');
  };
  
  const downloadPrescription = (prescription) => {
    addNotification(`Downloading prescription for ${prescription.patientName}...`, 'info');
    setTimeout(() => addNotification('Prescription downloaded!', 'success'), 1000);
  };
  
  const printPrescription = (prescription) => {
    addNotification('Sending to printer...', 'info');
    setTimeout(() => addNotification('Print sent successfully!', 'success'), 1000);
  };
  
  // ==================== 3. LAB TEST BOOKING ====================
  const toggleLabTest = (test) => {
    if (selectedTests.find(t => t.id === test.id)) {
      setSelectedTests(selectedTests.filter(t => t.id !== test.id));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };
  
  const bookLabTests = () => {
    if (selectedTests.length === 0) {
      addNotification('Please select at least one test', 'error');
      return;
    }
    if (!testAppointment.date || !testAppointment.time || !testAppointment.address) {
      addNotification('Please fill all test booking details', 'error');
      return;
    }
    const total = selectedTests.reduce((sum, test) => sum + test.price, 0);
    addNotification(`Lab tests booked! Total: ₹${total}. Sample collection scheduled.`, 'success');
    setSelectedTests([]);
    setTestAppointment({ date: '', time: '', address: '' });
  };
  
  // ==================== 4. MEDICINE DELIVERY ====================
  const addToCart = (medicine) => {
    if (medicine.prescription && !prescriptionFile) {
      addNotification(`Prescription required for ${medicine.name}. Please upload prescription first.`, 'error');
      return;
    }
    setCart([...cart, { ...medicine, quantity: 1 }]);
    addNotification(`${medicine.name} added to cart`, 'success');
  };
  
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    addNotification('Item removed from cart', 'info');
  };
  
  const getCartTotal = () => cart.reduce((total, item) => total + item.price, 0);
  
  const placeOrder = () => {
    if (cart.length === 0) {
      addNotification('Cart is empty', 'error');
      return;
    }
    if (!deliveryAddress) {
      addNotification('Please enter delivery address', 'error');
      return;
    }
    addNotification(`Order placed successfully! Total: ₹${getCartTotal()}. Delivery in 2-3 days.`, 'success');
    setCart([]);
    setPrescriptionFile(null);
    setDeliveryAddress('');
  };
  
  // ==================== 5. HEALTH RECORDS MANAGEMENT ====================
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newRecordItem = {
          id: Date.now(),
          name: newRecord.name || file.name,
          type: newRecord.type || 'Medical Record',
          date: new Date().toLocaleDateString(),
          fileData: event.target.result,
          fileName: file.name
        };
        setHealthRecords([...healthRecords, newRecordItem]);
        addNotification(`Record "${newRecord.name}" saved to Health Locker`, 'success');
        setNewRecord({ name: '', type: '', file: null });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const shareRecord = (record) => {
    addNotification(`Sharing "${record.name}" with your doctor...`, 'info');
    setTimeout(() => addNotification(`Record shared successfully!`, 'success'), 1500);
  };
  
  const downloadRecord = (record) => {
    addNotification(`Downloading "${record.name}"...`, 'info');
    setTimeout(() => addNotification(`Download completed!`, 'success'), 1000);
  };
  
  // ==================== 6. DOCTOR REVIEWS & RATINGS ====================
  const submitReview = () => {
    if (!newReview.doctorName || !newReview.comment) {
      addNotification('Please fill all review fields', 'error');
      return;
    }
    setReviews([...reviews, { ...newReview, id: Date.now(), date: new Date().toLocaleDateString() }]);
    addNotification(`Review submitted for ${newReview.doctorName}!`, 'success');
    setNewReview({ doctorName: '', rating: 5, comment: '' });
  };
  
  // ==================== 7. APPOINTMENT REMINDER ====================
  const updateReminderSettings = (type) => {
    setReminderSettings({ ...reminderSettings, [type]: !reminderSettings[type] });
    addNotification(`${type.toUpperCase()} reminders ${!reminderSettings[type] ? 'enabled' : 'disabled'}`, 'success');
  };
  
  // ==================== 8. SPECIALIST DOCTORS LISTING ====================
  const getDoctorsBySpecialty = (specialty) => {
    return doctors.filter(d => d.specialty === specialty);
  };
  
  // ==================== 9. MULTI-LANGUAGE SUPPORT ====================
  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
    addNotification(`Language changed to ${language === 'english' ? 'Hindi' : 'English'}`, 'success');
  };
  
  // Services Tabs
  const services = [
    { id: 'appointment', name: '📅 Book Appointment', icon: '📅' },
    { id: 'prescription', name: '📄 Prescription', icon: '📄' },
    { id: 'labtest', name: '🔬 Lab Tests', icon: '🔬' },
    { id: 'pharmacy', name: '💊 Medicine Delivery', icon: '💊' },
    { id: 'records', name: '📊 Health Records', icon: '📊' },
    { id: 'reviews', name: '⭐ Reviews & Ratings', icon: '⭐' },
    { id: 'reminders', name: '🔔 Reminders', icon: '🔔' },
    { id: 'doctors', name: '👨‍⚕️ Specialists', icon: '👨‍⚕️' },
    { id: 'language', name: '🌐 Language', icon: '🌐' },
    { id: 'payment', name: '💳 Secure Payment', icon: '💳' }
  ];
  
  return (
    <div style={{ backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ backgroundColor: primaryColor, color: 'white', padding: '16px 0', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-center md:text-left">
              <h1 style={{ fontSize: 'clamp(24px, 5vw, 28px)', fontWeight: 'bold', margin: 0 }}>🏥 HealthCare Plus</h1>
              <p style={{ opacity: 0.9, marginTop: '5px', fontSize: '14px' }}>Complete Healthcare Solutions</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={toggleLanguage} style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '8px 15px', borderRadius: '10px', border: 'none', color: 'white', cursor: 'pointer', fontSize: '14px' }}>
                <FaLanguage style={{ marginRight: '5px' }} /> {language === 'english' ? 'हिंदी' : 'English'}
              </button>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '8px 15px', borderRadius: '10px', fontSize: '14px' }}>
                <FiCalendar style={{ display: 'inline', marginRight: '8px' }} />
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Bar - Responsive */}
      <div className="container mx-auto px-4" style={{ marginTop: '-20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          {[
            { icon: <FiUsers />, value: '50,000+', label: 'Happy Patients' },
            { icon: <FaStethoscope />, value: '50+', label: 'Expert Doctors' },
            { icon: <FiClock />, value: '24/7', label: 'Service Available' },
            { icon: <FiStar />, value: '4.9', label: 'Patient Rating' }
          ].map((stat, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ color: primaryColor, fontSize: '24px' }}>{stat.icon}</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#666' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Notifications */}
      {notifications.length > 0 && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, width: 'min(90%, 320px)' }}>
          {notifications.map(notif => (
            <div key={notif.id} style={{
              backgroundColor: notif.type === 'error' ? '#fee' : notif.type === 'emergency' ? '#fde' : '#e8f5e9',
              borderLeft: `4px solid ${notif.type === 'error' ? '#f44336' : notif.type === 'emergency' ? '#ff9800' : primaryColor}`,
              padding: '12px 15px',
              marginBottom: '10px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <p style={{ margin: 0, color: '#333', fontSize: '13px' }}>{notif.message}</p>
              <p style={{ margin: '5px 0 0', fontSize: '10px', color: '#999' }}>{notif.time}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Service Tabs - Responsive */}
      <div className="container mx-auto px-4" style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid #e0e0e0', paddingBottom: '15px' }}>
          {services.map(service => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '25px',
                border: 'none',
                backgroundColor: activeTab === service.id ? primaryColor : '#f0f0f0',
                color: activeTab === service.id ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                transition: 'all 0.3s'
              }}
            >
              <span style={{ fontSize: '14px' }}>{service.icon}</span>
              <span style={{ display: 'inline' }}>{service.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4" style={{ marginTop: '30px', paddingBottom: '50px' }}>
        
        {/* ==================== 1. DOCTOR APPOINTMENT BOOKING ==================== */}
        {activeTab === 'appointment' && (
          <div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#333', marginBottom: '20px' }}>📅 {t.bookAppointment}</h2>
            
            {/* Search and Filter - Responsive */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '25px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '200px', position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
                <input type="text" placeholder={t.searchDoctor} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '10px 10px 10px 35px', border: '1px solid #ddd', borderRadius: '10px' }} />
              </div>
              <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} style={{ padding: '10px 15px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: 'white' }}>
                {specialties.map(spec => <option key={spec} value={spec}>{spec === 'all' ? 'All Specialties' : spec}</option>)}
              </select>
            </div>
            
            {/* Doctors Grid - Responsive */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {filteredDoctors.map(doctor => (
                <div key={doctor.id} style={{ backgroundColor: 'white', borderRadius: '15px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '45px' }}>{doctor.image}</div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                      <h3 style={{ margin: 0, fontSize: '16px' }}>{doctor.name}</h3>
                      <p style={{ color: primaryColor, fontWeight: 'bold', margin: '5px 0', fontSize: '13px' }}>{doctor.specialty}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '11px', color: '#666' }}>
                        <span>⭐ {doctor.rating}</span>
                        <span>💼 {doctor.experience}</span>
                        <span>📍 {doctor.location}</span>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <span style={{ backgroundColor: '#e8f5e9', color: '#4caf50', padding: '3px 8px', borderRadius: '12px', fontSize: '10px' }}>🟢 Available {doctor.nextAvailable}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px' }}><FiCalendar /> Date:</span>
                      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ padding: '6px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '12px' }} />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px' }}><FiClock /> Time:</span>
                      <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} style={{ padding: '6px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '12px' }}>
                        <option value="">Select Time</option>
                        <option>10:00 AM</option><option>11:00 AM</option><option>12:00 PM</option>
                        <option>2:00 PM</option><option>3:00 PM</option><option>4:00 PM</option><option>5:00 PM</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                      <span style={{ fontWeight: 'bold', color: primaryColor, fontSize: '18px' }}>₹{doctor.fee}</span>
                      <button onClick={() => bookAppointment(doctor)} style={{ backgroundColor: primaryColor, color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>{t.bookAppointment}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* ==================== 2. DIGITAL PRESCRIPTION - FIXED ==================== */}
        {activeTab === 'prescription' && (
          <div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#333', marginBottom: '20px' }}>📄 Digital Prescription</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {appointments.map(app => (
                <div key={app.id} style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '16px' }}>Dr. {app.doctor?.name}</h3>
                  <p style={{ fontSize: '13px' }}>Date: {app.date} at {app.time}</p>
                  <button onClick={() => generatePrescription(app)} style={{ backgroundColor: primaryColor, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }}>Generate Prescription</button>
                </div>
              ))}
            </div>
            
            {prescriptions.length > 0 && (
              <div style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '18px' }}>My Prescriptions</h3>
                {prescriptions.map(pres => (
                  <div key={pres.id} style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: '0 0 10px 0' }}><strong>Dr. {pres.doctorName}</strong> | {pres.date}</p>
                        <table style={{ width: '100%', marginTop: '10px', fontSize: '13px', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid #ddd' }}>
                              <th style={{ textAlign: 'left', padding: '8px' }}>Medicine</th>
                              <th style={{ textAlign: 'left', padding: '8px' }}>Dosage</th>
                              <th style={{ textAlign: 'left', padding: '8px' }}>Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pres.medicines.map((med, idx) => (
                              <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '8px' }}>{med.name}</td>
                                <td style={{ padding: '8px' }}>{med.dosage}</td>
                                <td style={{ padding: '8px' }}>{med.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p style={{ marginTop: '10px' }}><strong>Advice:</strong> {pres.advice}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => downloadPrescription(pres)} style={{ padding: '5px 10px', cursor: 'pointer', fontSize: '12px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: 'white' }}>
                          <FiDownload /> Download
                        </button>
                        <button onClick={() => printPrescription(pres)} style={{ padding: '5px 10px', cursor: 'pointer', fontSize: '12px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: 'white' }}>
                          <FiPrinter /> Print
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* ==================== 3. LAB TEST BOOKING ==================== */}
        {activeTab === 'labtest' && (
          <div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#333', marginBottom: '20px' }}>🔬 Lab Test Booking</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px', marginBottom: '30px' }}>
              {labTests.map(test => (
                <div key={test.id} style={{ backgroundColor: 'white', borderRadius: '15px', padding: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', margin: 0 }}>{test.name}</h4>
                    <p style={{ fontSize: '11px', color: '#888', margin: '5px 0' }}>{test.preparation}</p>
                    <p style={{ fontSize: '11px', margin: 0 }}>⏱️ {test.reportTime}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: primaryColor }}>₹{test.price}</div>
                    <button onClick={() => toggleLabTest(test)} style={{ backgroundColor: selectedTests.find(t => t.id === test.id) ? primaryColor : '#f0f0f0', color: selectedTests.find(t => t.id === test.id) ? 'white' : '#666', border: 'none', padding: '5px 15px', borderRadius: '5px', marginTop: '5px', cursor: 'pointer', fontSize: '12px' }}>
                      {selectedTests.find(t => t.id === test.id) ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Schedule Sample Collection</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                <input type="date" placeholder="Date" value={testAppointment.date} onChange={(e) => setTestAppointment({...testAppointment, date: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <input type="time" placeholder="Time" value={testAppointment.time} onChange={(e) => setTestAppointment({...testAppointment, time: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <input type="text" placeholder="Full Address" value={testAppointment.address} onChange={(e) => setTestAppointment({...testAppointment, address: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
              <button onClick={bookLabTests} style={{ marginTop: '20px', backgroundColor: primaryColor, color: 'white', border: 'none', padding: '10px 25px', borderRadius: '8px', cursor: 'pointer' }}>Book Selected Tests (₹{selectedTests.reduce((s,t)=>s+t.price,0)})</button>
            </div>
          </div>
        )}
        
        {/* ==================== 4. MEDICINE DELIVERY ==================== */}
        {activeTab === 'pharmacy' && (
          <div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#333', marginBottom: '20px' }}>💊 Medicine Delivery</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px', marginBottom: '30px' }}>
              {medicines.map(med => (
                <div key={med.id} style={{ backgroundColor: 'white', borderRadius: '15px', padding: '15px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '35px' }}>{med.image}</div>
                  <h4 style={{ fontSize: '13px', margin: '10px 0' }}>{med.name}</h4>
                  <div style={{ fontWeight: 'bold', color: primaryColor }}>₹{med.price}</div>
                  {med.prescription && <div style={{ fontSize: '10px', color: '#ff9800', marginTop: '5px' }}>⚠️ Prescription Required</div>}
                  <button onClick={() => addToCart(med)} style={{ marginTop: '10px', backgroundColor: primaryColor, color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', width: '100%', cursor: 'pointer', fontSize: '12px' }}>Add to Cart</button>
                </div>
              ))}
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Your Cart ({cart.length} items) - Total: ₹{getCartTotal()}</h3>
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>Cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee', flexWrap: 'wrap', gap: '10px' }}>
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                    <button onClick={() => removeFromCart(item.id)} style={{ color: '#f44336', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                  </div>
                ))
              )}
              <input type="file" accept=".pdf,.jpg" onChange={(e) => setPrescriptionFile(e.target.files[0])} style={{ marginTop: '15px' }} />
              {prescriptionFile && <p style={{ fontSize: '11px', color: '#4caf50', marginTop: '5px' }}>✓ Prescription uploaded</p>}
              <input type="text" placeholder="Delivery Address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              <button onClick={placeOrder} style={{ marginTop: '15px', backgroundColor: primaryColor, color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', width: '100%', cursor: 'pointer' }}>Place Order</button>
            </div>
          </div>
        )}
        
        {/* ==================== 5. HEALTH RECORDS MANAGEMENT ==================== */}
        {activeTab === 'records' && (
          <div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#333', marginBottom: '20px' }}>📊 Health Records Management</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Upload New Record</h3>
                <input type="text" placeholder="Record Name" value={newRecord.name} onChange={(e) => setNewRecord({...newRecord, name: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <select value={newRecord.type} onChange={(e) => setNewRecord({...newRecord, type: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <option value="">Select Type</option>
                  <option>Blood Test</option>
                  <option>X-Ray</option>
                  <option>MRI Report</option>
                  <option>Prescription</option>
                </select>
                <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileUpload} style={{ width: '100%', marginBottom: '10px' }} />
              </div>
              
              <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>My Records ({healthRecords.length})</h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {healthRecords.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No records uploaded</p>
                  ) : (
                    healthRecords.map(record => (
                      <div key={record.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                          <div>
                            <strong style={{ fontSize: '13px' }}>{record.name}</strong>
                            <br />
                            <span style={{ fontSize: '10px', color: '#888' }}>{record.type} • {record.date}</span>
                          </div>
                          <div>
                            <button onClick={() => shareRecord(record)} style={{ marginRight: '5px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}>Share</button>
                            <button onClick={() => downloadRecord(record)} style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '11px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}>Download</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ==================== 6. DOCTOR REVIEWS & RATINGS ==================== */}
        {activeTab === 'reviews' && (
          <div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#333', marginBottom: '20px' }}>⭐ Doctor Reviews & Ratings</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Write a Review</h3>
                <select value={newReview.doctorName} onChange={(e) => setNewReview({...newReview, doctorName: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <option value="">Select Doctor</option>
                  {doctors.map(d => <option key={d.id}>{d.name} ({d.specialty})</option>)}
                </select>
                <div style={{ marginBottom: '10px' }}>
                  Rating: {[1,2,3,4,5].map(r => (
                    <button key={r} onClick={() => setNewReview({...newReview, rating: r})} style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer', color: r <= newReview.rating ? '#ffc107' : '#ddd' }}>★</button>
                  ))}
                </div>
                <textarea placeholder="Your experience..." value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} rows="3" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <button onClick={submitReview} style={{ backgroundColor: primaryColor, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Submit Review</button>
              </div>
              
              <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Patient Reviews</h3>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {reviews.map(review => (
                    <div key={review.id} style={{ padding: '10px', borderBottom: '1px solid #eee', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>{review.doctorName}</strong>
                        <span style={{ color: '#ffc107' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                      </div>
                      <p style={{ fontSize: '12px', margin: '5px 0' }}>"{review.comment}"</p>
                      <div style={{ fontSize: '10px', color: '#888' }}>by {review.patientName} on {review.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ==================== 7. APPOINTMENT REMINDER ==================== */}
        {activeTab === 'reminders' && (
          <div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#333', marginBottom: '20px' }}>🔔 Appointment Reminders</h2>
            <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Reminder Preferences</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="checkbox" checked={reminderSettings.sms} onChange={() => updateReminderSettings('sms')} /> SMS Reminder
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="checkbox" checked={reminderSettings.email} onChange={() => updateReminderSettings('email')} /> Email Reminder
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="checkbox" checked={reminderSettings.whatsapp} onChange={() => updateReminderSettings('whatsapp')} /> WhatsApp Reminder
                </label>
              </div>
            </div>
            
            <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Upcoming Appointments</h3>
            {appointments.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '40px', textAlign: 'center', color: '#999' }}>
                No upcoming appointments
              </div>
            ) : (
              appointments.map(app => (
                <div key={app.id} style={{ backgroundColor: 'white', borderRadius: '15px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                    <div>
                      <strong>Dr. {app.doctor?.name}</strong>
                      <br />
                      <span style={{ fontSize: '13px' }}>{app.date} at {app.time}</span>
                    </div>
                    <div style={{ color: primaryColor, fontSize: '13px' }}>🔔 Reminder 1 hour before</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {/* ==================== 8. SPECIALIST DOCTORS LISTING ==================== */}
        {activeTab === 'doctors' && (
          <div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#333', marginBottom: '20px' }}>👨‍⚕️ Specialist Doctors</h2>
            {['Cardiologist', 'Neurologist', 'Orthopedic', 'Pediatrician', 'Dermatologist', 'Gynecologist', 'Dentist', 'Eye Specialist'].map(specialty => (
              getDoctorsBySpecialty(specialty).length > 0 && (
                <div key={specialty} style={{ marginBottom: '30px' }}>
                  <h3 style={{ color: primaryColor, fontSize: '18px', marginBottom: '15px' }}>{specialty}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                    {getDoctorsBySpecialty(specialty).map(doctor => (
                      <div key={doctor.id} style={{ backgroundColor: 'white', borderRadius: '15px', padding: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ fontSize: '30px' }}>{doctor.image}</div>
                          <div>
                            <strong style={{ fontSize: '14px' }}>{doctor.name}</strong>
                            <br />
                            <span style={{ fontSize: '11px', color: '#888' }}>⭐ {doctor.rating} | 💼 {doctor.experience}</span>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 'bold', color: primaryColor }}>₹{doctor.fee}</div>
                          <button onClick={() => { setSelectedDoctor(doctor); setActiveTab('appointment'); }} style={{ backgroundColor: primaryColor, color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', marginTop: '5px', cursor: 'pointer', fontSize: '11px' }}>Book</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
        
        {/* ==================== 9. MULTI-LANGUAGE SUPPORT ==================== */}
        {activeTab === 'language' && (
          <div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#333', marginBottom: '20px' }}>🌐 Multi-Language Support</h2>
            <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '25px' }}>
                <button onClick={() => setLanguage('english')} style={{ padding: '12px 25px', backgroundColor: language === 'english' ? primaryColor : '#f0f0f0', color: language === 'english' ? 'white' : '#666', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' }}>🇬🇧 English</button>
                <button onClick={() => setLanguage('hindi')} style={{ padding: '12px 25px', backgroundColor: language === 'hindi' ? primaryColor : '#f0f0f0', color: language === 'hindi' ? 'white' : '#666', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' }}>🇮🇳 हिंदी</button>
              </div>
              <div style={{ padding: '15px', backgroundColor: '#f5f7fb', borderRadius: '10px', textAlign: 'left' }}>
                <p><strong>{t.bookAppointment}</strong> - {t.bookAppointment}</p>
                <p><strong>{t.searchDoctor}</strong> - {t.searchDoctor}</p>
                <p><strong>{t.consultation}</strong> - {t.consultation}</p>
                <p><strong>{t.paymentSuccess}</strong> - {t.paymentSuccess}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* ==================== 10. SECURE PAYMENT SYSTEM ==================== */}
        {activeTab === 'payment' && (
          <div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#333', marginBottom: '20px' }}>💳 Secure Payment System</h2>
            
            {/* Payment Methods Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => setPaymentMethod('card')} style={{ flex: '1', minWidth: '100px', padding: '12px', backgroundColor: paymentMethod === 'card' ? primaryColor : '#f0f0f0', color: paymentMethod === 'card' ? 'white' : '#666', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>💳 Card</button>
              <button onClick={() => setPaymentMethod('upi')} style={{ flex: '1', minWidth: '100px', padding: '12px', backgroundColor: paymentMethod === 'upi' ? primaryColor : '#f0f0f0', color: paymentMethod === 'upi' ? 'white' : '#666', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>📱 UPI</button>
              <button onClick={() => setPaymentMethod('qrcode')} style={{ flex: '1', minWidth: '100px', padding: '12px', backgroundColor: paymentMethod === 'qrcode' ? primaryColor : '#f0f0f0', color: paymentMethod === 'qrcode' ? 'white' : '#666', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>📸 QR Code</button>
            </div>
            
            {/* Card Payment */}
            {paymentMethod === 'card' && (
              <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', maxWidth: '500px', margin: '0 auto', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '48px' }}>💳</div>
                  <h3 style={{ fontSize: '18px' }}>Pay with Card</h3>
                </div>
                <input type="text" placeholder="Card Number" value={paymentDetails.cardNumber} onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <input type="text" placeholder="MM/YY" value={paymentDetails.expiry} onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})} style={{ flex: 1, minWidth: '80px', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                  <input type="password" placeholder="CVV" value={paymentDetails.cvv} onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})} style={{ flex: 1, minWidth: '80px', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                </div>
                <input type="text" placeholder="Cardholder Name" value={paymentDetails.cardName} onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})} style={{ width: '100%', padding: '12px', marginTop: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <button onClick={() => addNotification('Payment of ₹500 processed successfully via Card!', 'success')} style={{ width: '100%', marginTop: '20px', backgroundColor: primaryColor, color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Pay ₹500 Now</button>
              </div>
            )}
            
            {/* UPI Payment */}
            {paymentMethod === 'upi' && (
              <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', maxWidth: '500px', margin: '0 auto', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '48px' }}>📱</div>
                  <h3 style={{ fontSize: '18px' }}>Pay with UPI</h3>
                </div>
                <input type="text" placeholder="UPI ID (e.g., name@okhdfcbank)" value={paymentDetails.upiId} onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <button onClick={() => addNotification('Payment of ₹500 processed successfully via UPI!', 'success')} style={{ width: '100%', marginTop: '20px', backgroundColor: primaryColor, color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Pay ₹500 via UPI</button>
              </div>
            )}
            
            {/* QR Code Payment */}
            {paymentMethod === 'qrcode' && (
              <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', maxWidth: '500px', margin: '0 auto', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '48px' }}>📸</div>
                  <h3 style={{ fontSize: '18px' }}>Scan QR Code & Pay</h3>
                  <p style={{ color: '#666', fontSize: '12px' }}>Scan using any UPI app</p>
                </div>
                
                <div style={{ textAlign: 'center', marginBottom: '20px', padding: '20px', backgroundColor: '#f5f7fb', borderRadius: '15px' }}>
                  <svg width="160" height="160" viewBox="0 0 200 200" style={{ margin: '0 auto' }}>
                    <rect width="200" height="200" fill="white" />
                    <rect x="10" y="10" width="40" height="40" fill="black" />
                    <rect x="15" y="15" width="30" height="30" fill="white" />
                    <rect x="20" y="20" width="20" height="20" fill="black" />
                    <rect x="150" y="10" width="40" height="40" fill="black" />
                    <rect x="155" y="15" width="30" height="30" fill="white" />
                    <rect x="160" y="20" width="20" height="20" fill="black" />
                    <rect x="10" y="150" width="40" height="40" fill="black" />
                    <rect x="15" y="155" width="30" height="30" fill="white" />
                    <rect x="20" y="160" width="20" height="20" fill="black" />
                    <rect x="85" y="85" width="30" height="30" fill="white" />
                    <text x="100" y="103" fontSize="12" textAnchor="middle" fill={primaryColor} fontWeight="bold">₹</text>
                  </svg>
                  <p style={{ fontSize: '12px', marginTop: '10px' }}>UPI: <strong>healthcare@okhdfcbank</strong></p>
                </div>
                
                <div style={{ marginBottom: '15px', padding: '12px', backgroundColor: '#e3f2fd', borderRadius: '10px' }}>
                  <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '12px' }}>📱 How to Pay:</p>
                  <ol style={{ margin: 0, paddingLeft: '18px', fontSize: '11px', color: '#555' }}>
                    <li>Open any UPI app (Google Pay, PhonePe, Paytm)</li>
                    <li>Tap "Scan QR Code"</li>
                    <li>Scan the QR code above</li>
                    <li>Enter amount ₹500</li>
                    <li>Enter UPI PIN to pay</li>
                  </ol>
                </div>
                
                <button onClick={() => { addNotification('✅ Payment of ₹500 received successfully via QR Code!', 'success'); }} style={{ width: '100%', backgroundColor: primaryColor, color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>I Have Completed Payment</button>
              </div>
            )}
            
            {/* Payment Summary */}
            <div style={{ marginTop: '30px', backgroundColor: 'white', borderRadius: '15px', padding: '20px', maxWidth: '500px', margin: '20px auto 0', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h4 style={{ marginBottom: '15px', fontSize: '16px' }}>Payment Summary</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span>Consultation Fee</span>
                <span>₹500</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '5px' }}>
                <span>Total Payable</span>
                <span style={{ color: primaryColor, fontSize: '18px' }}>₹500</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Payment Modal for Appointment */}
      {paymentModal && selectedDoctor && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '24px', maxWidth: '450px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px' }}>Complete Payment</h2>
              <button onClick={() => setPaymentModal(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f7fb', borderRadius: '10px' }}>
              <p><strong>Dr. {selectedDoctor.name}</strong></p>
              <p style={{ fontSize: '13px' }}>{selectedDoctor.specialty} • {selectedDate} at {selectedTime}</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: primaryColor }}>₹{selectedDoctor.fee}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <button onClick={() => setPaymentMethod('card')} style={{ flex: 1, padding: '10px', backgroundColor: paymentMethod === 'card' ? primaryColor : '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>💳 Card</button>
              <button onClick={() => setPaymentMethod('upi')} style={{ flex: 1, padding: '10px', backgroundColor: paymentMethod === 'upi' ? primaryColor : '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>📱 UPI</button>
            </div>
            {paymentMethod === 'card' ? (
              <>
                <input type="text" placeholder="Card Number" style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" placeholder="MM/YY" style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                  <input type="password" placeholder="CVV" style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                </div>
              </>
            ) : (
              <input type="text" placeholder="UPI ID" style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
            )}
            <button onClick={completePayment} style={{ width: '100%', marginTop: '20px', backgroundColor: primaryColor, color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Pay ₹{selectedDoctor.fee}</button>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer style={{ backgroundColor: '#2c3e50', color: 'white', padding: '25px 0', marginTop: '50px' }}>
        <div className="container mx-auto px-4" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px' }}>© 2024 HealthCare Plus. All rights reserved. | Emergency: 102 | Support: +91 12345 67890</p>
        </div>
      </footer>
      
      <style>{`
        .container { max-width: 1280px; margin: 0 auto; }
        * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        @media (max-width: 768px) {
          .container { padding-left: 16px; padding-right: 16px; }
        }
      `}</style>
    </div>
  );
};

export default HealthcareServices;