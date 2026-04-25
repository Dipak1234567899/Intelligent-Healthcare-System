import React, { useState, useEffect } from 'react';

const DoctorConsultModal = ({ isOpen, onClose, userData }) => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultType, setConsultType] = useState(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Doctors Database (Compact)
  const doctorsList = [
    { id: 1, name: 'Priya Sharma', degree: 'MBBS, MD', specialty: 'General Physician', specialtyCode: 'general', whatsappNumber: '9876543210', experience: '12 yrs', location: 'Mumbai', rating: 4.8, fee: 499, available: true, image: 'https://ui-avatars.com/api/?background=7ACBC3&color=fff&name=Priya+Sharma' },
    { id: 2, name: 'Rajesh Kumar', degree: 'MBBS, DM', specialty: 'Cardiologist', specialtyCode: 'cardiology', whatsappNumber: '9876543211', experience: '15 yrs', location: 'Delhi', rating: 4.9, fee: 799, available: true, image: 'https://ui-avatars.com/api/?background=7ACBC3&color=fff&name=Rajesh+Kumar' },
    { id: 3, name: 'Anjali Mehta', degree: 'MBBS, MD', specialty: 'Pediatrician', specialtyCode: 'pediatrics', whatsappNumber: '9876543212', experience: '10 yrs', location: 'Bangalore', rating: 4.7, fee: 599, available: true, image: 'https://ui-avatars.com/api/?background=7ACBC3&color=fff&name=Anjali+Mehta' },
    { id: 4, name: 'Vikram Singh', degree: 'MBBS, MD', specialty: 'Dermatologist', specialtyCode: 'dermatology', whatsappNumber: '9876543213', experience: '8 yrs', location: 'Chennai', rating: 4.6, fee: 649, available: true, image: 'https://ui-avatars.com/api/?background=7ACBC3&color=fff&name=Vikram+Singh' },
    { id: 5, name: 'Neha Gupta', degree: 'MBBS, MS', specialty: 'Gynecologist', specialtyCode: 'gynecology', whatsappNumber: '9876543214', experience: '11 yrs', location: 'Pune', rating: 4.9, fee: 699, available: true, image: 'https://ui-avatars.com/api/?background=7ACBC3&color=fff&name=Neha+Gupta' },
    { id: 6, name: 'Amit Patel', degree: 'MBBS, MS', specialty: 'Orthopedic', specialtyCode: 'orthopedic', whatsappNumber: '9876543215', experience: '14 yrs', location: 'Ahmedabad', rating: 4.8, fee: 749, available: true, image: 'https://ui-avatars.com/api/?background=7ACBC3&color=fff&name=Amit+Patel' }
  ];

  const specialties = [
    { value: 'all', label: 'All', icon: '👨‍⚕️' },
    { value: 'general', label: 'General', icon: '🩺' },
    { value: 'cardiology', label: 'Cardio', icon: '❤️' },
    { value: 'pediatrics', label: 'Child', icon: '👶' },
    { value: 'dermatology', label: 'Skin', icon: '🧴' },
    { value: 'gynecology', label: 'Women', icon: '👩' },
    { value: 'orthopedic', label: 'Bone', icon: '🦴' }
  ];

  const commonSymptoms = ['Fever', 'Cough', 'Cold', 'Headache', 'Body Pain', 'Fatigue', 'Nausea', 'Sore Throat'];

  useEffect(() => {
    if (userData) {
      setUserName(userData.name || '');
      setUserPhone(userData.phone || userData.mobile || '');
    }
  }, [userData]);

  const filteredDoctors = doctorsList.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialtyCode === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
      setSymptoms(symptoms.replace(symptom, '').replace(/,,\s*/g, ', ').replace(/^,\s*/, ''));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      const newSymptoms = symptoms ? `${symptoms}, ${symptom}` : symptom;
      setSymptoms(newSymptoms);
    }
  };

  const getWhatsAppLink = () => {
    if (!selectedDoctor) return '';
    const userPhoneClean = userPhone.replace(/\D/g, '');
    const doctorPhoneClean = selectedDoctor.whatsappNumber.replace(/\D/g, '');
    const message = `🏥 *Consultation Request*\n👤 ${userName}\n📞 +91${userPhoneClean}\n👨‍⚕️ Dr. ${selectedDoctor.name} (${selectedDoctor.specialty})\n🤒 ${symptoms || 'Not specified'}\n⏰ ${preferredTime || 'ASAP'}\n🔍 ${consultType?.toUpperCase()}\n💚 Please reply to start.`;
    return `https://wa.me/91${doctorPhoneClean}?text=${encodeURIComponent(message)}`;
  };

  const startConsultation = () => {
    setIsConnecting(true);
    const whatsappLink = getWhatsAppLink();
    const consultationRecord = { id: Date.now(), doctorId: selectedDoctor.id, doctorName: selectedDoctor.name, patientName: userName, patientPhone: userPhone, consultType, symptoms, preferredTime, dateTime: new Date().toISOString() };
    const existingRecords = JSON.parse(localStorage.getItem('consultations') || '[]');
    existingRecords.push(consultationRecord);
    localStorage.setItem('consultations', JSON.stringify(existingRecords));
    window.open(whatsappLink, '_blank');
    setTimeout(() => { setIsConnecting(false); onClose(); }, 1500);
  };

  const handleNext = () => { if (step === 1 && selectedDoctor) setStep(2); else if (step === 2) setStep(3); };
  const handleBack = () => { if (step > 1) setStep(step - 1); };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-scaleIn">
        
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-[#7ACBC3] to-[#5BA89F] px-4 sm:px-5 py-3 sm:py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center text-sm sm:text-base">
                {step === 1 ? '👨‍⚕️' : step === 2 ? '📋' : '💬'}
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold">Doctor Consultation</h2>
                <p className="text-xs text-white/90">
                  {step === 1 ? 'Select doctor' : step === 2 ? 'Health details' : 'Connect'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">✕</button>
          </div>
          
          {/* Compact Progress */}
          <div className="flex justify-between mt-3 sm:mt-4">
            {[{step:1,label:'Doctor'},{step:2,label:'Details'},{step:3,label:'Connect'}].map((s) => (
              <div key={s.step} className="flex-1 text-center">
                <div className={`w-6 h-6 sm:w-7 sm:h-7 mx-auto rounded-full flex items-center justify-center text-xs transition-all ${step >= s.step ? 'bg-white text-[#7ACBC3]' : 'bg-white/30 text-white/70'}`}>
                  {step > s.step ? '✓' : s.step}
                </div>
                <p className={`text-[10px] sm:text-xs mt-1 ${step >= s.step ? 'text-white' : 'text-white/70'}`}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Content - Compact */}
        <div className="overflow-y-auto p-4 sm:p-5" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          
          {/* STEP 1: Doctor Selection */}
          {step === 1 && (
            <div className="space-y-3">
              {/* Search Bar */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input type="text" placeholder="Search doctor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#7ACBC3]" />
                </div>
                <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg bg-white">
                  {specialties.map(spec => <option key={spec.value} value={spec.value}>{spec.icon} {spec.label}</option>)}
                </select>
              </div>

              {/* Doctors Grid - Compact Cards */}
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {filteredDoctors.map((doctor) => (
                  <button key={doctor.id} onClick={() => setSelectedDoctor(doctor)} className={`w-full text-left p-2.5 rounded-xl border transition-all ${selectedDoctor?.id === doctor.id ? 'border-[#7ACBC3] bg-[#7ACBC3]/5 shadow-sm' : 'border-gray-200 hover:border-[#7ACBC3]/50'}`}>
                    <div className="flex gap-2.5">
                      <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm text-gray-800 truncate">Dr. {doctor.name}</h4>
                          <div className="flex items-center gap-0.5 text-xs">
                            <span className="text-yellow-500">★</span>
                            <span>{doctor.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-[#7ACBC3] font-medium">{doctor.specialty}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{doctor.experience}</span>
                          <span>•</span>
                          <span>₹{doctor.fee}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
                {filteredDoctors.length === 0 && <div className="text-center py-8 text-gray-500 text-sm">No doctors found</div>}
              </div>
            </div>
          )}

          {/* STEP 2: Health Details - Compact */}
          {step === 2 && selectedDoctor && (
            <div className="space-y-3">
              {/* Selected Doctor Badge */}
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <img src={selectedDoctor.image} alt="" className="w-8 h-8 rounded-lg" />
                  <div>
                    <p className="font-semibold text-sm">Dr. {selectedDoctor.name}</p>
                    <p className="text-xs text-gray-500">{selectedDoctor.specialty}</p>
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="text-xs text-[#7ACBC3]">Change</button>
              </div>

              <input type="text" placeholder="Your name" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#7ACBC3]" />
              
              <div className="flex">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-sm">+91</span>
                <input type="tel" placeholder="9876543210" value={userPhone} onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-r-lg focus:outline-none focus:border-[#7ACBC3]" />
              </div>

              {/* Symptoms Tags */}
              <div className="flex flex-wrap gap-1.5">
                {commonSymptoms.map((symptom) => (
                  <button key={symptom} onClick={() => toggleSymptom(symptom)} className={`px-2 py-1 rounded-full text-xs transition-all ${selectedSymptoms.includes(symptom) ? 'bg-[#7ACBC3] text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {symptom}
                  </button>
                ))}
              </div>

              <textarea rows="2" placeholder="Describe symptoms..." value={symptoms} onChange={(e) => setSymptoms(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#7ACBC3]" />

              <div className="grid grid-cols-2 gap-2">
                {['ASAP', 'Morning', 'Afternoon', 'Evening'].map((time) => (
                  <button key={time} onClick={() => setPreferredTime(time)} className={`py-1.5 text-xs rounded-lg transition-all ${preferredTime === time ? 'bg-[#7ACBC3] text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Consultation Type - Compact */}
          {step === 3 && selectedDoctor && (
            <div className="space-y-3">
              <div className="text-center mb-2">
                <span className="text-xs bg-[#7ACBC3]/10 text-[#7ACBC3] px-3 py-1 rounded-full">Choose connection type</span>
              </div>

              <div className="space-y-2">
                {[
                  { type: 'video', icon: '📹', color: 'green', label: 'Video Call', desc: 'Face-to-face', time: '30 mins' },
                  { type: 'audio', icon: '📞', color: 'blue', label: 'Audio Call', desc: 'Quick voice', time: '20 mins' },
                  { type: 'chat', icon: '💬', color: 'purple', label: 'Text Chat', desc: 'Messaging', time: '24hrs' }
                ].map((option) => (
                  <button key={option.type} onClick={() => setConsultType(option.type)} className={`w-full p-3 rounded-xl border transition-all ${consultType === option.type ? 'border-[#7ACBC3] bg-[#7ACBC3]/5' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${option.color}-100 rounded-xl flex items-center justify-center text-xl`}>{option.icon}</div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-sm">{option.label}</p>
                        <p className="text-xs text-gray-500">{option.desc} • {option.time}</p>
                      </div>
                      {consultType === option.type && <div className="w-5 h-5 bg-[#7ACBC3] rounded-full flex items-center justify-center text-white text-xs">✓</div>}
                    </div>
                  </button>
                ))}
              </div>

              {consultType && (
                <div className="p-3 bg-gray-50 rounded-xl text-xs">
                  <p className="font-medium text-gray-700">📋 Summary</p>
                  <div className="mt-1 space-y-0.5 text-gray-600">
                    <p>Dr. {selectedDoctor.name} • {selectedDoctor.specialty}</p>
                    <p>{consultType === 'video' ? '📹 Video Call' : consultType === 'audio' ? '📞 Audio Call' : '💬 Text Chat'} • ₹{selectedDoctor.fee}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Buttons - Compact */}
        <div className="border-t border-gray-100 p-3 sm:p-4 bg-gray-50 flex gap-2">
          {step > 1 && <button onClick={handleBack} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100">← Back</button>}
          
          {step < 3 ? (
            <button onClick={handleNext} disabled={(step === 1 && !selectedDoctor) || (step === 2 && (!userName || !userPhone))} className="flex-1 py-2 text-sm bg-gradient-to-r from-[#7ACBC3] to-[#5BA89F] text-white rounded-lg font-medium disabled:opacity-50">
              {step === 1 ? 'Continue →' : 'Next →'}
            </button>
          ) : (
            <button onClick={startConsultation} disabled={!consultType || isConnecting} className="flex-1 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50">
              {isConnecting ? 'Connecting...' : '🚀 Start'}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default DoctorConsultModal;