'use client';

import { useState } from 'react';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      duration: '1 Year',
      price: '39.99',
      popular: false,
      features: [
        'Standard processing time',
        'Email support',
        'Online application tracking',
        'Digital license copy',
        'One renewal reminder'
      ]
    },
    {
      duration: '2 Years',
      price: '54.99',
      popular: false,
      features: [
        'Standard processing time',
        'Priority email support',
        'Online application tracking',
        'Digital license copy',
        'Renewal reminders',
        'Save $25 vs annual'
      ]
    },
    {
      duration: '3 Years',
      price: '69.99',
      popular: true,
      features: [
        'Fast processing (2 days)',
        'Priority support 24/7',
        'Online application tracking',
        'Digital + Physical license',
        'Automatic renewal reminders',
        'Save $50 vs annual',
        'Free replacement once'
      ]
    },
    {
      duration: '5 Years',
      price: '84.99',
      popular: false,
      features: [
        'Express processing (1 day)',
        'VIP support 24/7',
        'Premium tracking dashboard',
        'Digital + Physical license',
        'Automatic renewal reminders',
        'Save $115 vs annual',
        'Free replacement twice',
        'International license included'
      ]
    },
    {
      duration: '10 Years',
      price: '99.99',
      popular: false,
      features: [
        'Instant processing',
        'Dedicated VIP support',
        'Premium tracking dashboard',
        'All license formats',
        'Lifetime renewal reminders',
        'Save $300 vs annual',
        'Unlimited free replacements',
        'International license included',
        'Priority appointment booking'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            💲 Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include secure processing and guaranteed delivery.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-4 ring-blue-500 scale-105' : ''
              } ${selectedPlan === plan.duration ? 'ring-4 ring-green-500' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute w-full -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Duration */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                  {plan.duration}
                </h3>

                {/* Price */}
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 text-lg mr-2">USD</span>
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedPlan(plan.duration)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                      : selectedPlan === plan.duration
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {selectedPlan === plan.duration ? 'Selected ✓' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Payment</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                All transactions are encrypted and secure
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">💯</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Money-Back Guarantee</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                30-day full refund if not satisfied
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instant Access</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Start your application immediately after payment
              </p>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm">
          * All prices are in USD. Additional state fees may apply. Contact us for group discounts.
        </p>
      </div>
    </section>
  );
}
