import React, { useState, useEffect } from 'react';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    specialty: '',
    whatsappNumber: '',
    experience: '',
    location: '',
    available: true,
    fee: '',
    about: ''
  });

  useEffect(() => {
    // Load doctors from localStorage
    const savedDoctors = localStorage.getItem('doctors');
    if (savedDoctors) {
      setDoctors(JSON.parse(savedDoctors));
    } else {
      // Default doctors
      const defaultDoctors = [
        {
          id: 1,
          name: 'Priya Sharma',
          degree: 'MBBS, MD',
          specialty: 'General Physician',
          whatsappNumber: '9876543210',
          experience: '12 years',
          location: 'Mumbai',
          available: true,
          fee: '500',
          about: 'Experienced General Physician with expertise in primary care'
        },
        {
          id: 2,
          name: 'Rajesh Kumar',
          degree: 'MBBS, DM Cardiology',
          specialty: 'Cardiologist',
          whatsappNumber: '9876543211',
          experience: '15 years',
          location: 'Delhi',
          available: true,
          fee: '1000',
          about: 'Senior Cardiologist with specialization in heart diseases'
        }
      ];
      setDoctors(defaultDoctors);
      localStorage.setItem('doctors', JSON.stringify(defaultDoctors));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateWhatsAppNumber = (number) => {
    const cleanNumber = number.replace(/\D/g, '');
    if (cleanNumber.length !== 10) {
      alert('WhatsApp number must be exactly 10 digits');
      return false;
    }
    return true;
  };

  const addDoctor = () => {
    if (!validateWhatsAppNumber(formData.whatsappNumber)) return;
    
    const newDoctor = {
      id: Date.now(),
      ...formData
    };
    const updatedDoctors = [...doctors, newDoctor];
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    setIsAdding(false);
    resetForm();
    alert('Doctor added successfully!');
  };

  const updateDoctor = () => {
    if (!validateWhatsAppNumber(formData.whatsappNumber)) return;
    
    const updatedDoctors = doctors.map(doctor =>
      doctor.id === editingDoctor.id ? { ...doctor, ...formData } : doctor
    );
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    setEditingDoctor(null);
    resetForm();
    alert('Doctor updated successfully!');
  };

  const deleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      const updatedDoctors = doctors.filter(doctor => doctor.id !== id);
      setDoctors(updatedDoctors);
      localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
      alert('Doctor deleted successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      degree: '',
      specialty: '',
      whatsappNumber: '',
      experience: '',
      location: '',
      available: true,
      fee: '',
      about: ''
    });
  };

  const editDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setFormData(doctor);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Doctor Management</h1>
            <p className="text-sm text-gray-600 mt-1">Manage doctors and their WhatsApp consultation details</p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Doctor
          </button>
        </div>

        {/* Add/Edit Doctor Modal */}
        {(isAdding || editingDoctor) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setEditingDoctor(null);
                      resetForm();
                    }}
                    className="p-1 hover:bg-white/20 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                      placeholder="MBBS, MD"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialty *</label>
                    <input
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                      placeholder="Cardiologist, Pediatrician"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number (Active) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">+91</span>
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:border-teal-500"
                        placeholder="9876543210"
                        maxLength="10"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Must be active WhatsApp number</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                      placeholder="12 years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee (₹)</label>
                    <input
                      type="number"
                      name="fee"
                      value={formData.fee}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                      placeholder="500"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-teal-600"
                      />
                      <span className="text-sm text-gray-700">Doctor Available for Consultation</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Doctor</label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    placeholder="Brief description about the doctor..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={editingDoctor ? updateDoctor : addDoctor}
                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setEditingDoctor(null);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Doctors List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">Dr. {doctor.name}</div>
                        <div className="text-sm text-gray-500">{doctor.degree}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{doctor.specialty}</div>
                      <div className="text-xs text-gray-500">{doctor.experience}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.032 2.001c-5.52 0-10 4.48-10 10 0 1.76.46 3.42 1.26 4.87l-1.26 4.63 4.86-1.21c1.42.77 3.03 1.2 4.74 1.2 5.52 0 10-4.48 10-10s-4.48-10-10-10z"/>
                        </svg>
                        <span className="text-sm">+91 {doctor.whatsappNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${doctor.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {doctor.available ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => editDoctor(doctor)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteDoctor(doctor.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-blue-800">Important Notes:</h4>
              <ul className="text-xs text-blue-700 mt-1 space-y-1">
                <li>• Ensure WhatsApp number is active and correct - patients will use this for consultation</li>
                <li>• Doctor must have WhatsApp Business or WhatsApp installed on the provided number</li>
                <li>• Patients will be redirected to WhatsApp with pre-filled consultation details</li>
                <li>• Update availability status when doctor is not taking consultations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorManagement;