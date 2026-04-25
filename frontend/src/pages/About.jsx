import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const About = () => {
  const [activeCard, setActiveCard] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <p className="text-blue-600 font-medium tracking-wide">About Healthcare_Analytics</p>
          <div className="w-3 h-3 bg-blue-500 rounded-full ml-2"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Redefining Healthcare <span className="text-blue-600">Accessibility</span>
        </h1>
        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
        {/* Image with decorative elements */}
        <div className="relative lg:w-1/2">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-lg z-0"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-50 rounded-lg z-0"></div>
          <img 
            className="relative z-10 w-full rounded-2xl shadow-xl" 
            src={assets.about_image} 
            alt="Healthcare professionals discussing" 
          />
          <div className="absolute -z-10 -bottom-2 -right-2 w-full h-full border-2 border-blue-200 rounded-2xl"></div>
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Healthcare_Analytics, we're transforming healthcare management through innovative technology that puts patients first. 
              Our platform eliminates the traditional barriers to quality care by streamlining appointment scheduling and 
              medical record management.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We combine cutting-edge technology with deep healthcare expertise to create solutions that are both powerful 
              and intuitive. Our team is dedicated to continuously improving the patient experience while maintaining the 
              highest standards of privacy and security.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To create a future where healthcare is truly accessible—where distance, time constraints, and administrative 
              complexities no longer prevent anyone from receiving the care they need and deserve.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Healthcare_Analytics</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're redefining what it means to manage your healthcare with these core principles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Intelligent Efficiency",
              description: "Our AI-powered system learns your preferences to streamline scheduling around your life.",
              icon: "⏱️"
            },
            {
              title: "Seamless Connection",
              description: "Access to verified healthcare professionals who meet your specific needs and preferences.",
              icon: "👥"
            },
            {
              title: "Personalized Care",
              description: "Tailored health insights and reminders that evolve with your healthcare journey.",
              icon: "🎯"
            }
          ].map((value, index) => (
            <div 
              key={index}
              className={`relative p-6 rounded-2xl overflow-hidden transition-all duration-300 ${
                activeCard === index 
                  ? 'bg-blue-600 text-white shadow-xl transform -translate-y-2' 
                  : 'bg-white text-gray-800 border border-gray-100 shadow-md'
              }`}
              onMouseEnter={() => setActiveCard(index)}
            >
              <div className={`text-3xl mb-4 ${activeCard === index ? 'opacity-100' : 'opacity-70'}`}>
                {value.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${activeCard === index ? 'text-white' : 'text-gray-800'}`}>
                {value.title}
              </h3>
              <p className={activeCard === index ? 'text-blue-100' : 'text-gray-600'}>
                {value.description}
              </p>
              
              {/* Animated underline */}
              <div className={`absolute bottom-0 left-0 h-1 bg-blue-400 transition-all duration-500 ${
                activeCard === index ? 'w-full' : 'w-0'
              }`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-semibold mb-8">Our Impact in Numbers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "50K+", label: "Patients Served" },
            { number: "2.5K+", label: "Healthcare Providers" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-3xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;