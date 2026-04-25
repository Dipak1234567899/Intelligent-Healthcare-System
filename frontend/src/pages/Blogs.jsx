// pages/Blogs.jsx
import React, { useState } from 'react';
import { FiSearch, FiCalendar, FiClock, FiEye, FiHeart, FiShare2, FiArrowRight, FiFilter, FiStar, FiUser, FiBookOpen } from 'react-icons/fi';

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReadingLevel, setSelectedReadingLevel] = useState('All');
  const [expandedPostId, setExpandedPostId] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for a Healthy Heart",
      excerpt: "Learn how to keep your heart healthy with these simple daily habits...",
      fullContent: "Maintaining a healthy heart is crucial for overall wellbeing. Start with a balanced diet rich in fruits, vegetables, and whole grains. Regular exercise, even just 30 minutes of walking daily, can significantly improve cardiovascular health. Avoid smoking and limit alcohol consumption. Regular checkups with your cardiologist can help detect issues early. Stress management techniques like meditation and adequate sleep also contribute to heart health.",
      category: "Cardiology",
      date: "March 15, 2023",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      views: 1245,
      likes: 89,
      shares: 45,
      author: "Dr. Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      authorSpecialty: "Cardiologist",
      tags: ["heart health", "prevention", "cardiology"],
      readingLevel: "Beginner",
      popularityScore: 85,
      relatedDoctors: ["Dr. Sarah Johnson", "Dr. Robert Kim", "Dr. Amanda Lee"],
      relatedServices: ["Cardiac Screening", "Echocardiogram", "Stress Test"]
    },
    {
      id: 2,
      title: "Understanding Seasonal Allergies",
      excerpt: "Everything you need to know about managing seasonal allergies...",
      fullContent: "Seasonal allergies affect millions of people each year. Common triggers include pollen from trees, grasses, and weeds. Symptoms often include sneezing, runny nose, itchy eyes, and congestion. Over-the-counter antihistamines can provide relief, but for persistent symptoms, immunotherapy might be recommended. Keeping windows closed during high pollen seasons and using air purifiers can help reduce exposure. Consult an allergist for personalized treatment plans.",
      category: "Allergy & Immunology",
      date: "April 2, 2023", 
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      views: 876,
      likes: 67,
      shares: 32,
      author: "Dr. Michael Chen",
      authorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      authorSpecialty: "Allergist & Immunologist",
      tags: ["allergies", "seasonal", "immunology"],
      readingLevel: "Intermediate",
      popularityScore: 72,
      relatedDoctors: ["Dr. Michael Chen", "Dr. Jessica Wong", "Dr. David Patel"],
      relatedServices: ["Allergy Testing", "Immunotherapy", "Patch Testing"]
    },
    {
      id: 3,
      title: "The Importance of Regular Health Checkups",
      excerpt: "Preventive healthcare can save lives. Here's why regular checkups matter...",
      fullContent: "Preventive healthcare is the cornerstone of long-term wellness. Regular checkups allow doctors to detect health issues before they become serious. Adults should generally have a comprehensive physical exam annually. These visits typically include blood pressure checks, cholesterol screening, and discussions about lifestyle factors. Age-appropriate screenings like mammograms or colonoscopies can detect cancers early when they're most treatable. Establishing a relationship with a primary care physician ensures continuity of care.",
      category: "Preventive Care",
      date: "April 10, 2023",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      views: 1567,
      likes: 124,
      shares: 78,
      author: "Dr. Emily Rodriguez",
      authorImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      authorSpecialty: "Primary Care Physician",
      tags: ["prevention", "checkups", "health screening"],
      readingLevel: "Beginner",
      popularityScore: 92,
      relatedDoctors: ["Dr. Emily Rodriguez", "Dr. James Wilson", "Dr. Maria Gonzalez"],
      relatedServices: ["Annual Physical", "Health Screening", "Vaccinations"]
    },
    {
      id: 4,
      title: "Managing Stress in Daily Life",
      excerpt: "Practical techniques to reduce stress and improve mental wellbeing...",
      fullContent: "Chronic stress can have serious impacts on both physical and mental health. Effective stress management techniques include mindfulness meditation, which has been shown to reduce cortisol levels. Regular physical activity, even moderate exercise, can help regulate stress responses. Maintaining social connections and setting healthy boundaries at work and home are also important. For persistent stress, cognitive-behavioral therapy with a mental health professional can provide tools for long-term management.",
      category: "Mental Health",
      date: "April 18, 2023",
      readTime: "6 min read", 
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      views: 2034,
      likes: 156,
      shares: 91,
      author: "Dr. James Wilson",
      authorImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      authorSpecialty: "Psychiatrist",
      tags: ["stress management", "mental health", "wellbeing"],
      readingLevel: "Intermediate",
      popularityScore: 88,
      relatedDoctors: ["Dr. James Wilson", "Dr. Lisa Zhang", "Dr. Amanda Lee"],
      relatedServices: ["Therapy Sessions", "Stress Management", "Mental Health Evaluation"]
    },
    {
      id: 5,
      title: "AI in Healthcare: Revolutionizing Patient Care",
      excerpt: "How artificial intelligence is transforming diagnostics and treatment...",
      fullContent: "Artificial intelligence is rapidly transforming healthcare delivery. AI algorithms can now analyze medical images with accuracy rivaling human experts, often detecting subtle patterns invisible to the naked eye. Predictive analytics help identify patients at risk for certain conditions before symptoms appear. Natural language processing enables more efficient analysis of medical records. While AI will augment medical professionals' capabilities, the human touch remains essential for compassionate care and complex decision-making.",
      category: "Health Tech",
      date: "May 5, 2023",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      views: 1890,
      likes: 145,
      shares: 67,
      author: "Dr. Lisa Zhang",
      authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      authorSpecialty: "Medical Technologist",
      tags: ["AI", "health tech", "innovation"],
      readingLevel: "Advanced",
      popularityScore: 79,
      relatedDoctors: ["Dr. Lisa Zhang", "Dr. Michael Chen", "Dr. Robert Kim"],
      relatedServices: ["Telemedicine", "Advanced Diagnostics", "Digital Health Consultation"]
    },
    {
      id: 6,
      title: "Nutrition Trends 2023: What's Evidence-Based?",
      excerpt: "Separating fact from fiction in the latest nutrition trends...",
      fullContent: "With countless nutrition trends emerging each year, it's important to distinguish evidence-based recommendations from fads. Intermittent fasting shows promise for weight management and metabolic health, but isn't suitable for everyone. Plant-based diets continue to demonstrate benefits for heart health and longevity. Personalized nutrition, based on genetic testing and gut microbiome analysis, represents the future of dietary recommendations. Regardless of approach, focusing on whole foods and balanced meals remains the foundation of good nutrition.",
      category: "Nutrition",
      date: "May 12, 2023",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      views: 1678,
      likes: 132,
      shares: 58,
      author: "Dr. Maria Gonzalez",
      authorImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      authorSpecialty: "Nutritionist",
      tags: ["nutrition", "diet", "evidence-based"],
      readingLevel: "Intermediate",
      popularityScore: 84,
      relatedDoctors: ["Dr. Maria Gonzalez", "Dr. Emily Rodriguez", "Dr. David Patel"],
      relatedServices: ["Nutrition Counseling", "Diet Planning", "Metabolic Testing"]
    }
  ];

  const categories = ['All', 'Cardiology', 'Allergy & Immunology', 'Preventive Care', 'Mental Health', 'Health Tech', 'Nutrition'];
  const readingLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter and sort blogs
  const filteredBlogs = blogPosts
    .filter(blog => 
      (selectedCategory === 'All' || blog.category === selectedCategory) &&
      (selectedReadingLevel === 'All' || blog.readingLevel === selectedReadingLevel) &&
      (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
       blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'popular') return b.popularityScore - a.popularityScore;
      if (sortBy === 'views') return b.views - a.views;
      return 0;
    });

  // Analytics data
  const totalViews = blogPosts.reduce((sum, blog) => sum + blog.views, 0);
  const totalLikes = blogPosts.reduce((sum, blog) => sum + blog.likes, 0);
  const totalShares = blogPosts.reduce((sum, blog) => sum + blog.shares, 0);
  const avgReadTime = (blogPosts.reduce((sum, blog) => sum + parseInt(blog.readTime), 0) / blogPosts.length).toFixed(1);

  const categoryDistribution = blogPosts.reduce((acc, blog) => {
    acc[blog.category] = (acc[blog.category] || 0) + 1;
    return acc;
  }, {});

  const toggleExpand = (id) => {
    if (expandedPostId === id) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header with Analytics */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">Health Insights & Resources</h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto px-4">
          Expert medical advice to help you make informed health decisions.
        </p>
        
        {/* Analytics Dashboard - UPDATED STYLE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 px-2">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 shadow-sm">
            <div className="text-xl sm:text-2xl font-bold text-blue-700">{totalViews.toLocaleString()}</div>
            <div className="text-xs sm:text-sm text-blue-600 font-medium">Patients Informed</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 shadow-sm">
            <div className="text-xl sm:text-2xl font-bold text-green-700">{totalLikes}</div>
            <div className="text-xs sm:text-sm text-green-600 font-medium">Helpful Ratings</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 shadow-sm">
            <div className="text-xl sm:text-2xl font-bold text-purple-700">{totalShares}</div>
            <div className="text-xs sm:text-sm text-purple-600 font-medium">Articles Shared</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200 shadow-sm">
            <div className="text-xl sm:text-2xl font-bold text-amber-700">{avgReadTime} min</div>
            <div className="text-xs sm:text-sm text-amber-600 font-medium">Avg. Read Time</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-8 border border-gray-100 mx-2">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search symptoms, conditions, treatments..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <div className="relative">
              <FiFilter className="absolute left-3 top-2.5 text-gray-400" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Specialties</option>
                {categories.filter(cat => cat !== 'All').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <select
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={selectedReadingLevel}
              onChange={(e) => setSelectedReadingLevel(e.target.value)}
            >
              {readingLevels.map(level => (
                <option key={level} value={level}>{level} Level</option>
              ))}
            </select>
            
            <select
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="views">Most Views</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 px-2">
        <p className="text-gray-600 text-sm sm:text-base">
          Found {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} 
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          {searchTerm ? ` containing "${searchTerm}"` : ''}
        </p>
      </div>

      {/* Blog Grid - UPDATED CARD STYLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2">
        {filteredBlogs.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col transform hover:-translate-y-1">
            <div className="relative">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                {post.category}
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  post.readingLevel === 'Beginner' ? 'bg-green-100 text-green-700' :
                  post.readingLevel === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {post.readingLevel}
                </span>
              </div>
            </div>
            
            <div className="p-4 sm:p-5 flex-grow">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs sm:text-sm text-gray-500 flex items-center">
                  <FiCalendar className="mr-1.5" /> {post.date}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 flex items-center">
                  <FiClock className="mr-1.5" /> {post.readTime}
                </span>
              </div>
              
              <h2 className="text-lg sm:text-xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">{post.excerpt}</p>
              
              <div className="flex items-center mb-4">
                <img src={post.authorImage} alt={post.author} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3 border-2 border-white shadow-md" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{post.author}</p>
                  <p className="text-xs text-blue-600">{post.authorSpecialty}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              
              {/* Engagement Metrics - UPDATED STYLE */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="flex items-center bg-gray-50 px-2 py-1 rounded-md"><FiEye className="mr-1.5" /> {post.views.toLocaleString()}</span>
                  <span className="flex items-center bg-gray-50 px-2 py-1 rounded-md"><FiHeart className="mr-1.5" /> {post.likes}</span>
                  <span className="flex items-center bg-gray-50 px-2 py-1 rounded-md"><FiShare2 className="mr-1.5" /> {post.shares}</span>
                </div>
                <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-xs font-medium">
                  <FiStar className="inline mr-1" /> {post.popularityScore}
                </span>
              </div>
              
              {/* Expandable content */}
              {expandedPostId === post.id && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">Full Article Content:</h3>
                  <p className="text-sm text-gray-700 mb-4">{post.fullContent}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-xs sm:text-sm mb-2 text-gray-800">Related Specialists:</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.relatedDoctors.map(doctor => (
                        <span key={doctor} className="text-xs bg-white text-blue-600 px-2 py-1 rounded border border-blue-200">
                          {doctor}
                        </span>
                      ))}
                    </div>
                    
                    <h4 className="font-medium text-xs sm:text-sm mb-2 text-gray-800">Related Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.relatedServices.map(service => (
                        <span key={service} className="text-xs bg-white text-purple-600 px-2 py-1 rounded border border-purple-200">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm flex items-center justify-center shadow-md hover:shadow-lg"
                  onClick={() => toggleExpand(post.id)}
                >
                  {expandedPostId === post.id ? 'Show Less' : 'Quick View'} <FiArrowRight className="ml-1.5" />
                </button>
                <button className="bg-white text-blue-600 border border-blue-200 px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-300 text-sm shadow-md hover:shadow-lg">
                  <FiUser className="inline mr-1.5" /> Consult
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">No articles found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Category Distribution Chart - UPDATED STYLE */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-4 sm:p-6 mt-12 border border-gray-200 mx-2">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <FiBookOpen className="mr-2 text-blue-600" /> Medical Specialties Coverage
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">Our comprehensive library covers diverse healthcare specialties to address all your medical needs</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {Object.entries(categoryDistribution).map(([category, count]) => (
            <div key={category} className="text-center p-3 sm:p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow hover:border-blue-200">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">{count}</div>
              <div className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">{category}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - COMPLETELY REDESIGNED */}
      <div className="relative rounded-2xl overflow-hidden mt-12 mx-2">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        
        <div className="relative z-10 p-6 md:p-8 lg:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Get Personalized Medical Advice</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 opacity-90">
              Our articles provide general information. For concerns specific to your health, 
              consult with one of our certified specialists today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button className="bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm sm:text-base">
                <FiUser className="mr-2 text-lg" /> Find a Specialist
              </button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm sm:text-base">
                <FiBookOpen className="mr-2 text-lg" /> Browse Services
              </button>
            </div>
            
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-xs sm:text-sm opacity-80">
              <div className="flex items-center justify-center">
                <FiStar className="text-amber-300 mr-1.5" />
                <span>4.9/5 Patient Satisfaction</span>
              </div>
              <div className="flex items-center justify-center">
                <FiUser className="text-green-300 mr-1.5" />
                <span>200+ Certified Doctors</span>
              </div>
              <div className="flex items-center justify-center">
                <FiClock className="text-blue-300 mr-1.5" />
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 px-2">
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base">
          Load More Articles
        </button>
      </div>
    </div>
  );
};

export default Blogs;   