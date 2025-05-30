import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

function Home() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-white/80 backdrop-blur-md border-b border-surface-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Layers" className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-gradient">
                ContentCraft
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-surface-600 hover:text-primary transition-colors font-medium">
                Dashboard
              </a>
              <a href="#" className="text-surface-600 hover:text-primary transition-colors font-medium">
                Content
              </a>
              <a href="#" className="text-surface-600 hover:text-primary transition-colors font-medium">
                Media
              </a>
              <a href="#" className="text-surface-600 hover:text-primary transition-colors font-medium">
                Pages
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors"
                aria-label="Toggle dark mode"
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  className="w-5 h-5 text-surface-600" 
                />
              </button>
              
              <div className="flex items-center space-x-2 bg-surface-100 rounded-xl p-1">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-amber-500 rounded-lg flex items-center justify-center">
                  <ApperIcon name="User" className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-surface-700 pr-2">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 sm:px-6 lg:px-8 py-8 md:py-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full mb-6"
            >
              <ApperIcon name="Sparkles" className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Professional Content Management
              </span>
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 mb-4 leading-tight">
              Create, Manage & Publish
              <span className="block text-gradient">Content Like a Pro</span>
            </h1>
            
            <p className="text-lg md:text-xl text-surface-600 max-w-3xl mx-auto leading-relaxed">
              Streamline your content workflow with our intuitive visual editor, 
              powerful media management, and collaborative publishing tools.
            </p>
          </div>

          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
          >
            {[
              { icon: "FileText", label: "Content Items", value: "1,247", color: "from-blue-500 to-cyan-500" },
              { icon: "Image", label: "Media Assets", value: "3,891", color: "from-green-500 to-emerald-500" },
              { icon: "Globe", label: "Published Pages", value: "156", color: "from-purple-500 to-pink-500" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="card p-6 text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-surface-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-surface-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Feature */}
      <MainFeature />

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-surface-900 text-white py-8 md:py-12 mt-16 md:mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Layers" className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">ContentCraft</h3>
            </div>
            <p className="text-surface-400 mb-6 max-w-2xl mx-auto">
              Empowering creators and teams to build exceptional digital experiences 
              with our comprehensive content management platform.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-surface-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Home