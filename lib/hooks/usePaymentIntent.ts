/**
 * Custom hook for managing payment intent creation
 */

import { useState, useEffect } from 'react';
import { paymentService } from '@/lib/services/payment.service';
import { calculateTotal } from '@/lib/constants/pricing';
import type { ApplicationData } from '@/lib/types/application';

interface UsePaymentIntentOptions {
  applicationData: ApplicationData | null;
  enabled?: boolean;
}

interface UsePaymentIntentReturn {
  clientSecret: string | null;
  loading: boolean;
  error: Error | null;
}

export function usePaymentIntent({
  applicationData,
  enabled = true,
}: UsePaymentIntentOptions): UsePaymentIntentReturn {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || !applicationData?.applicationId) {
      setLoading(false);
      return;
    }

    const createIntent = async () => {
      try {
        setLoading(true);
        setError(null);

        const total = calculateTotal(applicationData.idpPeriod);

        const result = await paymentService.createPaymentIntent({
          application_id: applicationData.applicationId!,
          amount: total,
          idp_period: applicationData.idpPeriod,
          email: applicationData.email,
          customer_name: `${applicationData.firstName} ${applicationData.lastName}`,
        });

        if (result.success && result.client_secret) {
          setClientSecret(result.client_secret);
        } else {
          throw new Error(result.message || 'Failed to create payment intent');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        console.error('Payment intent creation error:', error);
      } finally {
        setLoading(false);
      }
    };

    createIntent();
  }, [applicationData, enabled]);

  return { clientSecret, loading, error };
}
