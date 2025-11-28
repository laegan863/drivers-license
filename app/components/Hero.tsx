import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-700/30 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNDQ2NiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
              </span>
              🌍 International Driving Permit
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Drive Anywhere
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                In The World
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-blue-100/80 mb-10 max-w-xl leading-relaxed">
              Get your International Driver's Permit in minutes. Valid in 150+ countries. 
              Fast, secure, and officially recognized worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/application"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white overflow-hidden rounded-2xl shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  Apply Now
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <Link
                href="#features"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center text-sm text-blue-200/70">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Officially Recognized
              </div>
              <div className="flex items-center text-sm text-blue-200/70">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                150+ Countries
              </div>
              <div className="flex items-center text-sm text-blue-200/70">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                24/7 Support
              </div>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="relative">
            {/* Main card */}
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              {/* Glowing effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 rounded-3xl blur-xl opacity-20"></div>
              
              <div className="relative">
                {/* License preview mockup */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 mb-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-bold text-white/80 tracking-widest">INTERNATIONAL DRIVING PERMIT</div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      🌐
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-white/30 rounded w-3/4"></div>
                    <div className="h-3 bg-white/20 rounded w-1/2"></div>
                    <div className="flex gap-4 mt-4">
                      <div className="w-20 h-24 bg-white/10 rounded-lg flex items-center justify-center text-4xl">👤</div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-white/20 rounded w-full"></div>
                        <div className="h-2 bg-white/20 rounded w-3/4"></div>
                        <div className="h-2 bg-white/20 rounded w-1/2"></div>
                        <div className="h-2 bg-white/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-3xl font-bold text-white mb-1">150+</div>
                    <div className="text-blue-200/60 text-sm">Countries Accepted</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-3xl font-bold text-white mb-1">50K+</div>
                    <div className="text-blue-200/60 text-sm">Happy Customers</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-3xl font-bold text-white mb-1">24hr</div>
                    <div className="text-blue-200/60 text-sm">Fast Processing</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-3xl font-bold text-white mb-1">4.9★</div>
                    <div className="text-blue-200/60 text-sm">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
              ✓ Instant Approval
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
              🔒 Secure & Encrypted
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-blue-300/50">
          <span className="text-xs mb-2 tracking-widest">SCROLL</span>
          <div className="w-6 h-10 border-2 border-blue-300/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
