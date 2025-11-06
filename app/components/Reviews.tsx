'use client';

import { useState } from 'react';

export default function Reviews() {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "New Driver",
      avatar: "👩",
      rating: 5,
      text: "The entire process was incredibly smooth! I got my license in just 4 days. The online platform is user-friendly, and the support team was always available to answer my questions. Highly recommended!",
      location: "New York, NY"
    },
    {
      name: "Michael Chen",
      role: "License Renewal",
      avatar: "👨",
      rating: 5,
      text: "I dreaded renewing my license, but DrivePass made it so easy. No long lines, no hassle. I submitted my application online and received my new license within a week. Absolutely brilliant service!",
      location: "Los Angeles, CA"
    },
    {
      name: "Emily Rodriguez",
      role: "International License",
      avatar: "👩‍🦱",
      rating: 5,
      text: "Needed an international license for my trip to Europe. The process was straightforward, and I received it just in time. The staff was professional and helpful throughout. Thank you, DrivePass!",
      location: "Miami, FL"
    },
    {
      name: "David Thompson",
      role: "Lost License Replacement",
      avatar: "👨‍🦰",
      rating: 5,
      text: "Lost my wallet with my license in it. DrivePass helped me get a replacement quickly and efficiently. The tracking feature kept me updated every step of the way. Excellent service!",
      location: "Chicago, IL"
    },
    {
      name: "Jessica Lee",
      role: "New Driver",
      avatar: "👩‍🦳",
      rating: 5,
      text: "As a first-time applicant, I was nervous about the process. DrivePass made everything crystal clear with step-by-step instructions. Got my license without any issues. Five stars!",
      location: "Seattle, WA"
    },
    {
      name: "Robert Martinez",
      role: "License Renewal",
      avatar: "👨‍🦲",
      rating: 5,
      text: "Best DMV alternative ever! No waiting rooms, no frustration. Everything done from my couch. The future of license services is here, and it's called DrivePass!",
      location: "Austin, TX"
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index: number) => {
    setCurrentReview(index);
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have experienced our seamless service.
          </p>
        </div>

        {/* Featured Review Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>

            <div className="relative z-10">
              {/* Quote icon */}
              <svg className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.165 1.4.615 2.52 1.35 3.35.732.833 1.646 1.25 2.742 1.25.967 0 1.768-.29 2.402-.876.627-.576.942-1.365.942-2.368v.01z" />
              </svg>

              <div className="mb-6">
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                  {reviews[currentReview].text}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Author info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-5xl mr-4">{reviews[currentReview].avatar}</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {reviews[currentReview].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {reviews[currentReview].role}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {reviews[currentReview].location}
                    </p>
                  </div>
                </div>

                {/* Navigation arrows */}
                <div className="flex space-x-2">
                  <button
                    onClick={prevReview}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Previous review"
                  >
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextReview}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Next review"
                  >
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentReview
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* All Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3">{review.avatar}</div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {review.text.length > 150 ? review.text.substring(0, 150) + '...' : review.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Join Them?
          </h3>
          <a
            href="#apply"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Start Your Application
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
