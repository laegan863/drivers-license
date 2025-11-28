'use client';

import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      duration: '1 Year',
      price: '39.99',
      period: 'one-time',
      popular: false,
      color: 'blue',
      features: [
        'Valid for 12 months',
        'Digital permit delivery',
        'Email support',
        '150+ countries accepted',
        'Online verification'
      ]
    },
    {
      duration: '2 Years',
      price: '54.99',
      period: 'one-time',
      popular: false,
      color: 'indigo',
      savings: '25',
      features: [
        'Valid for 24 months',
        'Digital + Physical delivery',
        'Priority email support',
        '150+ countries accepted',
        'Online verification',
        'Free replacement once'
      ]
    },
    {
      duration: '3 Years',
      price: '69.99',
      period: 'one-time',
      popular: true,
      color: 'purple',
      savings: '50',
      features: [
        'Valid for 36 months',
        'Express processing (24hr)',
        'Priority support 24/7',
        'Digital + Physical delivery',
        '150+ countries accepted',
        'Free replacement twice',
        'Renewal reminders'
      ]
    },
    {
      duration: '5 Years',
      price: '84.99',
      period: 'one-time',
      popular: false,
      color: 'pink',
      savings: '115',
      features: [
        'Valid for 60 months',
        'Express processing (24hr)',
        'VIP support 24/7',
        'Digital + Physical delivery',
        '150+ countries accepted',
        'Unlimited replacements',
        'Priority renewal'
      ]
    },
    {
      duration: '10 Years',
      price: '99.99',
      period: 'one-time',
      popular: false,
      color: 'rose',
      savings: '300',
      features: [
        'Valid for 120 months',
        'Instant processing',
        'Dedicated VIP support',
        'All delivery options',
        '150+ countries accepted',
        'Unlimited replacements',
        'Lifetime reminders',
        'Priority everything'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzM2NiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full text-sm font-semibold mb-4 tracking-wide">
            💎 PRICING PLANS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simple, Transparent
            <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-xl text-purple-100/70 max-w-3xl mx-auto">
            Choose the validity period that works best for you. All plans include full international coverage.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group ${
                plan.popular ? 'lg:-mt-4 lg:mb-4' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-purple-500/50 whitespace-nowrap">
                    ⭐ BEST VALUE
                  </span>
                </div>
              )}

              {/* Card */}
              <div className={`relative h-full bg-white/5 backdrop-blur-sm rounded-2xl border transition-all duration-300 overflow-hidden ${
                plan.popular 
                  ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' 
                  : 'border-white/10 hover:border-purple-500/30'
              } group-hover:bg-white/10`}>
                
                {/* Gradient top line */}
                <div className={`h-1 bg-gradient-to-r ${
                  plan.popular 
                    ? 'from-purple-500 via-pink-500 to-red-500' 
                    : 'from-blue-500 to-purple-500'
                }`}></div>

                <div className="p-6">
                  {/* Duration */}
                  <h3 className="text-xl font-bold text-white mb-1 text-center">
                    {plan.duration}
                  </h3>
                  
                  {plan.savings && (
                    <p className="text-green-400 text-sm text-center font-medium mb-4">
                      Save ${plan.savings}
                    </p>
                  )}
                  {!plan.savings && <div className="h-6 mb-4"></div>}

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-purple-300 text-lg">$</span>
                      <span className="text-5xl font-bold text-white mx-1">
                        {plan.price.split('.')[0]}
                      </span>
                      <span className="text-purple-300 text-lg">.{plan.price.split('.')[1]}</span>
                    </div>
                    <p className="text-purple-300/60 text-sm mt-1">one-time payment</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-purple-100/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/application"
                    className={`block w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-green-500/25">
              🔒
            </div>
            <h4 className="font-semibold text-white mb-2">Secure Payment</h4>
            <p className="text-sm text-purple-100/60">
              Bank-level encryption protects all transactions
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-blue-500/25">
              💯
            </div>
            <h4 className="font-semibold text-white mb-2">Money-Back Guarantee</h4>
            <p className="text-sm text-purple-100/60">
              30-day full refund if you're not satisfied
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-purple-500/25">
              ⚡
            </div>
            <h4 className="font-semibold text-white mb-2">Instant Access</h4>
            <p className="text-sm text-purple-100/60">
              Start your application immediately after payment
            </p>
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-purple-200/50 text-sm">
          * All prices in USD. Processing fees may apply. Contact us for group discounts or corporate packages.
        </p>
      </div>
    </section>
  );
}
