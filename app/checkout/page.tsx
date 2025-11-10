'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { storageUtils } from '@/lib/utils/storage';
import { usePaymentIntent } from '@/lib/hooks/usePaymentIntent';
import { getPricing, calculateTotal } from '@/lib/constants/pricing';
import type { ApplicationData } from '@/lib/types/application';

// Initialize Stripe outside component to prevent recreation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function CheckoutPage() {
  const router = useRouter();
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [mounted, setMounted] = useState(false);

  // Custom hook for payment intent creation
  const { clientSecret, loading, error } = usePaymentIntent({
    applicationData,
    enabled: mounted && !!applicationData,
  });

  useEffect(() => {
    setMounted(true);
    const data = storageUtils.getApplicationData();
    setApplicationData(data);
  }, []);

  const handleBackToHome = useCallback(() => {
    storageUtils.clearApplicationData();
    router.push('/');
  }, [router]);

  const handleGoToApplication = useCallback(() => {
    router.push('/application');
  }, [router]);

  // Show loading spinner while initializing
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            {!mounted ? 'Loading...' : 'Preparing payment form...'}
          </p>
        </div>
      </div>
    );
  }

  // Show error if payment intent creation failed
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Initialization Failed</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error.message}</p>
          <button
            onClick={handleBackToHome}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Show error if no application data found
  if (!applicationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Application Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find your application data. Please submit your application first.
          </p>
          <button
            onClick={handleGoToApplication}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Go to Application
          </button>
        </div>
      </div>
    );
  }

  const pricing = getPricing(applicationData.idpPeriod);
  const total = calculateTotal(applicationData.idpPeriod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-xl animate-bounce">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 mb-3">
            Application Submitted!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your application has been successfully submitted. Please complete your payment to finalize your order.
          </p>
          {applicationData.applicationId && (
            <div className="mt-4 inline-block bg-blue-100 dark:bg-blue-900/30 px-6 py-3 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400">Application ID</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">#{applicationData.applicationId}</p>
            </div>
          )}
        </div>

        {/* Stripe Payment Form */}
        {clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#2563eb',
                  colorBackground: '#ffffff',
                  colorText: '#1f2937',
                  colorDanger: '#ef4444',
                  fontFamily: 'system-ui, sans-serif',
                  spacingUnit: '4px',
                  borderRadius: '12px',
                },
              },
            }}
          >
            <CheckoutForm 
              applicationData={{
                applicationId: applicationData.applicationId,
                email: applicationData.email,
                firstName: applicationData.firstName,
                lastName: applicationData.lastName,
              }}
              amount={total}
            />
          </Elements>
        ) : (
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400">Initializing payment...</p>
          </div>
        )}

        {/* Cancel Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-3 px-8 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Cancel and Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
