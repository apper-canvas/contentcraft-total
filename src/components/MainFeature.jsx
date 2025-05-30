import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

function MainFeature() {
  const [activeTab, setActiveTab] = useState('editor')
  const [content, setContent] = useState({
    title: '',
    slug: '',
    body: '',
    status: 'draft',
    category: '',
    tags: [],
    seoTitle: '',
    seoDescription: '',
    featuredImage: null
  })
  const [contentList, setContentList] = useState([
    {
      id: '1',
      title: 'Getting Started with ContentCraft',
      slug: 'getting-started',
      status: 'published',
      publishedAt: '2024-01-15',
      category: 'Tutorial',
      author: 'Admin'
    },
    {
      id: '2',
      title: 'Advanced Content Management',
      slug: 'advanced-content',
      status: 'draft',
      publishedAt: null,
      category: 'Guide',
      author: 'Admin'
    }
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [tagInput, setTagInput] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const fileInputRef = useRef(null)

  const tabs = [
    { id: 'editor', label: 'Content Editor', icon: 'Edit3' },
    { id: 'list', label: 'Content List', icon: 'List' },
    { id: 'media', label: 'Media Library', icon: 'Image' }
  ]

  const handleSaveContent = () => {
    if (!content.title.trim()) {
      toast.error('Please enter a content title')
      return
    }

    if (isEditing) {
      setContentList(prev => prev.map(item => 
        item.id === editingId 
          ? { ...item, ...content, id: editingId }
          : item
      ))
      toast.success('Content updated successfully!')
      setIsEditing(false)
      setEditingId(null)
    } else {
      const newContent = {
        ...content,
        id: Date.now().toString(),
        publishedAt: content.status === 'published' ? new Date().toISOString().split('T')[0] : null,
        author: 'Admin'
      }
      setContentList(prev => [newContent, ...prev])
      toast.success('Content created successfully!')
    }

    // Reset form
    setContent({
      title: '',
      slug: '',
      body: '',
      status: 'draft',
      category: '',
      tags: [],
      seoTitle: '',
      seoDescription: '',
      featuredImage: null
    })
    setTagInput('')
  }

  const handleEditContent = (item) => {
    setContent({
      title: item.title,
      slug: item.slug,
      body: item.body || '',
      status: item.status,
      category: item.category,
      tags: item.tags || [],
      seoTitle: item.seoTitle || '',
      seoDescription: item.seoDescription || '',
      featuredImage: item.featuredImage || null
    })
    setIsEditing(true)
    setEditingId(item.id)
    setActiveTab('editor')
    toast.info('Content loaded for editing')
  }

  const handleDeleteContent = (id) => {
    setContentList(prev => prev.filter(item => item.id !== id))
    toast.success('Content deleted successfully!')
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !content.tags.includes(tagInput.trim())) {
      setContent(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setContent(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Simulate file upload
      const imageUrl = URL.createObjectURL(file)
      setContent(prev => ({ ...prev, featuredImage: imageUrl }))
      toast.success('Image uploaded successfully!')
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  const filteredContent = contentList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleTitleChange = (newTitle) => {
    setContent(prev => ({
      ...prev,
      title: newTitle,
      slug: generateSlug(newTitle)
    }))
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="px-4 sm:px-6 lg:px-8 py-8 md:py-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-surface-600 hover:bg-surface-50 border border-surface-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </motion.button>
            ))}
          </div>
          
          {activeTab === 'editor' && (
            <motion.button
              onClick={handleSaveContent}
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="Save" className="w-4 h-4" />
              <span>{isEditing ? 'Update' : 'Save'} Content</span>
            </motion.button>
          )}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'editor' && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {/* Main Editor */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-surface-900 mb-4 flex items-center space-x-2">
                    <ApperIcon name="Edit3" className="w-5 h-5 text-primary" />
                    <span>Content Editor</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={content.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="input-field"
                        placeholder="Enter content title..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Slug
                      </label>
                      <input
                        type="text"
                        value={content.slug}
                        onChange={(e) => setContent(prev => ({ ...prev, slug: e.target.value }))}
                        className="input-field"
                        placeholder="url-friendly-slug"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Content Body
                      </label>
                      <div className="border-2 border-surface-200 rounded-xl overflow-hidden">
                        {/* Toolbar */}
                        <div className="bg-surface-50 px-4 py-2 border-b border-surface-200 flex flex-wrap gap-2">
                          {['Bold', 'Italic', 'Underline', 'Link', 'Image', 'Quote'].map((tool) => (
                            <button
                              key={tool}
                              className="p-1.5 hover:bg-surface-200 rounded text-surface-600 transition-colors"
                              title={tool}
                            >
                              <ApperIcon 
                                name={tool === 'Bold' ? 'Bold' : tool === 'Italic' ? 'Italic' : 
                                      tool === 'Underline' ? 'Underline' : tool === 'Link' ? 'Link' :
                                      tool === 'Image' ? 'Image' : 'Quote'} 
                                className="w-4 h-4" 
                              />
                            </button>
                          ))}
                        </div>
                        
                        <textarea
                          value={content.body}
                          onChange={(e) => setContent(prev => ({ ...prev, body: e.target.value }))}
                          className="w-full p-4 border-0 focus:outline-none resize-none min-h-96"
                          placeholder="Start writing your content..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish Settings */}
                <div className="card p-6">
                  <h4 className="font-semibold text-surface-900 mb-4 flex items-center space-x-2">
                    <ApperIcon name="Settings" className="w-4 h-4 text-primary" />
                    <span>Publish Settings</span>
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Status
                      </label>
                      <select
                        value={content.status}
                        onChange={(e) => setContent(prev => ({ ...prev, status: e.target.value }))}
                        className="input-field"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="scheduled">Scheduled</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Category
                      </label>
                      <select
                        value={content.category}
                        onChange={(e) => setContent(prev => ({ ...prev, category: e.target.value }))}
                        className="input-field"
                      >
                        <option value="">Select category</option>
                        <option value="Tutorial">Tutorial</option>
                        <option value="Guide">Guide</option>
                        <option value="News">News</option>
                        <option value="Blog">Blog</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="card p-6">
                  <h4 className="font-semibold text-surface-900 mb-4 flex items-center space-x-2">
                    <ApperIcon name="Image" className="w-4 h-4 text-primary" />
                    <span>Featured Image</span>
                  </h4>
                  
                  {content.featuredImage ? (
                    <div className="relative">
                      <img
                        src={content.featuredImage}
                        alt="Featured"
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <button
                        onClick={() => setContent(prev => ({ ...prev, featuredImage: null }))}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <ApperIcon name="X" className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 border-2 border-dashed border-surface-300 rounded-lg flex flex-col items-center justify-center text-surface-500 hover:border-primary hover:text-primary transition-colors"
                    >
                      <ApperIcon name="Upload" className="w-6 h-6 mb-2" />
                      <span className="text-sm">Upload Image</span>
                    </button>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Tags */}
                <div className="card p-6">
                  <h4 className="font-semibold text-surface-900 mb-4 flex items-center space-x-2">
                    <ApperIcon name="Tag" className="w-4 h-4 text-primary" />
                    <span>Tags</span>
                  </h4>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {content.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-lg text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <ApperIcon name="X" className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="input-field flex-1 text-sm"
                      placeholder="Add tag..."
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <ApperIcon name="Plus" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="card p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-surface-900 mb-4 sm:mb-0 flex items-center space-x-2">
                  <ApperIcon name="List" className="w-5 h-5 text-primary" />
                  <span>Content Library</span>
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-64"
                      placeholder="Search content..."
                    />
                  </div>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-200">
                      <th className="text-left py-3 px-4 font-medium text-surface-700">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-surface-700 hidden sm:table-cell">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-surface-700 hidden md:table-cell">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-surface-700 hidden lg:table-cell">Published</th>
                      <th className="text-left py-3 px-4 font-medium text-surface-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContent.map((item) => (
                      <tr key={item.id} className="border-b border-surface-100 hover:bg-surface-50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-surface-900">{item.title}</div>
                            <div className="text-sm text-surface-500">/{item.slug}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface-100 text-surface-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : item.status === 'draft'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-surface-600 hidden lg:table-cell">
                          {item.publishedAt || 'Not published'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditContent(item)}
                              className="p-1 text-surface-600 hover:text-primary transition-colors"
                              title="Edit"
                            >
                              <ApperIcon name="Edit" className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteContent(item.id)}
                              className="p-1 text-surface-600 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <ApperIcon name="Trash2" className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredContent.length === 0 && (
                <div className="text-center py-12">
                  <ApperIcon name="FileText" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                  <p className="text-surface-500 mb-2">No content found</p>
                  <p className="text-sm text-surface-400">
                    {searchQuery || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'Create your first piece of content to get started'
                    }
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'media' && (
            <motion.div
              key="media"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="card p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-surface-900 mb-4 sm:mb-0 flex items-center space-x-2">
                  <ApperIcon name="Image" className="w-5 h-5 text-primary" />
                  <span>Media Library</span>
                </h3>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ApperIcon name="Upload" className="w-4 h-4" />
                  <span>Upload Media</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {/* Sample media items */}
                {[
                  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=300',
                  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300',
                  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300',
                  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300',
                ].map((src, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group cursor-pointer rounded-lg overflow-hidden bg-surface-100 aspect-square"
                  >
                    <img
                      src={src}
                      alt={`Media ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                        <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                          <ApperIcon name="Eye" className="w-4 h-4 text-surface-700" />
                        </button>
                        <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                          <ApperIcon name="Trash2" className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Upload placeholder */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-surface-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <ApperIcon name="Plus" className="w-6 h-6 text-surface-400 mb-2" />
                  <span className="text-xs text-surface-500 text-center">Add Media</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default MainFeature