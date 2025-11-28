export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Express Processing",
      description: "Get your permit in as fast as 24 hours with our expedited service option."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Officially Recognized",
      description: "Valid in 150+ countries under the 1949 Geneva Convention on Road Traffic."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "24/7 Support",
      description: "Round-the-clock customer service to assist you with any questions or concerns."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Secure & Private",
      description: "Bank-level encryption protects your personal information and documents."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "Easy Application",
      description: "Simple 3-step process. Complete your application in under 10 minutes."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Digital & Physical",
      description: "Receive instant digital copy plus physical card shipped worldwide."
    }
  ];

  const services = [
    {
      icon: "🚗",
      title: "Personal Vehicles",
      description: "Cars, motorcycles, and personal transportation licenses for everyday driving needs.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🚌",
      title: "Commercial Vehicles",
      description: "Professional driving licenses for buses, taxis, and commercial transport services.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "🚛",
      title: "Heavy Vehicles",
      description: "Specialized permits for trucks, trailers, and heavy equipment operation.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "🏍️",
      title: "Two-Wheelers",
      description: "Motorcycle and scooter licenses with comprehensive training certification.",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Fill Application",
      description: "Complete our simple online form with your details and upload required documents.",
      icon: "📝"
    },
    {
      number: "02",
      title: "Make Payment",
      description: "Secure checkout with multiple payment options including cards and digital wallets.",
      icon: "💳"
    },
    {
      number: "03",
      title: "Receive Permit",
      description: "Get your digital permit instantly and physical card delivered to your door.",
      icon: "✅"
    }
  ];

  return (
    <div>
      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4 tracking-wide">
              OUR SERVICES
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              License Types We
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Support</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whatever your driving needs, we have you covered with internationally recognized permits.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="mt-6 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNDQ2NiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full text-sm font-semibold mb-4 tracking-wide">
              WHY CHOOSE US
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Everything You Need for
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">International Driving</span>
            </h2>
            <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
              We've streamlined the entire process so you can focus on your travels.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/25">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-blue-100/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4 tracking-wide">
              SIMPLE PROCESS
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Get Your Permit in
              <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent"> 3 Easy Steps</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes getting your international driving permit quick and hassle-free.
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transform -translate-y-1/2 z-0 rounded-full"></div>
            
            <div className="grid lg:grid-cols-3 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 relative z-10">
                    {/* Step number badge */}
                    <div className="absolute -top-4 left-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      STEP {step.number}
                    </div>
                    
                    <div className="text-6xl mb-6 mt-4">
                      {step.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow connector */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
