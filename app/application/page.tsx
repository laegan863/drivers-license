'use client';

import { useState, useRef, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { redirect } from 'next/navigation';

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    // Applicant Information
    email: '',
    
    // Personal Information
    firstName: '',
    lastName: '',
    residenceAddress: '',
    cityAndState: '',
    zipCode: '',
    country: '',
    dateOfBirth: '',
    countryOfBirth: '',
    gender: '',
    eyeColor: '',
    height: '',
    
    // Driving Information
    vehicleTypes: [] as string[],
    nationalDriverLicense: '',
    nationalDriverLicenseCountry: '',
    idpPeriod: '',
    
    // Shipping Information
    shippingAddress: '',
    apartmentNumber: '',
    shippingCityState: '',
    shippingZipCode: '',
    shippingCountry: '',
    
    // Contact & Agreement
    phone: '',
    suggestion: '',
    acceptConditions: false,
    receiveInformation: false,
    signatureType: 'draw' as 'draw' | 'upload',
    
    // Files
    photoImage: null as File | null,
    licenseImages: null as File | null,
    signatureImage: null as File | null
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Initialize canvas with white background
  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Fill canvas with white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Initialize canvas on mount and when switching to draw mode
  useEffect(() => {
    console.log("API URL:" + `${process.env.NEXT_PUBLIC_APP_URL}`)
    if (formData.signatureType === 'draw') {
      // Small delay to ensure canvas is rendered
      setTimeout(() => {
        initializeCanvas();
      }, 100);
    }
  }, [formData.signatureType]);

  const vehicleOptions = [
    { value: 'A', label: 'A - Motorcycle' },
    { value: 'B', label: 'B - Passenger Car' },
    { value: 'C', label: 'C - Truck > 7700 lbs' },
    { value: 'D', label: 'D - Vehicle > 8 seats' },
    { value: 'E', label: 'E - Combo B, C or D' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleVehicleTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.includes(value)
        ? prev.vehicleTypes.filter(v => v !== value)
        : [...prev.vehicleTypes, value]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  // Get coordinates for both mouse and touch events
  const getEventCoordinates = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    
    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0] || e.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  // Canvas signature functions
  const startDrawing = (e: any) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    const coords = getEventCoordinates(e);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  };

  const draw = (e: any) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const coords = getEventCoordinates(e);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e?: any) => {
    if (e) e.preventDefault();
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.closePath();
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Clear and refill with white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    setUploadProgress(10);
    
    // Helper function to convert base64 to Blob
    const base64ToBlob = (base64: string): Blob => {
      const parts = base64.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      
      return new Blob([uInt8Array], { type: contentType });
    };
    
    setUploadProgress(20);
    
    // Prepare FormData for file upload
    const formDataToSend = new FormData();
    
    // Add all text fields
    formDataToSend.append('email', formData.email);
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('residenceAddress', formData.residenceAddress);
    formDataToSend.append('cityAndState', formData.cityAndState);
    formDataToSend.append('zipCode', formData.zipCode);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('dateOfBirth', formData.dateOfBirth);
    formDataToSend.append('countryOfBirth', formData.countryOfBirth);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('eyeColor', formData.eyeColor);
    formDataToSend.append('height', formData.height);
    formDataToSend.append('vehicleTypes', JSON.stringify(formData.vehicleTypes));
    formDataToSend.append('nationalDriverLicense', formData.nationalDriverLicense);
    formDataToSend.append('nationalDriverLicenseCountry', formData.nationalDriverLicenseCountry);
    formDataToSend.append('idpPeriod', formData.idpPeriod);
    formDataToSend.append('shippingAddress', formData.shippingAddress);
    formDataToSend.append('apartmentNumber', formData.apartmentNumber);
    formDataToSend.append('shippingCityState', formData.shippingCityState);
    formDataToSend.append('shippingZipCode', formData.shippingZipCode);
    formDataToSend.append('shippingCountry', formData.shippingCountry);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('suggestion', formData.suggestion);
    formDataToSend.append('acceptConditions', formData.acceptConditions.toString());
    formDataToSend.append('receiveInformation', formData.receiveInformation.toString());
    formDataToSend.append('signatureType', formData.signatureType);
    
    // Handle signature
    if (formData.signatureType === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          let hasDrawing = false;
          
          // Check for any non-white pixels
          for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            
            if (r !== 255 || g !== 255 || b !== 255) {
              hasDrawing = true;
              break;
            }
          }
          
          if (hasDrawing) {
            // Convert canvas to blob and add to FormData
            const signatureBase64 = canvas.toDataURL('image/png');
            const signatureBlob = base64ToBlob(signatureBase64);
            formDataToSend.append('signature', signatureBlob, 'signature.png');
          } else {
            setIsSubmitting(false);
            setUploadProgress(0);
            alert('Please draw your signature or switch to upload mode to provide a signature image.');
            return;
          }
        }
      }
    } else if (formData.signatureImage) {
      // Add uploaded signature image
      formDataToSend.append('signature', formData.signatureImage);
    }
    
    setUploadProgress(40);
    
    // Add photo image if exists
    if (formData.photoImage) {
      formDataToSend.append('photo', formData.photoImage);
    }
    
    // Add license image if exists
    if (formData.licenseImages) {
      formDataToSend.append('license', formData.licenseImages);
    }
    
    setUploadProgress(60);
    
    try {
      // Send to Laravel API
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/applications`, {
        method: 'POST',
        body: formDataToSend,
      });
      
      setUploadProgress(80);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Success:', result);
      
      setUploadProgress(100);
      
      // Store application ID in localStorage for checkout page
      if (result.data?.id) {
        localStorage.setItem('applicationId', result.data.id.toString());
        localStorage.setItem('applicationData', JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          idpPeriod: formData.idpPeriod,
          ...result.data
        }));
      }
      
      // Redirect to checkout page after short delay
      setTimeout(() => {
        // window.location.href = '/checkout';
        redirect('/checkout');
      }, 500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setUploadProgress(0);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              {/* Animated Spinner */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <svg className="w-24 h-24 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">{uploadProgress}%</span>
                </div>
              </div>
              
              {/* Progress Text */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Submitting Your Application
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please wait while we process your information...
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              
              {/* Status Messages */}
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {uploadProgress < 30 && '📝 Preparing your application...'}
                {uploadProgress >= 30 && uploadProgress < 60 && '✍️ Processing signature...'}
                {uploadProgress >= 60 && uploadProgress < 90 && '📤 Uploading documents...'}
                {uploadProgress >= 90 && '✅ Finalizing submission...'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
              Driver's License Application
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete the form below to apply for your international driver's license. All fields marked with <span className="text-red-500">*</span> are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Applicant Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Applicant Information
                </h2>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your.email@example.com"
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                          focusedField === 'email' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Used for receiving tracking number, payment and application confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Personal Information
                </h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John"
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                          focusedField === 'firstName' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Doe"
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                          focusedField === 'lastName' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="relative md:col-span-2">
                    <label htmlFor="residenceAddress" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Residence Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="residenceAddress"
                        name="residenceAddress"
                        required
                        value={formData.residenceAddress}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('residenceAddress')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="123 Main Street"
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                          focusedField === 'residenceAddress' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="cityAndState" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      City and State <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="cityAndState"
                        name="cityAndState"
                        required
                        value={formData.cityAndState}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('cityAndState')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="New York, NY"
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                          focusedField === 'cityAndState' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Zip Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('zipCode')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="10001"
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                          focusedField === 'zipCode' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="country" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <select
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('country')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 appearance-none cursor-pointer ${
                          focusedField === 'country' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <option value="">Select a country</option>
                        <option value="US">🇺🇸 United States</option>
                        <option value="CA">🇨🇦 Canada</option>
                        <option value="UK">🇬🇧 United Kingdom</option>
                        <option value="AU">🇦🇺 Australia</option>
                        <option value="other">🌍 Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('dateOfBirth')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 ${
                          focusedField === 'dateOfBirth' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="countryOfBirth" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Country of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <select
                        id="countryOfBirth"
                        name="countryOfBirth"
                        required
                        value={formData.countryOfBirth}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('countryOfBirth')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 appearance-none cursor-pointer ${
                          focusedField === 'countryOfBirth' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <option value="">Select country of birth</option>
                        <option value="US">🇺🇸 United States</option>
                        <option value="CA">🇨🇦 Canada</option>
                        <option value="UK">🇬🇧 United Kingdom</option>
                        <option value="AU">🇦🇺 Australia</option>
                        <option value="other">🌍 Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <select
                        id="gender"
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('gender')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 appearance-none cursor-pointer ${
                          focusedField === 'gender' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="eyeColor" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Eye Color <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <select
                        id="eyeColor"
                        name="eyeColor"
                        required
                        value={formData.eyeColor}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('eyeColor')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 appearance-none cursor-pointer ${
                          focusedField === 'eyeColor' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <option value="">Eye color</option>
                        <option value="brown">🟤 Brown</option>
                        <option value="blue">🔵 Blue</option>
                        <option value="green">🟢 Green</option>
                        <option value="hazel">🟡 Hazel</option>
                        <option value="gray">⚪ Gray</option>
                        <option value="other">👁️ Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="height" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Height <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="height"
                        name="height"
                        required
                        value={formData.height}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('height')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="178 cm"
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                          focusedField === 'height' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Example: 178 cm or 5'10"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Driving Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  Driving Information
                </h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Vehicle Types <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      {vehicleOptions.map(option => (
                        <label key={option.value} className="flex items-center p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 cursor-pointer transition-all duration-200 group has-[:checked]:border-blue-500 has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-50 has-[:checked]:to-indigo-50 dark:has-[:checked]:from-blue-900/30 dark:has-[:checked]:to-indigo-900/30">
                          <input
                            type="checkbox"
                            checked={formData.vehicleTypes.includes(option.value)}
                            onChange={() => handleVehicleTypeChange(option.value)}
                            className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <label htmlFor="nationalDriverLicense" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Driver License Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="nationalDriverLicense"
                          name="nationalDriverLicense"
                          required
                          value={formData.nationalDriverLicense}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('nationalDriverLicense')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="ABC123456789"
                          className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                            focusedField === 'nationalDriverLicense' 
                              ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label htmlFor="nationalDriverLicenseCountry" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        License Issuing Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <select
                          id="nationalDriverLicenseCountry"
                          name="nationalDriverLicenseCountry"
                          required
                          value={formData.nationalDriverLicenseCountry}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('nationalDriverLicenseCountry')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 appearance-none cursor-pointer ${
                            focusedField === 'nationalDriverLicenseCountry' 
                              ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        >
                          <option value="">Select country</option>
                          <option value="US">🇺🇸 United States</option>
                          <option value="CA">🇨🇦 Canada</option>
                          <option value="UK">🇬🇧 United Kingdom</option>
                          <option value="AU">🇦🇺 Australia</option>
                          <option value="other">🌍 Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <label htmlFor="idpPeriod" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        IDP Validity Period <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <select
                          id="idpPeriod"
                          name="idpPeriod"
                          required
                          value={formData.idpPeriod}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('idpPeriod')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 appearance-none cursor-pointer ${
                            focusedField === 'idpPeriod' 
                              ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        >
                          <option value="">Select period</option>
                          <option value="1year">📅 1 Year - $49</option>
                          <option value="2years">📅 2 Years - $89</option>
                          <option value="3years">📅 3 Years - $119 (Most Popular)</option>
                          <option value="5years">📅 5 Years - $179</option>
                          <option value="10years">📅 10 Years - $299</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  Shipping Information
                </h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 relative">
                    <label htmlFor="shippingAddress" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Shipping Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="shippingAddress"
                        name="shippingAddress"
                        required
                        value={formData.shippingAddress}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('shippingAddress')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="456 Delivery Street"
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                          focusedField === 'shippingAddress' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="apartmentNumber" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Apartment / Unit Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="apartmentNumber"
                        name="apartmentNumber"
                        value={formData.apartmentNumber}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('apartmentNumber')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Apt 4B"
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                          focusedField === 'apartmentNumber' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="shippingCityState" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      City & State <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="shippingCityState"
                        name="shippingCityState"
                        required
                        value={formData.shippingCityState}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('shippingCityState')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Los Angeles, CA"
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                          focusedField === 'shippingCityState' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="shippingZipCode" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Zip Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="shippingZipCode"
                        name="shippingZipCode"
                        required
                        value={formData.shippingZipCode}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('shippingZipCode')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="90001"
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                          focusedField === 'shippingZipCode' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="shippingCountry" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <select
                        id="shippingCountry"
                        name="shippingCountry"
                        required
                        value={formData.shippingCountry}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('shippingCountry')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 appearance-none cursor-pointer ${
                          focusedField === 'shippingCountry' 
                            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <option value="">Select country</option>
                        <option value="US">🇺🇸 United States</option>
                        <option value="CA">🇨🇦 Canada</option>
                        <option value="UK">🇬🇧 United Kingdom</option>
                        <option value="AU">🇦🇺 Australia</option>
                        <option value="other">🌍 Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Agreement */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 px-6 py-5">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Contact & Agreement
                </h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="relative">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="+1 (555) 123-4567"
                          className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 ${
                            focusedField === 'phone' 
                              ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label htmlFor="suggestion" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Additional Comments (Optional)
                      </label>
                      <div className="relative">
                        <textarea
                          id="suggestion"
                          name="suggestion"
                          rows={4}
                          value={formData.suggestion}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('suggestion')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Any special requests or additional information..."
                          className={`w-full px-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 resize-none ${
                            focusedField === 'suggestion' 
                              ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-start p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 cursor-pointer transition-all duration-200 group has-[:checked]:border-green-500 has-[:checked]:bg-gradient-to-r has-[:checked]:from-green-50 has-[:checked]:to-emerald-50 dark:has-[:checked]:from-green-900/30 dark:has-[:checked]:to-emerald-900/30">
                        <input
                          type="checkbox"
                          name="acceptConditions"
                          checked={formData.acceptConditions}
                          onChange={handleInputChange}
                          required
                          className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-0.5 transition-all"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                          I accept the <a href="#" className="text-blue-600 hover:text-blue-700 underline">terms and conditions</a> <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <label className="flex items-start p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 cursor-pointer transition-all duration-200 group has-[:checked]:border-blue-500 has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-50 has-[:checked]:to-indigo-50 dark:has-[:checked]:from-blue-900/30 dark:has-[:checked]:to-indigo-900/30">
                        <input
                          type="checkbox"
                          name="receiveInformation"
                          checked={formData.receiveInformation}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-0.5 transition-all"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                          I agree to receive updates and promotional information
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        📸 Photo Image <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'photoImage')}
                          required
                          className="w-full px-4 py-3.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all file:mr-4 file:py-2.5 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-indigo-600 file:text-white hover:file:from-blue-600 hover:file:to-indigo-700 file:transition-all file:shadow-sm cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Upload a passport-style photo (JPG, PNG, max 5MB)
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        🪪 License Copy <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'licenseImages')}
                          required
                          className="w-full px-4 py-3.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all file:mr-4 file:py-2.5 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-500 file:to-purple-600 file:text-white hover:file:from-indigo-600 hover:file:to-purple-700 file:transition-all file:shadow-sm cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Upload a clear photo of your driver's license
                        </p>
                      </div>
                    </div>
                    
                    {/* Signature Section */}
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>
                      <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                          <label className="flex items-center text-base font-bold text-gray-800 dark:text-white">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </div>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                              Digital Signature
                            </span>
                            <span className="text-red-500 ml-2">*</span>
                          </label>
                        </div>

                        {/* Toggle Buttons */}
                        <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-5">
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, signatureType: 'draw' }))}
                            className={`relative py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                              formData.signatureType === 'draw'
                                ? 'bg-white dark:bg-gray-700 text-purple-600 shadow-lg scale-105'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                            }`}
                          >
                            <span className="flex items-center justify-center">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              Draw Signature
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, signatureType: 'upload' }))}
                            className={`relative py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                              formData.signatureType === 'upload'
                                ? 'bg-white dark:bg-gray-700 text-pink-600 shadow-lg scale-105'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                            }`}
                          >
                            <span className="flex items-center justify-center">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              Upload Image
                            </span>
                          </button>
                        </div>

                        {formData.signatureType === 'draw' ? (
                          <div className="space-y-4">
                            {/* Canvas Container */}
                            <div className="relative">
                              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25"></div>
                              <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-inner">
                                <div className="relative overflow-hidden rounded-xl border-3 border-dashed border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                                  <canvas
                                    ref={canvasRef}
                                    width={500}
                                    height={200}
                                    onMouseDown={startDrawing}
                                    onMouseMove={draw}
                                    onMouseUp={stopDrawing}
                                    onMouseLeave={stopDrawing}
                                    onTouchStart={startDrawing}
                                    onTouchMove={draw}
                                    onTouchEnd={stopDrawing}
                                    onTouchCancel={stopDrawing}
                                    className="w-full cursor-crosshair"
                                    style={{ touchAction: 'none' }}
                                  />
                                  {/* Watermark */}
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                                    <svg className="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="mt-3 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                                  <svg className="w-4 h-4 mr-1.5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Sign above using your mouse or touch screen
                                </div>
                              </div>
                            </div>

                            {/* Clear Button */}
                            <button
                              type="button"
                              onClick={clearSignature}
                              className="w-full bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 text-red-600 dark:text-red-400 font-semibold py-3.5 px-6 rounded-xl border-2 border-red-200 dark:border-red-700 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 transition-all duration-200 flex items-center justify-center group shadow-sm"
                            >
                              <svg className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Clear & Redraw
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'signatureImage')}
                                className="w-full px-4 py-4 border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-purple-400 dark:hover:border-purple-600 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-purple-500 file:to-pink-600 file:text-white hover:file:from-purple-600 hover:file:to-pink-700 file:transition-all file:shadow-lg hover:file:shadow-xl file:cursor-pointer cursor-pointer"
                              />
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                              <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start">
                                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Upload a clear image of your signature on a white background (PNG, JPG). Maximum file size: 5MB</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur opacity-75"></div>
              <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Ready to Submit?</h3>
                  <p className="text-white/90 text-sm">Please review all information before submitting your application</p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold py-5 px-8 rounded-xl text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 shadow-xl flex items-center justify-center mx-auto overflow-hidden ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 group-hover:from-white group-hover:to-white transition-all duration-300"></span>
                  {isSubmitting ? (
                    <>
                      <svg className="relative w-6 h-6 mr-3 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-bold">
                        Submitting... {uploadProgress}%
                      </span>
                    </>
                  ) : (
                    <>
                      <svg className="relative w-6 h-6 mr-3 text-blue-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-bold">
                        Submit Application
                      </span>
                      <svg className="relative w-6 h-6 ml-3 text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="mt-4 text-white/70 text-xs">
                  🔒 Your information is secure and encrypted
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
