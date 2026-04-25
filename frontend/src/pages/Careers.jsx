import React, { useState, useEffect } from 'react';
import { 
  FiArrowRight, FiDollarSign, FiMapPin, FiClock, 
  FiBookOpen, FiUsers, FiBarChart2, FiHeart, 
  FiShield, FiTrendingUp, FiCpu, FiDatabase 
} from 'react-icons/fi';

const Careers = () => {
  const [activeDepartment, setActiveDepartment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const departments = ['All', 'Technology', 'Data Science', 'Healthcare', 'Design', 'Marketing'];

  const jobOpenings = [
    {
      id: 1,
      title: "Healthcare Data Analyst",
      department: "Data Science",
      type: "Full-time",
      location: "Remote",
      experience: "3+ years",
      salary: "₹8-12 LPA",
      description: "Analyze patient data patterns and develop insights for improving healthcare outcomes using our Smart Analytic Tool.",
      requirements: ["SQL", "Python", "Data Visualization", "Healthcare Data", "Statistical Analysis"],
      featured: true
    },
    {
      id: 2,
      title: "AI/ML Engineer - Healthcare",
      department: "Technology",
      type: "Full-time",
      location: "Remote",
      experience: "4+ years",
      salary: "₹12-18 LPA",
      description: "Develop machine learning models to predict patient outcomes and optimize hospital operations.",
      requirements: ["Python", "TensorFlow", "PyTorch", "Healthcare AI", "Cloud Infrastructure"],
      featured: true
    },
    {
      id: 3,
      title: "Frontend Developer - Healthcare Dashboard",
      department: "Technology",
      type: "Full-time",
      location: "Remote",
      experience: "2+ years",
      salary: "₹6-10 LPA",
      description: "Build intuitive dashboards for hospitals to visualize patient data and analytics insights.",
      requirements: ["React", "TypeScript", "Data Visualization", "Healthcare UI", "Responsive Design"]
    },
    {
      id: 4,
      title: "Healthcare UI/UX Designer",
      department: "Design",
      type: "Full-time",
      location: "Patna, Bihar",
      experience: "3+ years",
      salary: "₹5-8 LPA",
      description: "Design interfaces for our hospital analytics platform that are both beautiful and functional for medical professionals.",
      requirements: ["Figma", "User Research", "Healthcare UX", "Prototyping", "Accessibility"]
    },
    {
      id: 5,
      title: "Medical Data Engineer",
      department: "Data Science",
      type: "Full-time",
      location: "Remote",
      experience: "3+ years",
      salary: "₹9-14 LPA",
      description: "Build and maintain data pipelines for processing hospital patient data securely and efficiently.",
      requirements: ["Python", "SQL", "ETL", "Healthcare Data Standards", "Data Security"]
    },
    {
      id: 6,
      title: "Healthcare Solutions Architect",
      department: "Technology",
      type: "Full-time",
      location: "Remote",
      experience: "5+ years",
      salary: "₹15-22 LPA",
      description: "Design end-to-end solutions for hospital data integration and analytics implementation.",
      requirements: ["System Design", "Cloud Architecture", "Healthcare IT", "API Design", "Security Compliance"]
    },
    {
      id: 7,
      title: "Clinical Data Specialist",
      department: "Healthcare",
      type: "Full-time",
      location: "Remote",
      experience: "2+ years",
      salary: "₹5-7 LPA",
      description: "Work with medical data ensuring accuracy and compliance with healthcare regulations.",
      requirements: ["Medical Terminology", "Data Quality", "HIPAA Compliance", "Attention to Detail"]
    },
    {
      id: 8,
      title: "DevOps Engineer - Healthcare Cloud",
      department: "Technology",
      type: "Full-time",
      location: "Remote",
      experience: "3+ years",
      salary: "₹10-15 LPA",
      description: "Maintain and scale our healthcare analytics infrastructure with focus on security and reliability.",
      requirements: ["AWS/Azure", "Docker", "Kubernetes", "CI/CD", "Healthcare Security"]
    }
  ];

  const benefits = [
    {
      icon: <FiDollarSign className="text-2xl" />,
      title: "Competitive Salary + ESOPs",
      description: "Industry-leading compensation with stock options for exceptional impact"
    },
    {
      icon: <FiClock className="text-2xl" />,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and unlimited PTO"
    },
    {
      icon: <FiBookOpen className="text-2xl" />,
      title: "Learning Stipend",
      description: "₹1L annual budget for courses, conferences, and certifications"
    },
    {
      icon: <FiUsers className="text-2xl" />,
      title: "World-Class Team",
      description: "Work with experts from healthcare, technology, and data science"
    },
    {
      icon: <FiHeart className="text-2xl" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: <FiTrendingUp className="text-2xl" />,
      title: "Growth Opportunities",
      description: "Rapid career advancement in a fast-growing healthtech startup"
    }
  ];

  const stats = [
    { number: "50K+", label: "Patients Impacted" },
    { number: "100+", label: "Hospitals Served" },
    { number: "10M+", label: "Data Points Analyzed" },
    { number: "96%", label: "Customer Satisfaction" }
  ];

  // Filter jobs based on department and search term
  const filteredJobs = jobOpenings.filter(job => {
    const matchesDepartment = activeDepartment === 'All' || job.department === activeDepartment;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Hero Section with Animation */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Transform Healthcare with Data</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Join us in revolutionizing patient care through intelligent data analytics and AI-powered insights
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[150px]">
                <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                <div className="text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Explore Opportunities <FiArrowRight className="inline ml-2" />
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission: Smarter Healthcare</h2>
            <p className="text-lg text-gray-700 mb-8">
              At Healthcare_Analytics, we're building the future of healthcare analytics. Our Smart Analytic Tool helps hospitals 
              make data-driven decisions that improve patient outcomes, reduce costs, and save lives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center p-6 rounded-xl bg-blue-50">
                <FiBarChart2 className="text-3xl text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Predictive Analytics</h3>
                <p className="text-gray-600">AI-powered predictions for patient readmission risks and treatment outcomes</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-green-50">
                <FiShield className="text-3xl text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Data Security</h3>
                <p className="text-gray-600">HIPAA-compliant data handling with enterprise-grade security protocols</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-purple-50">
                <FiCpu className="text-3xl text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Real-time Insights</h3>
                <p className="text-gray-600">Live dashboards for hospital administrators and medical staff</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Join Healthcare_Analytics?</h2>
          <p className="text-gray-600 text-center mb-12">We invest in our team's growth and well-being</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-blue-600 mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="openings" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Current Openings</h2>
          <p className="text-gray-600 text-center mb-8">Join our mission to transform healthcare through data</p>
          
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeDepartment === dept 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Featured Jobs */}
          {filteredJobs.filter(job => job.featured).length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">Featured Roles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.filter(job => job.featured).map((job) => (
                  <div key={job.id} className="border-2 border-blue-200 rounded-2xl p-6 hover:shadow-xl transition-shadow bg-blue-50">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">Featured</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{job.department}</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{job.type}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <FiMapPin className="mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <FiClock className="mr-2" />
                      <span>Exp: {job.experience}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <FiDollarSign className="mr-2" />
                      <span>{job.salary}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                          <span key={index} className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm border border-blue-200">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                      Apply Now <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Jobs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.filter(job => !job.featured).map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{job.department}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{job.type}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <FiMapPin className="mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <FiClock className="mr-2" />
                  <span>Exp: {job.experience}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <FiDollarSign className="mr-2" />
                  <span>{job.salary}</span>
                </div>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  Apply Now <FiArrowRight className="ml-2" />
                </button>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <FiDatabase className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No positions match your filters</h3>
              <p className="text-gray-500">Try adjusting your search or department filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Culture & Tech Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Technology Stack</h2>
              <p className="text-lg text-gray-700 mb-6">
                We use cutting-edge technologies to process and analyze healthcare data:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center"><FiArrowRight className="text-blue-600 mr-2" /> AI/ML for predictive analytics</li>
                <li className="flex items-center"><FiArrowRight className="text-blue-600 mr-2" /> Cloud-native infrastructure (AWS/Azure)</li>
                <li className="flex items-center"><FiArrowRight className="text-blue-600 mr-2" /> Real-time data processing</li>
                <li className="flex items-center"><FiArrowRight className="text-blue-600 mr-2" /> HIPAA-compliant security protocols</li>
                <li className="flex items-center"><FiArrowRight className="text-blue-600 mr-2" /> Interactive data visualization</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Join Our Mission</h3>
              <p className="text-gray-700 mb-6">
                We're not just building software - we're creating tools that help healthcare professionals 
                make better decisions and improve patient outcomes.
              </p>
              <div className="bg-blue-100 p-4 rounded-xl">
                <p className="text-blue-800 font-medium">
                  "At Healthcare_Analytics, I work on technology that directly impacts patient lives. It's rewarding to see our analytics help hospitals provide better care."
                </p>
                <p className="text-blue-600 mt-2">- Priya, Senior Data Scientist</p>
              </div>
            </div> 
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our team of passionate engineers, data scientists, and healthcare experts working to transform patient care through data analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              View All Positions
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
              careers@Healthcare_Analytics.com
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;