import React, { useState, useRef, useEffect } from 'react';
import { 
  FiMapPin, FiPhone, FiMail, FiUsers, FiSend, FiClock, 
  FiMessageSquare, FiExternalLink, FiCheckCircle, FiAlertCircle, 
  FiGlobe, FiBriefcase, FiAward, FiHeart, FiStar, FiCalendar,
  FiVideo, FiShield, FiActivity, FiHelpCircle
} from 'react-icons/fi';
import { FaWhatsapp, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaAmbulance } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const formRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await emailjs.sendForm(
        'service_3ea6763',
        'template_fmthihy', 
        formRef.current,
        'CuFzG36xJh0hb_4Dp'
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', department: '', message: '' });
      setSelectedDepartment('');
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'department') setSelectedDepartment(e.target.value);
  };

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Bihar+India+Healthcare', '_blank');
  };

  const makePhoneCall = () => {
    window.location.href = 'tel:+911234567890';
  };

  const sendEmail = () => {
    window.location.href = 'mailto:healthcare@healthconnect.com';
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/911234567890?text=Hello%2C%20I%20need%20medical%20assistance', '_blank');
  };

  const departments = [
    { value: 'general', label: 'General Inquiry', icon: '📋' },
    { value: 'appointment', label: 'Book Appointment', icon: '📅' },
    { value: 'emergency', label: 'Emergency', icon: '🚑' },
    { value: 'feedback', label: 'Feedback/Suggestions', icon: '💬' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' },
    { value: 'career', label: 'Career', icon: '💼' }
  ];

  const contactCards = [
    { icon: FiPhone, title: "Emergency Helpline", details: "+91 12345 67890", subtext: "24/7 Available", action: "Call Now", onClick: makePhoneCall, color: "red", gradient: "from-red-500 to-rose-500", badge: "Urgent Care" },
    { icon: FaWhatsapp, title: "WhatsApp Consult", details: "+91 12345 67890", subtext: "Quick Response", action: "Chat Now", onClick: openWhatsApp, color: "green", gradient: "from-green-500 to-emerald-500", badge: "Instant" },
    { icon: FiMail, title: "Email Support", details: "healthcare@healthconnect.com", subtext: "24/7 Support", action: "Send Email", onClick: sendEmail, color: "blue", gradient: "from-blue-500 to-cyan-500", badge: "Official" }
  ];

  const stats = [
    { icon: FiUsers, value: "10,000+", label: "Happy Patients", color: "text-teal-600" },
    { icon: FiClock, value: "15 min", label: "Avg Response", color: "text-blue-600" },
    { icon: FiAward, value: "98%", label: "Satisfaction", color: "text-purple-600" },
    { icon: FiGlobe, value: "50+", label: "Expert Doctors", color: "text-orange-600" }
  ];

  const faqs = [
    { q: "How do I book an appointment?", a: "You can book an appointment by calling our helpline, using the appointment form, or visiting any of our centers." },
    { q: "Is online consultation available?", a: "Yes, we offer telemedicine consultations via video call. Select 'Online Consultation' while booking." },
    { q: "What are the consultation fees?", a: "General consultation starts from ₹499. Specialist consultation varies by department." },
    { q: "Do you accept health insurance?", a: "Yes, we accept major health insurance plans. Contact us for more details." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Section with Medical Theme */}
      <div className="relative bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <FiHeart className="text-white text-sm animate-pulse" />
            <span className="text-white text-sm font-medium">We Care About Your Health</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            We're Here for <span className="text-yellow-300">You</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Have questions? Need medical assistance? Our dedicated team is ready to help you 
            with compassionate care and expert guidance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        
        {/* Emergency Alert Bar */}
        <div className="bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl p-4 mb-12 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <FaAmbulance className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Emergency? Need Immediate Help?</h3>
                <p className="text-white/90 text-sm">Our emergency team is available 24/7</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={makePhoneCall} className="bg-white text-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-50 transition-all">
                📞 Call 102
              </button>
              <button className="bg-white/20 text-white px-6 py-2 rounded-full font-bold hover:bg-white/30 transition-all">
                🚑 Find ER
              </button>
            </div>
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
                onClick={card.onClick}
              >
                <div className={`absolute top-3 right-3 bg-${card.color}-100 text-${card.color}-600 text-xs px-2 py-1 rounded-full`}>
                  {card.badge}
                </div>
                <div className={`w-14 h-14 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-600 font-medium text-lg">{card.details}</p>
                <p className="text-sm text-gray-500 mb-4">{card.subtext}</p>
                <button className="text-teal-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  {card.action} <FiExternalLink className="text-xs" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-100">
                <div className={`w-12 h-12 bg-${stat.color.split('-')[1]}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`text-2xl ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <FiMessageSquare className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-white">Request a Callback</h2>
              </div>
              <p className="text-white/80 text-sm">Fill the form and our health advisor will contact you within 2 hours</p>
            </div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="p-8 space-y-5">
              {submitStatus === 'success' && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-center gap-3 animate-slideDown">
                  <FiCheckCircle className="text-green-500 text-xl" />
                  <div>
                    <p className="text-green-800 font-medium">Request submitted successfully!</p>
                    <p className="text-green-600 text-sm">Our team will contact you shortly.</p>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center gap-3 animate-slideDown">
                  <FiAlertCircle className="text-red-500 text-xl" />
                  <div>
                    <p className="text-red-800 font-medium">Submission failed</p>
                    <p className="text-red-600 text-sm">Please try again or call us directly.</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${focusedField === 'name' ? 'border-teal-500 ring-2 ring-teal-200' : 'border-gray-200'}`} placeholder="Dr. John Doe" required disabled={isSubmitting} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${focusedField === 'email' ? 'border-teal-500 ring-2 ring-teal-200' : 'border-gray-200'}`} placeholder="john@example.com" required disabled={isSubmitting} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all" placeholder="+91 12345 67890" required disabled={isSubmitting} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
                  <select name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all bg-white" required disabled={isSubmitting}>
                    <option value="">Select Department</option>
                    {departments.map(dept => <option key={dept.value} value={dept.value}>{dept.icon} {dept.label}</option>)}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message / Symptoms *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all resize-none" placeholder="Describe your health concern or query..." required disabled={isSubmitting} />
              </div>
              
              <button type="submit" disabled={isSubmitting} className={`w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'}`}>
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Submitting...
                  </span>
                ) : (
                  <>📋 Submit Request →</>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                🔒 Your information is secure and confidential
              </p>
            </form>
          </div>

          {/* Right Side - Info Section */}
          <div className="space-y-6">
            {/* Location Card with Map */}
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl overflow-hidden shadow-xl group cursor-pointer" onClick={openGoogleMaps}>
              <div className="relative h-52 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=400&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMapPin className="text-white text-xl" />
                    <h3 className="text-xl font-bold">Our Medical Center</h3>
                  </div>
                  <p className="text-white/90 mb-3">Bihar, India — Healthcare Analytics & Innovation Hub</p>
                  <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all flex items-center gap-2">
                    Get Directions <FiExternalLink />
                  </button>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <FiClock className="text-teal-600 text-xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Working Hours</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-semibold text-gray-800">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-semibold text-gray-800">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-semibold text-red-600">Emergency Only</span>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                  <FiHeart className="text-pink-600 text-xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Follow Us</h3>
              </div>
              <div className="flex gap-3 mb-4">
                <button onClick={openWhatsApp} className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                  <FaWhatsapp /> WhatsApp
                </button>
                <button onClick={sendEmail} className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                  <FiMail /> Email
                </button>
              </div>
              <div className="flex justify-center gap-4 pt-3 border-t border-gray-100">
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all"><FaFacebook /></a>
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all"><FaTwitter /></a>
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-pink-100 rounded-full flex items-center justify-center text-gray-600 hover:text-pink-600 transition-all"><FaInstagram /></a>
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all"><FaLinkedin /></a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full mb-4">
              <FiHelpCircle /> <span className="text-sm font-medium">Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Common Questions</h2>
            <p className="text-gray-500 mt-2">Find quick answers to your queries</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-teal-500">❓</span> {faq.q}
                </h3>
                <p className="text-gray-600 text-sm pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Contact;