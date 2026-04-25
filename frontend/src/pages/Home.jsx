import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    experience: 0,
    clinics: 0,
    onlineDoctors: 0
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [livePatients, setLivePatients] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [showThemePopup, setShowThemePopup] = useState(false);
  const themePopupRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themePopupRef.current && !themePopupRef.current.contains(event.target)) {
        setShowThemePopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Refs for animations
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const isFeaturesInView = useInView(featuresRef, { once: true });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true });
  
  const controls = useAnimation();

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePatients(Math.floor(100 + Math.random() * 200));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isStatsInView) {
      controls.start("visible");
      animateNumbers();
    }
  }, [isStatsInView]);

  const animateNumbers = () => {
    const targets = { 
      doctors: 500, 
      patients: 100000, 
      experience: 10, 
      clinics: 30,
      onlineDoctors: 120
    };
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        doctors: Math.min(Math.floor(targets.doctors * progress), targets.doctors),
        patients: Math.min(Math.floor(targets.patients * progress), targets.patients),
        experience: Math.min(Math.floor(targets.experience * progress), targets.experience),
        clinics: Math.min(Math.floor(targets.clinics * progress), targets.clinics),
        onlineDoctors: Math.min(Math.floor(targets.onlineDoctors * progress), targets.onlineDoctors)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepTime);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setNewsletterEmail('');
      setShowNewsletter(false);
    }
  };

  const toggleTheme = (mode) => {
    setIsDarkMode(mode === 'dark');
    setShowThemePopup(false);
  };

  const testimonials = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      role: "Senior Cardiologist",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      text: "HealthConnect has revolutionized how I connect with patients. The platform is intuitive, secure, and has helped me reach more people in need.",
      date: "2 days ago",
      verified: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Patient",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "Excellent service! Booked an appointment and got consultation within hours. The doctors are very professional and caring.",
      date: "5 days ago",
      verified: true
    },
    {
      id: 3,
      name: "Anjali Mehta",
      role: "Mother of Patient",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "The pediatric consultation was amazing. My child received the best care possible. Highly recommended for parents!",
      date: "1 week ago",
      verified: true
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Frequent User",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      text: "Great platform for regular health checkups. The reminder system is very helpful for follow-ups and medication.",
      date: "3 days ago",
      verified: true
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Instant Appointments",
      description: "Book same-day appointments with verified doctors. No waiting time.",
      color: "text-teal-600",
      bg: "bg-teal-50",
      delay: 0
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Expert Doctors",
      description: "Connect with 500+ specialist doctors from top medical institutions.",
      color: "text-rose-600",
      bg: "bg-rose-50",
      delay: 0.1
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Secure & Private",
      description: "Your health data is protected with bank-grade encryption standards.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      delay: 0.2
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636L16.95 7.05A7 7 0 1016.95 16.95l1.414 1.414a9 9 0 11-1.414-1.414z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "24/7 Support",
      description: "Round-the-clock medical assistance with live chat and call support.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      delay: 0.3
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
    }`}>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setShowThemePopup(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
        aria-label="Theme Settings"
      >
        {isDarkMode ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      {/* Theme Popup Modal */}
      <AnimatePresence>
        {showThemePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowThemePopup(false)}
          >
            <motion.div
              ref={themePopupRef}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Popup Header */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">Theme Settings</h3>
                      <p className="text-white/80 text-sm">Choose your preferred look</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowThemePopup(false)}
                    className="text-white/80 hover:text-white transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Popup Body */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Light Mode Option */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleTheme('light')}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      !isDarkMode 
                        ? 'border-teal-500 bg-teal-50 dark:bg-gray-700' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">Light Mode</h4>
                          {!isDarkMode && (
                            <span className="px-2 py-0.5 bg-teal-100 text-teal-600 text-xs rounded-full">Active</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Bright and clean interface</p>
                      </div>
                      {!isDarkMode && (
                        <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </motion.button>

                  {/* Dark Mode Option */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleTheme('dark')}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      isDarkMode 
                        ? 'border-teal-500 bg-gray-700' 
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h4>
                          {isDarkMode && (
                            <span className="px-2 py-0.5 bg-teal-100 text-teal-600 text-xs rounded-full">Active</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Easy on the eyes at night</p>
                      </div>
                      {isDarkMode && (
                        <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </motion.button>

                  {/* Auto Mode Option (System Preference) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      setIsDarkMode(systemPrefersDark);
                      setShowThemePopup(false);
                    }}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-teal-300 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 7h14M5 12h14M5 17h14M3 3h18v18H3z" />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-900 dark:text-white">System Default</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Follow your device settings</p>
                      </div>
                    </div>
                  </motion.button>
                </div>

                {/* Preview Section */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">Preview</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Popup Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setShowThemePopup(false)}
                  className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      <main>
        {/* Hero Section with Modern Design */}
        <section className={`relative overflow-hidden transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-teal-50 via-white to-blue-50'
        }`}>
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 ${
                    isDarkMode ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-700'
                  } text-sm font-medium rounded-full`}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    Trusted Healthcare Platform
                  </span>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 ${
                    isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                  } text-sm font-medium rounded-full`}>
                    <span className="text-lg">🟢</span>
                    {livePatients}+ Live Consultations
                  </span>
                </div>
                
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Your Health,
                  <br />
                  <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                    Our Priority
                  </span>
                </h1>
                
                <p className={`text-lg leading-relaxed max-w-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Connect with India's most trusted doctors. Book appointments instantly and get quality healthcare from the comfort of your home.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/doctors')}
                    className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-medium rounded-lg hover:from-teal-700 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    Book Appointment →
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/doctors')}
                    className={`px-8 py-3.5 border-2 font-medium rounded-lg transition-all ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:border-teal-600 hover:text-teal-400' 
                        : 'border-gray-300 text-gray-700 hover:border-teal-600 hover:text-teal-600'
                    }`}
                  >
                    Find a Doctor
                  </motion.button>
                </div>
                
                {/* Trust Badges */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                        src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i}.jpg`}
                        alt="User"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Trusted by 50,000+ patients</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Right Content - Hero Image */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                    alt="Doctor consulting patient"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                
                {/* Floating Cards */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">24/7 Emergency</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Always Available</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">100% Secure</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Data Protection</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section with Gradient */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center"
            >
              {[
                { value: stats.doctors, label: "Expert Doctors", suffix: "+", icon: "👨‍⚕️" },
                { value: stats.patients, label: "Happy Patients", suffix: "+", icon: "😊" },
                { value: stats.experience, label: "Years Experience", suffix: "+", icon: "📅" },
                { value: stats.clinics, label: "Partner Clinics", suffix: "+", icon: "🏥" },
                { value: stats.onlineDoctors, label: "Online Now", suffix: "", icon: "🟢" }
              ].map((stat, index) => (
                <motion.div key={index} variants={itemVariants} className="text-white">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section with Cards */}
        <section ref={featuresRef} className={`py-20 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-600 uppercase tracking-wider">Why Choose Us</span>
              <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Comprehensive Healthcare Services
              </h2>
              <p className={`mt-4 max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                We provide end-to-end healthcare solutions with expert doctors and modern facilities
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isFeaturesInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className={`rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 hover:border-teal-500' 
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <div className={feature.color}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{feature.title}</h3>
                  <p className={`leading-relaxed ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{feature.description}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                      Learn more 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={testimonialsRef} className={`py-20 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-600 uppercase tracking-wider">Testimonials</span>
              <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                What Our Patients Say
              </h2>
              <p className={`mt-4 max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Real stories from real patients who trusted us with their health
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-all ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                    {testimonial.verified && (
                      <div className="text-green-500 text-xl">✓</div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className={`text-sm leading-relaxed mb-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>"{testimonial.text}"</p>
                  <p className="text-xs text-gray-400">{testimonial.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Banner */}
        <section className={`py-16 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-8 md:p-12 text-white">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
                    </span>
                    Emergency Care Available 24/7
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Need Immediate Medical Assistance?
                  </h2>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Our emergency response team is available 24/7 to provide immediate medical care and support.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-white text-red-600 font-medium rounded-lg hover:bg-gray-100 transition shadow-md"
                    >
                      📞 Call Emergency: 102
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition"
                    >
                      📍 Find Nearest Hospital
                    </motion.button>
                  </div>
                </div>
                <div className="hidden md:block relative h-full">
                  <img 
                    src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                    alt="Emergency care"
                    className="w-full h-80 object-cover rounded-r-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className={`py-16 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-teal-50 to-blue-50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-sm font-medium text-teal-600 uppercase tracking-wider">Stay Updated</span>
                <h2 className={`text-3xl md:text-4xl font-bold mt-2 mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Subscribe to Our Newsletter
                </h2>
                <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Get latest health tips, medical updates, and exclusive offers directly in your inbox.
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-medium rounded-lg hover:from-teal-700 hover:to-teal-600 transition shadow-md"
                  >
                    Subscribe →
                  </motion.button>
                </form>
                
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg"
                    >
                      ✓ Successfully subscribed to newsletter!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <SpecialityMenu />
      <TopDoctors />
      <Banner />

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-teal-400 text-2xl">⚕</span>
                <span className="text-xl font-semibold">HEALTHCONNECT</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Making quality healthcare accessible and affordable for everyone across India.
              </p>
              <div className="flex gap-3">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                  <a key={social} href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                    <span className="text-xs">{social[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-400 hover:text-teal-400 transition">Home</Link></li>
                <li><Link to="/doctors" className="text-gray-400 hover:text-teal-400 transition">Find Doctors</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-teal-400 transition">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-teal-400 transition">Contact</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-teal-400 transition">Health Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Our Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-teal-400 transition cursor-pointer">Online Consultation</li>
                <li className="hover:text-teal-400 transition cursor-pointer">Emergency Care</li>
                <li className="hover:text-teal-400 transition cursor-pointer">Health Records</li>
                <li className="hover:text-teal-400 transition cursor-pointer">Pharmacy Delivery</li>
                <li className="hover:text-teal-400 transition cursor-pointer">Lab Tests</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Contact Info</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <span>📞</span> 
                  <div>
                    <div>1800-123-4567</div>
                    <div className="text-xs">Toll Free</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span>✉️</span> 
                  <div>
                    <div>support@healthconnect.com</div>
                    <div className="text-xs">24/7 Support</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span>📍</span> 
                  <div>
                    <div>Chennai, India</div>
                    <div className="text-xs">Global Presence</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 HEALTHCONNECT. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
      
      {/* FIXED: Removed 'jsx' attribute from style tag */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home; 