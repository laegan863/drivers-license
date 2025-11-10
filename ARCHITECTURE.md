# Project Architecture

## Overview
This is a Next.js 14 application with a Laravel backend for processing International Driver's Permit (IDP) applications with Stripe payment integration.

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Stripe.js** - Payment processing
- **React Stripe Elements** - Pre-built UI components for payments

### Backend
- **Laravel 10+** - PHP framework
- **MySQL** - Relational database
- **Stripe PHP SDK** - Server-side payment processing

## Project Structure

```
nextjs/cruds/
├── app/
│   ├── checkout/          # Payment checkout pages
│   │   ├── page.tsx       # Main checkout page
│   │   └── CheckoutForm.tsx
│   ├── success/           # Payment success page
│   └── application/       # Application form
├── lib/
│   ├── constants/         # Application constants
│   │   └── pricing.ts     # Pricing configuration
│   ├── types/             # TypeScript type definitions
│   │   └── application.ts # Application data types
│   ├── services/          # API service layer
│   │   └── payment.service.ts
│   ├── utils/             # Utility functions
│   │   └── storage.ts     # localStorage utilities
│   └── hooks/             # Custom React hooks
│       └── usePaymentIntent.ts
└── public/               # Static assets
```

## Code Architecture Patterns

### 1. **Service Layer Pattern**
All API calls are centralized in service classes:
```typescript
// lib/services/payment.service.ts
class PaymentService {
  async createPaymentIntent(data: PaymentIntentRequest): Promise<PaymentIntentResponse>
  async updatePaymentStatus(data: PaymentStatusUpdateRequest): Promise<PaymentStatusUpdateResponse>
}
```

### 2. **Custom Hooks**
Business logic is encapsulated in reusable hooks:
```typescript
// lib/hooks/usePaymentIntent.ts
export function usePaymentIntent({
  applicationData,
  enabled
}: UsePaymentIntentOptions): UsePaymentIntentReturn
```

### 3. **Type Safety**
Comprehensive TypeScript interfaces for all data structures:
```typescript
// lib/types/application.ts
export interface ApplicationData { ... }
export interface PaymentIntentRequest { ... }
export interface PaymentIntentResponse { ... }
```

### 4. **Constants Management**
Configuration centralized in constant files:
```typescript
// lib/constants/pricing.ts
export const PRICING_TIERS = {
  '1year': { period: '1 Year', price: 49.99, processing: 5.0 },
  ...
}
```

### 5. **Utility Functions**
Reusable utility functions for common operations:
```typescript
// lib/utils/storage.ts
export const storageUtils = {
  getApplicationData(): ApplicationData | null
  setApplicationData(data: ApplicationData): void
  clearApplicationData(): void
}
```

## Key Features

### Payment Flow
1. User submits application form
2. Application data stored in localStorage and database
3. User redirected to checkout page
4. Payment Intent created via custom hook
5. Stripe Elements form displayed
6. Payment confirmed without redirect
7. Payment status updated in database
8. User redirected to success page

### Error Handling
- Comprehensive try-catch blocks
- Structured error logging
- User-friendly error messages
- Validation at both frontend and backend

### Security
- Input validation using Laravel Request validation
- CSRF protection
- Stripe webhook signature verification
- Environment variables for sensitive data
- PCI DSS compliant payment processing

## Best Practices Implemented

1. **Separation of Concerns**
   - UI components separated from business logic
   - API logic in dedicated service layer
   - State management isolated in custom hooks

2. **DRY Principle**
   - Reusable components and functions
   - Centralized constants
   - Shared utility functions

3. **Type Safety**
   - Strict TypeScript configuration
   - Comprehensive type definitions
   - Runtime validation

4. **Performance Optimization**
   - React.memo for component optimization
   - useCallback for function memoization
   - Lazy loading for heavy components

5. **Error Handling**
   - Graceful error degradation
   - User-friendly error messages
   - Comprehensive logging

6. **Code Organization**
   - Feature-based folder structure
   - Consistent naming conventions
   - Clear file responsibilities

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost/Laegan/dl/public
```

### Backend (.env)
```
STRIPE_SK=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
APP_FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Laravel Backend
- `POST /api/create-payment-intent` - Create Stripe Payment Intent
- `POST /api/update-payment-status` - Update payment status
- `POST /api/create-checkout-session` - Create hosted checkout
- `POST /api/verify-payment` - Verify payment completion
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## Database Schema

### Applications Table
```sql
- id (primary key)
- email, first_name, last_name
- address fields
- license information
- stripe_session_id (nullable)
- stripe_payment_intent (nullable)
- payment_status (enum: pending, paid, failed)
- timestamps
```

## Future Improvements

1. Add unit and integration tests
2. Implement Redux for global state management
3. Add email notifications
4. Implement admin dashboard
5. Add application status tracking
6. Implement PDF generation for receipts
7. Add multi-language support
8. Implement rate limiting
9. Add analytics tracking
10. Implement CI/CD pipeline
