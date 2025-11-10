/**
 * Payment service for handling Stripe API calls
 */

import type {
  PaymentIntentRequest,
  PaymentIntentResponse,
  PaymentStatusUpdateRequest,
  PaymentStatusUpdateResponse,
} from '@/lib/types/application';

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

class PaymentService {
  /**
   * Create a payment intent with Stripe
   */
  async createPaymentIntent(data: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    const response = await fetch(`${API_BASE_URL}/api/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create payment intent: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  /**
   * Update payment status after successful payment
   */
  async updatePaymentStatus(data: PaymentStatusUpdateRequest): Promise<PaymentStatusUpdateResponse> {
    const response = await fetch(`${API_BASE_URL}/api/update-payment-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update payment status: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  /**
   * Verify payment using session ID
   */
  async verifyPayment(sessionId: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id: sessionId }),
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return response.json();
  }

  /**
   * Get application by ID
   */
  async getApplication(applicationId: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/applications/${applicationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch application');
    }

    return response.json();
  }
}

export const paymentService = new PaymentService();
