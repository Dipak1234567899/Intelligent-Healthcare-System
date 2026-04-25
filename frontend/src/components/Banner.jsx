import React, { useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeTab, setActiveTab] = useState('symptoms')
  const searchRef = useRef(null)

  const diseases = [
    { name: "Diabetes", icon: "🩸", specialty: "Endocrinologist", severity: "Chronic" },
    { name: "Hypertension", icon: "❤️", specialty: "Cardiologist", severity: "Chronic" },
    { name: "Asthma", icon: "🌬️", specialty: "Pulmonologist", severity: "Chronic" },
    { name: "Arthritis", icon: "🦴", specialty: "Rheumatologist", severity: "Chronic" },
    { name: "Migraine", icon: "🤕", specialty: "Neurologist", severity: "Acute" },
    { name: "Depression", icon: "😔", specialty: "Psychiatrist", severity: "Chronic" },
    { name: "Heart Disease", icon: "💔", specialty: "Cardiologist", severity: "Critical" },
    { name: "Thyroid Disorders", icon: "🦋", specialty: "Endocrinologist", severity: "Chronic" },
    { name: "Skin Conditions", icon: "✨", specialty: "Dermatologist", severity: "Varied" }
  ]

  const treatments = [
    { name: "Telemedicine Consultation", duration: "15-30 mins", availability: "24/7", popular: true },
    { name: "Emergency Care", duration: "Immediate", availability: "24/7", popular: true },
    { name: "Home Health Services", duration: "Scheduled", availability: "8 AM - 8 PM", popular: false },
    { name: "Specialist Referral", duration: "24-48 hours", availability: "Business Hours", popular: true }
  ]

  const stats = [
    { value: "500+", label: "Specialists", icon: "👨‍⚕️" },
    { value: "150K+", label: "Patients Helped", icon: "👥" },
    { value: "99.9%", label: "Success Rate", icon: "⭐" },
    { value: "24/7", label: "Support", icon: "🕒" }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = diseases.filter(disease =>
        disease.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchTerm])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      const disease = diseases.find(d => d.name.toLowerCase() === searchTerm.toLowerCase())
      if (disease) {
        setSearchTerm('')
        setShowSuggestions(false)
        navigate(`/doctors?specialty=${encodeURIComponent(disease.specialty)}`)
      } else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchTerm + " symptoms treatment")}`, '_blank')
        setSearchTerm('')
        setShowSuggestions(false)
      }
    }
  }

  const handleSuggestionClick = (disease) => {
    setSearchTerm('')
    setShowSuggestions(false)
    navigate(`/doctors?specialty=${encodeURIComponent(disease.specialty)}`)
  }

  const handleTreatmentClick = (treatment) => {
    if (treatment.name === "Telemedicine Consultation") {
      navigate('/doctors')
    } else if (treatment.name === "Emergency Care") {
      window.location.href = "tel:102"
    } else {
      navigate('/contact')
    }
  }

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full mb-4">
            <span className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-teal-700">AI-Powered Health Assistant</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Find the Right Care,
            <br />
            <span className="text-teal-600">Right Now</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search symptoms, conditions, or treatments. Get instant guidance and connect with top specialists.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-200 transition-all">
              <div className="pl-5">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search symptoms, conditions, or treatments..."
                className="w-full px-4 py-4 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="mx-2 px-6 py-2 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition shadow-sm"
              >
                Search
              </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-20 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                {suggestions.map((disease, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(disease)}
                    className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{disease.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{disease.name}</div>
                        <div className="text-xs text-gray-500">See {disease.specialty}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      disease.severity === 'Critical' ? 'bg-red-100 text-red-700' : 
                      disease.severity === 'Chronic' ? 'bg-amber-100 text-amber-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {disease.severity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </form>

          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <span className="text-xs text-gray-500">Popular:</span>
            {diseases.slice(0, 6).map((disease, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(disease)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition"
              >
                {disease.icon} {disease.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-teal-600">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('symptoms')}
              className={`flex-1 px-6 py-4 text-center transition ${activeTab === 'symptoms' ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="mr-2">🔍</span>
              Symptom Checker
            </button>
            <button
              onClick={() => setActiveTab('treatments')}
              className={`flex-1 px-6 py-4 text-center transition ${activeTab === 'treatments' ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="mr-2">💊</span>
              Treatment Options
            </button>
            <button
              onClick={() => setActiveTab('emergency')}
              className={`flex-1 px-6 py-4 text-center transition ${activeTab === 'emergency' ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="mr-2">🚨</span>
              Emergency Guide
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'symptoms' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Symptoms</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Fever', 'Headache', 'Fatigue', 'Cough', 'Chest Pain', 'Shortness of Breath'].map((symptom, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-600 text-sm py-1">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        {symptom}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-teal-50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🤖</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">AI Symptom Checker</div>
                      <div className="text-xs text-gray-500">Powered by Medical AI</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Our AI-powered tool helps identify possible conditions based on your symptoms. Always consult a doctor for accurate diagnosis.
                  </p>
                  <button className="mt-3 text-teal-600 text-sm font-medium hover:text-teal-700">
                    Start Assessment →
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'treatments' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {treatments.map((treatment, i) => (
                  <div
                    key={i}
                    onClick={() => handleTreatmentClick(treatment)}
                    className="relative cursor-pointer bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition border border-gray-200"
                  >
                    {treatment.popular && (
                      <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="text-2xl mb-2">
                      {treatment.name === "Telemedicine Consultation" && "💻"}
                      {treatment.name === "Emergency Care" && "🚑"}
                      {treatment.name === "Home Health Services" && "🏠"}
                      {treatment.name === "Specialist Referral" && "👨‍⚕️"}
                    </div>
                    <h4 className="font-medium text-gray-800 mb-1">{treatment.name}</h4>
                    <div className="text-xs text-gray-500">
                      <div>⏱️ {treatment.duration}</div>
                      <div>🕒 {treatment.availability}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'emergency' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🚨</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Emergency Services</div>
                      <div className="text-sm text-gray-500">24/7 Immediate Assistance</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                      <div className="text-2xl font-bold text-red-600">102</div>
                      <div className="text-sm text-gray-600">National Ambulance Service</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                      <div className="text-2xl font-bold text-red-600">108</div>
                      <div className="text-sm text-gray-600">Emergency Response Number</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Emergency Protocol</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex gap-2">1️⃣ Stay calm and assess the situation</li>
                    <li className="flex gap-2">2️⃣ Call emergency services immediately</li>
                    <li className="flex gap-2">3️⃣ Provide clear location details</li>
                    <li className="flex gap-2">4️⃣ Follow operator instructions</li>
                    <li className="flex gap-2">5️⃣ Do not move the patient unless necessary</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner