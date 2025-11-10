# Stripe Payment Integration Setup Guide

## Overview
This guide will help you set up Stripe payment processing for the Driver's License Application system.

## Prerequisites
- Stripe account (sign up at https://stripe.com)
- Composer installed on your system
- Laravel application running

## Setup Steps

### 1. Install Stripe PHP Library (Laravel Backend)

Navigate to your Laravel project directory and run:
```bash
cd D:\xampp\htdocs\Laegan\dl
composer require stripe/stripe-php
```

### 2. Configure Laravel Environment Variables

Add these variables to your Laravel `.env` file (`D:\xampp\htdocs\Laegan\dl\.env`):

```env
# Stripe API Keys (Get these from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Frontend URL for Stripe redirect URLs
APP_FRONTEND_URL=http://localhost:3000
```

### 3. Configure Next.js Environment Variables

The `.env.local` file has been updated with:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
NEXT_PUBLIC_API_URL=http://localhost/Laegan/dl/public/api
```

**⚠️ IMPORTANT**: Replace `pk_test_YOUR_PUBLISHABLE_KEY_HERE` with your actual Stripe publishable key from the Stripe Dashboard.

### 4. Run Database Migration

Run the migration to add Stripe fields to the applications table:

```bash
cd D:\xampp\htdocs\Laegan\dl
php artisan migrate
```

This will add the following columns to the `applications` table:
- `stripe_session_id` - Stores Stripe checkout session ID
- `stripe_payment_intent` - Stores payment intent ID
- `payment_status` - Tracks payment status (pending/paid/failed)

### 5. Update Application Model (Optional)

If needed, add these fields to the `$fillable` array in `App\Models\Application.php`:

```php
protected $fillable = [
    // ... existing fields
    'stripe_session_id',
    'stripe_payment_intent',
    'payment_status',
];
```

### 6. Set Up Stripe Webhook (Production)

For production, you need to configure a webhook to receive payment notifications:

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret and add it to your `.env` file as `STRIPE_WEBHOOK_SECRET`

### 7. Test the Integration

#### Get Test Cards from Stripe:
- **Successful payment**: `4242 4242 4242 4242`
- **Declined payment**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVV, and any ZIP code.

#### Testing Flow:
1. Fill out the driver's license application form
2. Submit the application
3. On the checkout page, click "Pay with Stripe"
4. You'll be redirected to Stripe Checkout
5. Enter test card details
6. Complete payment
7. You'll be redirected to the success page

## Files Created/Modified

### Next.js Files:
- ✅ `d:\nextjs\cruds\app\checkout\page.tsx` - Updated with Stripe integration
- ✅ `d:\nextjs\cruds\app\success\page.tsx` - Payment success page
- ✅ `d:\nextjs\cruds\.env.local` - Environment variables

### Laravel Files:
- ✅ `D:\xampp\htdocs\Laegan\dl\app\Http\Controllers\StripeController.php` - Stripe payment controller
- ✅ `D:\xampp\htdocs\Laegan\dl\routes\api.php` - API routes updated
- ✅ `D:\xampp\htdocs\Laegan\dl\database\migrations\*_add_stripe_fields_to_applications_table.php` - Database migration

## API Endpoints

### POST `/api/create-checkout-session`
Creates a Stripe checkout session and returns the checkout URL.

**Request Body:**
```json
{
  "application_id": 1,
  "amount": 54.99,
  "idp_period": "1year",
  "email": "customer@example.com",
  "customer_name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "session_id": "cs_test_...",
  "checkout_url": "https://checkout.stripe.com/..."
}
```

### POST `/api/verify-payment`
Verifies payment after successful checkout.

**Request Body:**
```json
{
  "session_id": "cs_test_..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "application": { /* application data */ }
}
```

### POST `/api/stripe/webhook`
Handles Stripe webhook events (for production use).

## Troubleshooting

### "Failed to create checkout session"
- Check that `STRIPE_SECRET_KEY` is set correctly in Laravel `.env`
- Ensure the Stripe PHP library is installed: `composer require stripe/stripe-php`
- Check Laravel logs: `D:\xampp\htdocs\Laegan\dl\storage\logs\laravel.log`

### "Payment verification failed"
- Ensure the session ID is being passed correctly in the URL
- Check that the database migration ran successfully
- Verify the application record exists in the database

### Webhook not working
- In development, use Stripe CLI for webhook testing: https://stripe.com/docs/stripe-cli
- Ensure `STRIPE_WEBHOOK_SECRET` matches your webhook endpoint secret
- Check that the webhook URL is publicly accessible (use ngrok for local testing)

## Security Notes

⚠️ **IMPORTANT SECURITY REMINDERS:**

1. **Never commit API keys to version control**
   - Add `.env` and `.env.local` to `.gitignore`
   
2. **Use test keys in development**
   - Test keys start with `pk_test_` and `sk_test_`
   
3. **Use live keys only in production**
   - Live keys start with `pk_live_` and `sk_live_`
   
4. **Validate webhook signatures**
   - The webhook handler already validates signatures
   - Never skip signature validation in production

5. **Use HTTPS in production**
   - Stripe requires HTTPS for webhooks
   - Update `APP_FRONTEND_URL` to use HTTPS

## Next Steps

1. Get your Stripe API keys from https://dashboard.stripe.com/apikeys
2. Update both `.env` files with your actual keys
3. Install Stripe PHP library: `composer require stripe/stripe-php`
4. Run the database migration: `php artisan migrate`
5. Test with Stripe test cards
6. Set up webhooks for production deployment

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Dashboard: https://dashboard.stripe.com
- Test Cards: https://stripe.com/docs/testing

## Production Checklist

Before going live:
- [ ] Switch from test keys to live keys
- [ ] Set up live webhook endpoint
- [ ] Enable HTTPS on your domain
- [ ] Test with real cards (small amounts)
- [ ] Set up email notifications for customers
- [ ] Configure Stripe business settings
- [ ] Set up proper error logging and monitoring
