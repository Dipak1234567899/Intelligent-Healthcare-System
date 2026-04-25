import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import WhatsAppConsultModal from './WhatsAppConsultModal';

// ========================
// 1. Constants & Helpers
// ========================
const DOCTORS_LIST = [
  { id: 1, name: 'Priya Sharma', degree: 'MBBS, MD', specialty: 'General Physician', whatsappNumber: '9876543210', experience: '12 years', location: 'Mumbai', available: true, rating: 4.8, about: 'Experienced General Physician with expertise in primary care' },
  { id: 2, name: 'Rajesh Kumar', degree: 'MBBS, DM Cardiology', specialty: 'Cardiologist', whatsappNumber: '9876543211', experience: '15 years', location: 'Delhi', available: true, rating: 4.9, about: 'Senior Cardiologist with specialization in heart diseases' },
  { id: 3, name: 'Anjali Mehta', degree: 'MBBS, MD Pediatrics', specialty: 'Pediatrician', whatsappNumber: '9876543212', experience: '10 years', location: 'Bangalore', available: true, rating: 4.7, about: 'Child specialist with gentle care approach' },
  { id: 4, name: 'Vikram Singh', degree: 'MBBS, MD Dermatology', specialty: 'Dermatologist', whatsappNumber: '9876543213', experience: '8 years', location: 'Chennai', available: true, rating: 4.6, about: 'Skin care specialist and dermatologist' },
  { id: 5, name: 'Neha Gupta', degree: 'MBBS, MS Gynecology', specialty: 'Gynecologist', whatsappNumber: '9876543214', experience: '11 years', location: 'Pune', available: true, rating: 4.9, about: 'Women health specialist' },
];

const NAV_LINKS = [
  { path: '/', label: 'Home', icon: '⌂' },
  { path: '/doctors', label: 'Doctors', icon: '⚕' },
  { path: '/about', label: 'About', icon: '◯' },
  { path: '/contact', label: 'Contact', icon: '⌕' },
  { path: '/department', label: 'Services', icon: '◰' },
];

// Helper: Get user avatar URL
const getUserAvatar = (userData) => {
  if (userData?.image) return userData.image;
  const name = userData?.name?.[0] || 'U';
  return `https://ui-avatars.com/api/?background=0d9488&color=fff&bold=true&name=${name}`;
};

// Helper: Get first name
const getFirstName = (fullName) => fullName?.split(' ')[0] || 'User';

// ========================
// 2. Sub-components
// ========================
const ThemeToggle = ({ isDarkMode, toggleTheme, className = '' }) => (
  <button
    onClick={toggleTheme}
    className={`relative group p-2 rounded-full transition-all duration-300 hover:scale-110 ${className}`}
    aria-label="Toggle theme"
  >
    <div className={`absolute inset-0 rounded-full transition-opacity ${isDarkMode ? 'bg-yellow-400/20' : 'bg-gray-800/10'} group-hover:opacity-100 opacity-0`} />
    {isDarkMode ? (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
      </svg>
    ) : (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    )}
  </button>
);

const EmergencyButton = ({ onClick, isDarkMode }) => (
  <button onClick={onClick} className="relative group">
    <div className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 ${isDarkMode ? 'bg-red-900/30' : 'bg-red-50'} rounded-full hover:bg-red-100 transition-colors`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
      </span>
      <span className={`text-xs font-medium ${isDarkMode ? 'text-red-400' : 'text-red-700'} hidden sm:inline`}>Emergency</span>
      <span className={`text-xs font-bold ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>102</span>
    </div>
  </button>
);

const WhatsAppButton = ({ onClick, isDarkMode }) => (
  <div className="relative group">
    <button onClick={onClick} className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full hover:shadow-lg transition-all transform hover:scale-105">
      <div className="relative">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.032 2.001c-5.52 0-10 4.48-10 10 0 1.76.46 3.42 1.26 4.87l-1.26 4.63 4.86-1.21c1.42.77 3.03 1.2 4.74 1.2 5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18c-1.61 0-3.12-.43-4.44-1.18l-.32-.19-2.88.72.77-2.82-.2-.33c-.8-1.35-1.25-2.9-1.25-4.54 0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z"/>
        </svg>
        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-300 rounded-full animate-pulse" />
      </div>
      <span className="text-white text-xs sm:text-sm font-medium hidden sm:inline">WhatsApp Consult</span>
      <span className="text-white text-xs font-medium sm:hidden">WA</span>
    </button>
    <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${isDarkMode ? 'bg-gray-800' : 'bg-gray-900'} text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
      Consult via WhatsApp
    </div>
  </div>
);

const UserDropdown = ({ userData, isDarkMode, onNavigate, onLogout, onClose }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={dropdownRef} className={`absolute right-0 mt-3 w-56 sm:w-64 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-2xl border overflow-hidden z-50`}>
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-3 text-white">
        <p className="font-semibold text-sm">{userData?.name}</p>
        <p className="text-xs text-white/80 truncate">{userData?.email}</p>
      </div>
      <div className="p-2">
        <button onClick={() => { onNavigate('/my-profile'); onClose(); }} className={`w-full text-left px-3 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} rounded-lg transition-colors`}>
          Profile
        </button>
        <button onClick={() => { onNavigate('/my-appointments'); onClose(); }} className={`w-full text-left px-3 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} rounded-lg transition-colors`}>
          Appointments
        </button>
        <button onClick={onLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          Sign Out
        </button>
      </div>
    </div>
  );
};

// ========================
// 3. Main Navbar Component
// ========================
const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  // State
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showEmergencyCall, setShowEmergencyCall] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  // Theme handling
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => setIsDarkMode(prev => !prev), []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
    setShowDropdown(false);
    setShowMenu(false);
  }, [setToken, navigate]);

  // WhatsApp modal handlers
  const openWhatsAppConsult = useCallback((doctor) => {
    setSelectedDoctor(doctor);
    setShowWhatsAppModal(true);
    setShowMenu(false);
  }, []);

  // Emergency call
  const startEmergencyCall = useCallback(() => {
    setShowEmergencyCall(true);
    setTimeout(() => {
      alert("🚑 Emergency services have been notified! Help is on the way.");
      setShowEmergencyCall(false);
    }, 3000);
  }, []);

  // Navigation helper
  const handleNavigation = useCallback((path) => {
    navigate(path);
    setShowMenu(false);
    setShowDropdown(false);
  }, [navigate]);

  return (
    <>
      {/* Navbar Structure */}
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className={`absolute inset-0 transition-all duration-500 ${
          isScrolled 
            ? isDarkMode ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-700' : 'bg-white/95 backdrop-blur-xl border-b border-gray-200'
            : isDarkMode ? 'bg-gradient-to-r from-gray-900 via-gray-900/98 to-gray-900/95 backdrop-blur-md' : 'bg-gradient-to-r from-white via-white/98 to-white/95 backdrop-blur-md'
        }`} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div onClick={() => handleNavigation('/')} className="group cursor-pointer">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-teal-400 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all shadow-lg">
                    <span className="text-white text-lg sm:text-xl">⚕</span>
                  </div>
                </div>
                <div>
                  <h1 className={`text-base sm:text-xl lg:text-2xl font-light tracking-tight ${isDarkMode ? 'text-white' : ''}`}>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>HEALTH</span>
                    <span className="font-extralight text-teal-600">CONNECT</span>
                  </h1>
                  <div className="h-0.5 w-0 group-hover:w-full bg-teal-400 transition-all duration-500" />
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center gap-1 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'} rounded-full p-1`}>
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    relative px-4 lg:px-5 py-2 rounded-full transition-all duration-300
                    ${isActive 
                      ? isDarkMode ? 'text-teal-400 bg-gray-800 shadow-sm' : 'text-teal-600 bg-white shadow-sm'
                      : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-1 lg:gap-2">
                    <span className="text-base lg:text-lg">{link.icon}</span>
                    <span className="text-xs lg:text-sm font-medium">{link.label}</span>
                  </div>
                </NavLink>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
              
              {token && (
                <>
                  <WhatsAppButton onClick={() => openWhatsAppConsult(DOCTORS_LIST[0])} isDarkMode={isDarkMode} />
                  <EmergencyButton onClick={startEmergencyCall} isDarkMode={isDarkMode} />
                </>
              )}

              {/* User Section */}
              {token && userData ? (
                <div className="relative">
                  <button onClick={() => setShowDropdown(prev => !prev)} className="group focus:outline-none">
                    <div className={`flex items-center gap-1 sm:gap-2 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gradient-to-r from-gray-50 to-white'} rounded-full pl-1 pr-2 sm:pr-3 py-1 border ${isDarkMode ? 'border-gray-700 hover:border-teal-700' : 'border-gray-100 hover:border-teal-200'} transition-all shadow-sm`}>
                      <img className="h-7 w-7 sm:h-9 sm:w-9 rounded-full object-cover ring-2 ring-white" src={getUserAvatar(userData)} alt="avatar" />
                      <div className="hidden sm:block text-left">
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{getFirstName(userData.name)}</div>
                        <div className="text-[10px] text-green-600 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full" />
                          Online
                        </div>
                      </div>
                      <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {showDropdown && <UserDropdown userData={userData} isDarkMode={isDarkMode} onNavigate={handleNavigation} onLogout={logout} onClose={() => setShowDropdown(false)} />}
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                  <button onClick={() => handleNavigation('/login')} className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Sign in</button>
                  <button onClick={() => handleNavigation('/register')} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-colors">Get Started</button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button onClick={() => setShowMenu(true)} className={`lg:hidden p-1.5 sm:p-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showWhatsAppModal && selectedDoctor && (
        <WhatsAppConsultModal isOpen={showWhatsAppModal} onClose={() => { setShowWhatsAppModal(false); setSelectedDoctor(null); }} doctor={selectedDoctor} userData={userData} />
      )}

      {showEmergencyCall && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-md mx-4 text-center animate-scaleIn`}>
            <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-4xl">🚑</span>
            </div>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Emergency Assistance</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>Connecting you to emergency services...</p>
            <div className={`flex justify-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>⚕️ Ambulance dispatched</span>
              <span>•</span>
              <span>📞 102</span>
            </div>
            <div className="mt-4 text-xs text-gray-400">Please stay calm. Help is on the way.</div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowMenu(false)} />
          <div className={`fixed right-0 top-0 bottom-0 w-80 max-w-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl animate-slideInRight`}>
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚕</span>
                  <span className="font-bold">HEALTHCONNECT</span>
                </div>
                <button onClick={() => setShowMenu(false)} className="p-1 text-2xl">✕</button>
              </div>
              {userData && (
                <div className="mt-4 flex items-center gap-3 border-t border-white/20 pt-4">
                  <img className="h-10 w-10 rounded-full object-cover ring-2 ring-white" src={getUserAvatar(userData)} alt="avatar" />
                  <div>
                    <p className="font-semibold text-sm">{userData?.name}</p>
                    <p className="text-xs text-white/80 truncate max-w-[180px]">{userData?.email}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              {NAV_LINKS.map(link => (
                <NavLink key={link.path} to={link.path} onClick={() => setShowMenu(false)} className={({ isActive }) => `block py-3 ${isDarkMode ? 'text-gray-300 border-gray-700' : 'text-gray-700 border-gray-100'} border-b transition-colors ${isActive ? 'text-teal-600 font-semibold' : ''}`}>
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.label}</span>
                  </span>
                </NavLink>
              ))}
              
              <button onClick={() => { toggleTheme(); setShowMenu(false); }} className={`w-full mt-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${isDarkMode ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                {isDarkMode ? <><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg><span>Light Mode</span></> : <><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg><span>Dark Mode</span></>}
              </button>
              
              {token ? (
                <>
                  <div className="mt-4">
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Quick Consultation</p>
                    <button onClick={() => openWhatsAppConsult(DOCTORS_LIST[0])} className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-transform hover:scale-105">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.032 2.001c-5.52 0-10 4.48-10 10 0 1.76.46 3.42 1.26 4.87l-1.26 4.63 4.86-1.21c1.42.77 3.03 1.2 4.74 1.2 5.52 0 10-4.48 10-10s-4.48-10-10-10z"/></svg>
                      WhatsApp Consultation
                    </button>
                  </div>
                  <div className="mt-3">
                    <button onClick={startEmergencyCall} className="w-full py-3 bg-red-500 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                      <span className="text-lg">🚑</span> Emergency: 102
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-4 space-y-2">
                  <button onClick={() => handleNavigation('/login')} className="w-full py-3 bg-teal-500 text-white rounded-xl font-medium">Sign In</button>
                  <button onClick={() => handleNavigation('/register')} className="w-full py-3 border border-teal-500 text-teal-500 rounded-xl font-medium">Get Started</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16 sm:h-20" />

      {/* Global Animations */}
      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes dropdownIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideInRight { animation: slideInRight 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
        .animate-dropdownIn { animation: dropdownIn 0.2s ease-out; }
      `}</style>
    </>
  );
};

export default Navbar;