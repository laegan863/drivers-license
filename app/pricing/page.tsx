'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      name: 'Basic',
      duration: '1 Year',
      monthlyPrice: '9.99',
      yearlyPrice: '39.99',
      popular: false,
      description: 'Perfect for occasional drivers',
      features: [
        'Standard processing (3-5 days)',
        'Email support',
        'Online application tracking',
        'Digital license copy',
        'One renewal reminder',
        'Mobile app access',
        'Basic dashboard'
      ],
      color: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      name: 'Standard',
      duration: '2 Years',
      monthlyPrice: '6.99',
      yearlyPrice: '54.99',
      popular: false,
      description: 'Great value for regular drivers',
      features: [
        'Fast processing (2 days)',
        'Priority email support',
        'Online application tracking',
        'Digital + Physical license',
        'Multiple renewal reminders',
        'Mobile app access',
        'Enhanced dashboard',
        'Save $25 vs Basic annually'
      ],
      color: 'from-indigo-500 to-purple-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      name: 'Premium',
      duration: '3 Years',
      monthlyPrice: '5.83',
      yearlyPrice: '69.99',
      popular: true,
      description: 'Most popular choice',
      features: [
        'Express processing (1 day)',
        'Priority support 24/7',
        'Advanced tracking dashboard',
        'Digital + Physical + Card',
        'Automatic renewal reminders',
        'Premium mobile app features',
        'Save $50 vs Basic annually',
        'Free replacement once',
        'Exclusive member benefits',
        'Priority customer service'
      ],
      color: 'from-purple-500 to-pink-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    },
    {
      name: 'Professional',
      duration: '5 Years',
      monthlyPrice: '4.25',
      yearlyPrice: '84.99',
      popular: false,
      description: 'Best for professionals',
      features: [
        'Instant processing (same day)',
        'VIP support 24/7',
        'Premium tracking dashboard',
        'All license formats included',
        'Smart renewal system',
        'VIP mobile app access',
        'Save $115 vs Basic annually',
        'Free replacement twice',
        'International license included',
        'Document concierge service',
        'Priority appointment booking',
        'Dedicated account manager'
      ],
      color: 'from-pink-500 to-rose-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      name: 'Enterprise',
      duration: '10 Years',
      monthlyPrice: '2.50',
      yearlyPrice: '99.99',
      popular: false,
      description: 'Ultimate long-term value',
      features: [
        'Instant processing guaranteed',
        'White-glove VIP support',
        'Enterprise dashboard',
        'All premium features',
        'Lifetime renewal automation',
        'Exclusive enterprise app',
        'Save $300 vs Basic annually',
        'Unlimited free replacements',
        'International license included',
        'Premium document services',
        'VIP appointment access',
        'Personal account executive',
        'Family member discounts',
        'Travel assistance program'
      ],
      color: 'from-rose-500 to-orange-500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const handleSelectPlan = (planName: string, planPrice: string) => {
    // setSelectedPlan(planName);
    alert(`Selected Plan: ${planName} - ${planPrice}`);
    // Scroll to contact form or trigger application
    // const applySection = document.getElementById('apply');
    // if (applySection) {
    //   applySection.scrollIntoView({ behavior: 'smooth' });
    // } else {
    //   window.location.href = '/#apply';
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6">
            💲 Simple, Transparent
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Choose the perfect plan for your needs. All plans include secure processing, guaranteed delivery, and our commitment to excellence.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-lg font-medium transition-colors ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium transition-colors ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
              Yearly
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Save up to 75%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? 'ring-4 ring-blue-500 lg:scale-105 z-10' : ''
                } ${selectedPlan === plan.name ? 'ring-4 ring-green-500' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute w-full -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg uppercase tracking-wide">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${plan.color} text-white mb-4 shadow-lg`}>
                    {plan.icon}
                  </div>

                  {/* Plan Name & Description */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {plan.duration}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 min-h-[40px]">
                    {plan.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-gray-500 dark:text-gray-400 text-sm mr-1">USD</span>
                      <span className={`text-5xl font-extrabold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                        {getPrice(plan)}
                      </span>
                    </div>
                    <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {billingCycle === 'monthly' ? '/month' : '/year'}
                    </p>
                    {billingCycle === 'yearly' && (
                      <p className="text-center text-green-600 dark:text-green-400 text-xs mt-1 font-medium">
                        ${plan.monthlyPrice}/mo when paid yearly
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.name, getPrice(plan))}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 mb-6 ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-xl hover:scale-105`
                        : selectedPlan === plan.name
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {selectedPlan === plan.name ? '✓ Selected' : 'Choose Plan'}
                  </button>

                  {/* Features */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                      What's Included:
                    </p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison Table */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Compare All Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what makes each plan unique
            </p>
          </div>

          {/* Mobile: Accordion Style */}
          <div className="lg:hidden space-y-4">
            {plans.map((plan, idx) => (
              <details key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg">
                <summary className="cursor-pointer font-bold text-lg text-gray-900 dark:text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.color} text-white flex items-center justify-center mr-3`}>
                      {plan.icon}
                    </div>
                    {plan.name}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">${getPrice(plan)}</span>
                </summary>
                <div className="mt-4 space-y-2">
                  {plan.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>

          {/* Desktop: Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 font-bold text-gray-900 dark:text-white">Feature</th>
                  {plans.map((plan, idx) => (
                    <th key={idx} className="text-center py-4 px-4">
                      <div className={`inline-flex flex-col items-center p-4 rounded-xl bg-gradient-to-br ${plan.color} text-white shadow-lg`}>
                        <div className="mb-2">{plan.icon}</div>
                        <span className="font-bold text-lg">{plan.name}</span>
                        <span className="text-2xl font-bold mt-1">${getPrice(plan)}</span>
                        <span className="text-xs opacity-90">{billingCycle === 'monthly' ? '/mo' : '/yr'}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  'Processing Speed',
                  'Customer Support',
                  'Digital License',
                  'Physical License',
                  'ID Card',
                  'Renewal Reminders',
                  'Mobile App',
                  'Free Replacements',
                  'International License',
                  'Priority Services'
                ].map((feature, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{feature}</td>
                    {plans.map((plan, planIdx) => (
                      <td key={planIdx} className="text-center py-4 px-4">
                        <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-white mb-4 shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Secure Payment</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">256-bit SSL encryption</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 text-white mb-4 shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Money-Back Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">30-day full refund</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white mb-4 shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Instant Access</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Start immediately</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white mb-4 shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Pricing FAQs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Common questions about our pricing
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Can I switch plans later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. We\'ll prorate the difference and credit or charge accordingly.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover), PayPal, Apple Pay, and Google Pay.'
              },
              {
                q: 'Is there a free trial?',
                a: 'We offer a 30-day money-back guarantee instead of a free trial. If you\'re not satisfied, we\'ll refund your purchase in full.'
              },
              {
                q: 'Are there any hidden fees?',
                a: 'No hidden fees ever. The price you see is the price you pay. Some states may require additional government processing fees.'
              },
              {
                q: 'Do prices include taxes?',
                a: 'Prices are shown before tax. Applicable sales tax will be calculated at checkout based on your location.'
              }
            ].map((faq, idx) => (
              <details key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg group">
                <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-white flex items-center justify-between">
                  {faq.q}
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose your plan and start your application in under a minute
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#apply"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-full hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Start Application
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}