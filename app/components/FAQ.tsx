'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is an International Driving Permit (IDP)?',
      answer: 'An IDP is an official document that translates your domestic driving license into multiple languages. It\'s recognized in over 150 countries worldwide and allows you to legally rent and drive vehicles abroad. The IDP works alongside your regular license, not as a replacement.'
    },
    {
      question: 'How long does it take to get my permit?',
      answer: 'Processing times depend on your chosen plan. Standard processing takes 3-5 business days, Priority takes 24-48 hours, and Express processing is same-day for eligible applications. You\'ll receive a digital copy immediately after approval, with physical cards following by mail.'
    },
    {
      question: 'What documents do I need to apply?',
      answer: 'You\'ll need a valid driver\'s license from your country, a recent passport-style photo, and a valid form of identification. The application form will guide you through exactly what\'s needed. All documents can be uploaded digitally through our secure platform.'
    },
    {
      question: 'In which countries is the IDP valid?',
      answer: 'Your International Driving Permit is valid in over 150 countries including all European Union countries, Australia, Japan, South Africa, Brazil, and many more. Our permit follows the 1949 Geneva Convention on Road Traffic, ensuring wide international acceptance.'
    },
    {
      question: 'How long is the permit valid for?',
      answer: 'Validity depends on your chosen plan: 1 year, 2 years, 3 years, 5 years, or 10 years. The permit becomes active from the date of issue. We recommend choosing a longer validity if you travel frequently to maximize savings.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Absolutely. We use bank-level 256-bit SSL encryption for all data transmission and storage. We\'re fully compliant with GDPR, CCPA, and international privacy regulations. Your information is never shared with third parties.'
    },
    {
      question: 'Can I use the digital version while waiting for the physical card?',
      answer: 'Yes! Once approved, you\'ll receive a digital copy of your permit instantly via email. This digital version is valid and can be used immediately while your physical card is being shipped. Many car rental companies accept the digital version.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, Apple Pay, and Google Pay. All payments are processed through our secure, encrypted payment gateway powered by Stripe.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied for any reason, contact us within 30 days of purchase for a full refund. Note that refunds cannot be processed after the permit has been activated or used.'
    },
    {
      question: 'What if I lose my permit?',
      answer: 'Depending on your plan, you may have free replacements included. The 3-year plan includes 2 free replacements, the 5-year plan includes unlimited replacements, and the 10-year plan includes unlimited replacements with priority shipping. Otherwise, replacements are available for a small fee.'
    },
    {
      question: 'Do I still need my original license?',
      answer: 'Yes! The International Driving Permit is a supplementary document, not a replacement for your domestic license. You must carry both documents when driving abroad. The IDP serves as an official translation of your license for authorities who may not understand your home country\'s license format.'
    },
    {
      question: 'Is there customer support available?',
      answer: 'Yes! We offer 24/7 customer support via email, live chat, and phone. Standard plans include email support with 24-hour response times, while Premium and VIP plans include priority phone support and live chat with instant response.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into two columns
  const midPoint = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midPoint);
  const rightFaqs = faqs.slice(midPoint);

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4 tracking-wide">
            ❓ FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about getting your International Driving Permit.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {/* Left Column */}
          <div className="space-y-4">
            {leftFaqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 border-2 ${
                  openIndex === index ? 'border-purple-500 shadow-lg shadow-purple-500/10' : 'border-transparent hover:border-gray-200'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-start justify-between focus:outline-none group"
                >
                  <div className="flex items-start">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-4 transition-colors ${
                      openIndex === index 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-500'
                    }`}>
                      <span className="font-bold text-sm">{(index + 1).toString().padStart(2, '0')}</span>
                    </span>
                    <span className="font-semibold text-lg text-gray-900 pr-4">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-purple-600 text-white rotate-180' 
                      : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pl-18">
                    <div className="ml-12 pl-4 border-l-2 border-purple-200">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightFaqs.map((faq, originalIndex) => {
              const index = originalIndex + midPoint;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 border-2 ${
                    openIndex === index ? 'border-purple-500 shadow-lg shadow-purple-500/10' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex items-start justify-between focus:outline-none group"
                  >
                    <div className="flex items-start">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-4 transition-colors ${
                        openIndex === index 
                          ? 'bg-purple-100 text-purple-600' 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-500'
                      }`}>
                        <span className="font-bold text-sm">{(index + 1).toString().padStart(2, '0')}</span>
                      </span>
                      <span className="font-semibold text-lg text-gray-900 pr-4">
                        {faq.question}
                      </span>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index 
                        ? 'bg-purple-600 text-white rotate-180' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pl-18">
                      <div className="ml-12 pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Still have questions CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 p-[2px]">
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-3xl p-8 md:p-12">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-3">
                Still Have Questions?
              </h3>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Can't find the answer you're looking for? Our friendly support team is available 24/7 to help you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Support
                </Link>
                <a
                  href="tel:+1-800-123-4567"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (800) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
