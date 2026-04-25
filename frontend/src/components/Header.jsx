import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const heroImage = document.getElementById('hero-image');
      if (heroImage) {
        const scrollPosition = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: "500+", label: "Expert Doctors", icon: "👨‍⚕️" },
    { value: "50k+", label: "Happy Patients", icon: "😊" },
    { value: "24/7", label: "Emergency Care", icon: "🚑" },
    { value: "98%", label: "Success Rate", icon: "📊" }
  ];

  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 relative z-10'>
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-700 to-blue-800 shadow-2xl transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Enhanced Glass Morphism Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px',
          }} />
          
          <div className='relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 md:p-10 lg:p-12'>
            
            {/* Left Content */}
            <div className='text-white space-y-6'>
              {/* Enhanced Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium border border-white/30 shadow-lg animate-slideInLeft">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>✨ Welcome to MediCare Plus</span>
              </div>
              
              {/* Main Heading */}
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slideInLeft animation-delay-200'>
                Your Health,
                <br />
                <span className="bg-gradient-to-r from-teal-200 to-blue-200 bg-clip-text text-transparent">
                  Our Priority
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-white/90 text-base md:text-lg leading-relaxed animate-slideInLeft animation-delay-400">
                Experience world-class healthcare with our network of expert physicians, 
                advanced medical technology, and compassionate care. Book appointments, 
                access medical records, and get personalized health insights.
              </p>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-slideInLeft animation-delay-600">
                <a 
                  href='#speciality' 
                  className='group inline-flex items-center justify-center gap-2 bg-white text-teal-600 px-6 md:px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105'
                >
                  <span>Get Started</span>
                  <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a 
                  href='#contact' 
                  className='inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300'
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Us
                </a>
              </div>
              
              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20 animate-slideInLeft animation-delay-800">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className="text-2xl mb-1 transform group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Image Section */}
            <div className='relative flex justify-center animate-slideInRight'>
              <div id="hero-image" className="relative w-full max-w-md transform transition-all duration-300 hover:scale-105">
                {/* Image Container with Gradient Border */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-blue-500/20 z-10"></div>
                  <img 
                    className='w-full object-cover transform transition-transform duration-700 hover:scale-110' 
                    src={assets.header_img} 
                    alt="Healthcare professional"
                  />
                </div>
                
                {/* Floating Card 1 */}
                <div className="absolute -top-5 -left-5 bg-white rounded-2xl shadow-xl p-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">Verified Doctors</div>
                      <div className="text-xs text-gray-500">100% Authentic</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Card 2 */}
                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-3 animate-float animation-delay-2000">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">98%</div>
                    <div className="text-xs text-gray-500">Patient Satisfaction</div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating Card 3 */}
                <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white rounded-2xl shadow-xl p-3 animate-pulse-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">24/7 Available</div>
                      <div className="text-xs text-gray-500">Emergency Care</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations - Fixed: Removed 'jsx' attribute */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
          animation-fill-mode: forwards;
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

export default Header;