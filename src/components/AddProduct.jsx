import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_description: '',
    product_cost: '',
    product_photo: null
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [previewImage, setPreviewImage] = useState(null)

  const navigate = useNavigate()

  // ✅ Check if user is logged in before rendering
  useEffect(() => {
    const token = localStorage.getItem("user")
    if (!token) {
      navigate("/signin") // Redirect if not logged in
    }
  }, [navigate])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
    if (message) setMessage('')
  }

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        return
      }
      setFormData(prev => ({
        ...prev,
        product_photo: file
      }))
      const reader = new FileReader()
      reader.onload = (e) => setPreviewImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  // Form validation
  const validateForm = () => {
    const { product_name, product_description, product_cost, product_photo } = formData
    if (!product_name.trim()) return setError('Product name is required'), false
    if (!product_description.trim()) return setError('Product description is required'), false
    if (!product_cost.trim()) return setError('Product cost is required'), false
    const cost = parseFloat(product_cost)
    if (isNaN(cost) || cost <= 0) return setError('Please enter a valid positive number for cost'), false
    if (!product_photo) return setError('Product photo is required'), false
    return true
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const data = new FormData()
      data.append("product_name", formData.product_name.trim())
      data.append("product_description", formData.product_description.trim())
      data.append("product_cost", formData.product_cost.trim())
      data.append("product_photo", formData.product_photo)

      const token = localStorage.getItem("token") // ✅ Send auth token
      const response = await axios.post(
        "https://muterian.pythonanywhere.com/api/add_product",
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` // ✅ Auth header
          },
          timeout: 30000
        }
      )

      setMessage('Product added successfully!')
      setFormData({ product_name: '', product_description: '', product_cost: '', product_photo: null })
      setPreviewImage(null)

      setTimeout(() => navigate('/'), 1500)

    } catch (error) {
      let errorMessage = 'An error occurred while uploading the product'
      if (error.response) {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.'
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.'
      }
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
      position: 'relative'
    }}>
      <Navbar />
      
      {/* Animated background elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className='container' style={{ position: 'relative', zIndex: 1, paddingTop: '40px', paddingBottom: '40px' }}>
        <div className='row justify-content-center'>
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-2xl" style={{
              background: 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(148, 163, 184, 0.2)'
            }}>
              <div className="card-body p-5">
                {/* Header with gradient text */}
                <div className="text-center mb-4">
                  <h1 className="display-5 fw-bold mb-2" style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Upload New Product
                  </h1>
                  <div style={{
                    height: '4px',
                    width: '80px',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                    borderRadius: '2px',
                    margin: '0 auto'
                  }} />
                </div>
                
                {/* Status Messages */}
                {loading && (
                  <div className="alert border-0 mb-4" role="alert" style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                    borderRadius: '16px',
                    border: '1px solid rgba(59, 130, 246, 0.3)'
                  }}>
                    <div className="d-flex align-items-center">
                      <div className="spinner-border spinner-border-sm me-3" role="status" style={{color: 'white'}}></div>
                      <div>
                        <div className="fw-bold">Uploading Product</div>
                        <small>Please wait while we process your request...</small>
                      </div>
                    </div>
                  </div>
                )}
                
                {message && (
                  <div className="alert border-0 mb-4" role="alert" style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    color: 'white',
                    borderRadius: '16px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <div className="d-flex align-items-center">
                      <svg className="me-3" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <div className="fw-bold">Success!</div>
                        <small>{message}</small>
                      </div>
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="alert border-0 mb-4" role="alert" style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    color: 'white',
                    borderRadius: '16px',
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                  }}>
                    <div className="d-flex align-items-center">
                      <svg className="me-3" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <div className="fw-bold">Error</div>
                        <small>{error}</small>
                      </div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  {/* Product Name */}
                  <div className="mb-4">
                    <label htmlFor="product_name" className="form-label fw-bold mb-2" style={{color: '#e2e8f0', fontSize: '16px'}}>
                      Product Name *
                    </label>
                    <input 
                      type="text" 
                      id="product_name"
                      name="product_name"
                      className="form-control border-0"
                      placeholder="Enter your product name"
                      value={formData.product_name}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      style={{
                        background: 'rgba(51, 65, 85, 0.6)',
                        color: '#e2e8f0',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        fontSize: '16px',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        backdropFilter: 'blur(10px)'
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '2px solid #3b82f6'
                        e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(148, 163, 184, 0.2)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>
                  
                  {/* Product Description */}
                  <div className="mb-4">
                    <label htmlFor="product_description" className="form-label fw-bold mb-2" style={{color: '#e2e8f0', fontSize: '16px'}}>
                      Product Description *
                    </label>
                    <textarea 
                      id="product_description"
                      name="product_description"
                      className="form-control border-0"
                      placeholder="Describe your product in detail..."
                      value={formData.product_description}
                      onChange={handleInputChange}
                      rows="4"
                      required
                      disabled={loading}
                      style={{
                        background: 'rgba(51, 65, 85, 0.6)',
                        color: '#e2e8f0',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        fontSize: '16px',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        backdropFilter: 'blur(10px)',
                        resize: 'vertical'
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '2px solid #8b5cf6'
                        e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(148, 163, 184, 0.2)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>
                  
                  {/* Product Cost */}
                  <div className="mb-4">
                    <label htmlFor="product_cost" className="form-label fw-bold mb-2" style={{color: '#e2e8f0', fontSize: '16px'}}>
                      Product Cost *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text border-0 fw-bold" style={{
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        color: 'white',
                        borderRadius: '12px 0 0 12px',
                        padding: '16px 20px',
                        fontSize: '16px'
                      }}>
                        Ksh
                      </span>
                      <input 
                        type="number" 
                        id="product_cost"
                        name="product_cost"
                        className="form-control border-0"
                        placeholder="0.00"
                        value={formData.product_cost}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        required
                        disabled={loading}
                        style={{
                          background: 'rgba(51, 65, 85, 0.6)',
                          color: '#e2e8f0',
                          borderRadius: '0 12px 12px 0',
                          padding: '16px 20px',
                          fontSize: '16px',
                          border: '1px solid rgba(148, 163, 184, 0.2)',
                          backdropFilter: 'blur(10px)'
                        }}
                        onFocus={(e) => {
                          e.target.style.border = '2px solid #ec4899'
                          e.target.style.boxShadow = '0 0 0 4px rgba(236, 72, 153, 0.1)'
                        }}
                        onBlur={(e) => {
                          e.target.style.border = '1px solid rgba(148, 163, 184, 0.2)'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Product Photo */}
                  <div className="mb-4">
                    <label htmlFor="product_photo" className="form-label fw-bold mb-2" style={{color: '#e2e8f0', fontSize: '16px'}}>
                      Product Photo *
                    </label>
                    <div style={{
                      position: 'relative',
                      background: 'rgba(51, 65, 85, 0.6)',
                      borderRadius: '12px',
                      border: '2px dashed rgba(148, 163, 184, 0.3)',
                      padding: '20px',
                      textAlign: 'center',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <input 
                        type="file" 
                        id="product_photo"
                        name="product_photo"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        disabled={loading}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          cursor: 'pointer'
                        }}
                      />
                      <div style={{color: '#94a3b8'}}>
                        <svg className="mb-2" width="48" height="48" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <div className="fw-bold mb-1">Click to upload or drag and drop</div>
                        <small>JPG, PNG, GIF up to 5MB</small>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Preview */}
                  {previewImage && (
                    <div className="mb-4">
                      <label className="form-label fw-bold mb-3" style={{color: '#e2e8f0', fontSize: '16px'}}>
                        Preview
                      </label>
                      <div className="text-center">
                        <div style={{
                          display: 'inline-block',
                          padding: '4px',
                          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                          borderRadius: '16px'
                        }}>
                          <img 
                            src={previewImage} 
                            alt="Product preview" 
                            className="border-0"
                            style={{ 
                              maxWidth: '250px', 
                              maxHeight: '250px', 
                              borderRadius: '12px',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <div className="d-grid gap-2 mt-5">
                    <button
                      type="submit"
                      className="btn btn-lg border-0 fw-bold position-relative overflow-hidden"
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                        color: 'white',
                        borderRadius: '16px',
                        padding: '18px 32px',
                        fontSize: '18px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.4)'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-3" role="status" style={{color: 'white'}}></span>
                          Uploading Product...
                        </>
                      ) : (
                        <>
                          <svg className="me-3" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          Upload Product
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                {/* Footer text */}
                <div className="text-center mt-4">
                  <small style={{color: '#94a3b8'}}>
                    All fields marked with * are required
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct