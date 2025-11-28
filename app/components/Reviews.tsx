'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Reviews() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Business Traveler",
      avatar: "👩‍💼",
      rating: 5,
      text: "The entire process was incredibly smooth! I got my international permit in just 2 days. The online platform is user-friendly, and the support team was always available. Highly recommended!",
      location: "New York, USA",
      verified: true
    },
    {
      name: "Michael Chen",
      role: "Digital Nomad",
      avatar: "👨‍💻",
      rating: 5,
      text: "As someone who travels constantly for work, this service is a lifesaver. No embassy visits, no complicated paperwork. I submitted my application online and received my permit within days.",
      location: "San Francisco, USA",
      verified: true
    },
    {
      name: "Emily Rodriguez",
      role: "Travel Blogger",
      avatar: "👩‍🦱",
      rating: 5,
      text: "Needed an international license for my road trip across Europe. The process was straightforward, and I received it just in time. Professional and helpful throughout!",
      location: "Miami, USA",
      verified: true
    },
    {
      name: "David Thompson",
      role: "Expatriate",
      avatar: "👨‍🦰",
      rating: 5,
      text: "Living abroad requires proper documentation. DrivePass helped me get my international permit quickly and efficiently. The tracking feature kept me updated every step of the way.",
      location: "London, UK",
      verified: true
    },
    {
      name: "Jessica Lee",
      role: "Vacation Traveler",
      avatar: "👩",
      rating: 5,
      text: "First time getting an international permit and I was nervous about the process. DrivePass made everything crystal clear with step-by-step instructions. Got my permit without any issues!",
      location: "Seattle, USA",
      verified: true
    },
    {
      name: "Robert Martinez",
      role: "Frequent Flyer",
      avatar: "👨",
      rating: 5,
      text: "Best service for international driving permits! No waiting rooms, no frustration. Everything done from my couch. The future of travel documentation is here!",
      location: "Austin, USA",
      verified: true
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const nextReview = () => {
    setIsAutoPlaying(false);
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setIsAutoPlaying(false);
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentReview(index);
  };

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4 tracking-wide">
            ⭐ CUSTOMER REVIEWS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Loved by Travelers
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join over 50,000 satisfied customers who trust us with their international driving needs.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <span className="text-2xl font-bold text-blue-600">50K+</span>
            <span className="text-gray-600">Happy Customers</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <span className="text-2xl font-bold text-yellow-500">4.9</span>
            <span className="text-gray-600">Average Rating</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <span className="text-2xl font-bold text-green-600">150+</span>
            <span className="text-gray-600">Countries Served</span>
          </div>
        </div>

        {/* Featured Review Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="p-8 md:p-12">
              {/* Quote icon */}
              <div className="flex justify-between items-start mb-8">
                <svg className="w-16 h-16 text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.165 1.4.615 2.52 1.35 3.35.732.833 1.646 1.25 2.742 1.25.967 0 1.768-.29 2.402-.876.627-.576.942-1.365.942-2.368v.01z" />
                </svg>
                {reviews[currentReview].verified && (
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>

              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                "{reviews[currentReview].text}"
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Author info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg mr-4">
                    {reviews[currentReview].avatar}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      {reviews[currentReview].name}
                    </h4>
                    <p className="text-blue-600 font-medium">
                      {reviews[currentReview].role}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {reviews[currentReview].location}
                    </p>
                  </div>
                </div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevReview}
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-all duration-200 group"
                    aria-label="Previous review"
                  >
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextReview}
                    className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all duration-200 shadow-lg shadow-blue-600/30"
                    aria-label="Next review"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center mt-8 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentReview
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                index === currentReview ? 'border-blue-500 scale-[1.02]' : 'border-transparent'
              }`}
              onClick={() => goToReview(index)}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-2xl mr-3">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
                {review.verified && (
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {review.text}
              </p>
              
              <p className="mt-4 text-xs text-gray-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {review.location}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-[2px] rounded-2xl">
            <div className="bg-white rounded-2xl px-8 py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Join Our Happy Customers?
              </h3>
              <p className="text-gray-600 mb-6">Start your application today and drive anywhere in the world</p>
              <Link
                href="/application"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Start Your Application
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
