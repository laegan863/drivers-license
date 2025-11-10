/**
 * Pricing configuration for IDP periods
 */

export const PRICING_TIERS = {
  '1year': {
    period: '1 Year',
    price: 49.99,
    processing: 5.0,
  },
  '2years': {
    period: '2 Years',
    price: 79.99,
    processing: 5.0,
  },
  '3years': {
    period: '3 Years',
    price: 99.99,
    processing: 5.0,
  },
} as const;

export type PricingPeriod = keyof typeof PRICING_TIERS;

export const DEFAULT_PRICING_PERIOD: PricingPeriod = '1year';

export const getPricing = (period: string) => {
  return PRICING_TIERS[period as PricingPeriod] || PRICING_TIERS[DEFAULT_PRICING_PERIOD];
};

export const calculateTotal = (period: string) => {
  const pricing = getPricing(period);
  return pricing.price + pricing.processing;
};
