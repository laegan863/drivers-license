'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long does it take to get my driver\'s license?',
      answer: 'Processing times vary by plan. Standard processing takes 3-5 business days, Fast processing takes 2 days, Express takes 1 day, and our premium Instant processing is same-day. All timelines start after document verification is complete.'
    },
    {
      question: 'What documents do I need to apply?',
      answer: 'You\'ll need a valid government-issued ID (passport or birth certificate), proof of residency (utility bill or lease agreement), Social Security card, and a recent passport-sized photo. International applicants may need additional documentation.'
    },
    {
      question: 'Can I track my application status?',
      answer: 'Yes! All plans include online application tracking. Once you submit your application, you\'ll receive a tracking number via email. You can log into your dashboard anytime to see real-time updates on your application status.'
    },
    {
      question: 'What if I lose my license?',
      answer: 'Depending on your plan, you may have free replacements included. The 3-year plan includes one free replacement, 5-year plan includes two, and the 10-year plan includes unlimited replacements. Otherwise, replacements cost $15 each.'
    },
    {
      question: 'Do you offer international driver\'s licenses?',
      answer: 'Yes! We offer international driving permits (IDP) which are valid in over 150 countries. The 5-year and 10-year plans include an IDP at no extra cost. For other plans, you can add an IDP for $25.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Absolutely. We use bank-level 256-bit SSL encryption to protect all your data. We\'re fully compliant with GDPR and CCPA regulations. Your information is never shared with third parties without your explicit consent.'
    },
    {
      question: 'Can I renew my license before it expires?',
      answer: 'Yes, you can renew your license up to 6 months before the expiration date. We\'ll send you automatic renewal reminders based on your plan. The new license will be dated to start after your current one expires.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our encrypted payment gateway.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with our service for any reason, contact us within 30 days of purchase for a full refund. Note that refunds cannot be issued after the license has been issued.'
    },
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Yes! You can upgrade to a longer-term plan at any time. We\'ll credit the remaining value of your current plan toward the new one. Contact our support team to process an upgrade.'
    },
    {
      question: 'What states do you serve?',
      answer: 'We currently serve all 50 US states, Washington DC, and US territories including Puerto Rico, Guam, and the US Virgin Islands. Each state has specific requirements which we\'ll guide you through during the application process.'
    },
    {
      question: 'Is there customer support available?',
      answer: 'Yes! Support availability depends on your plan. Basic plans include email support (24-48 hour response), while premium plans include 24/7 priority support via phone, email, and live chat. VIP plans include a dedicated support specialist.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Got questions? We've got answers. Can't find what you're looking for?{' '}
            <a href="#contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              Contact us
            </a>
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <span className="font-semibold text-lg text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-3">
            Still Have Questions?
          </h3>
          <p className="text-blue-100 mb-6">
            Our support team is here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            <a
              href="tel:1-800-DRIVE-PASS"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
