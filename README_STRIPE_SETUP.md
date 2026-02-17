# Stripe Payment Integration Setup Guide

This guide will help you set up Stripe Checkout with email notifications using Resend.

## Prerequisites

1. Stripe account (https://stripe.com)
2. Resend account (https://resend.com)
3. Node.js 18+ installed

## Step 1: Install Dependencies

```bash
npm install stripe resend
```

## Step 2: Get Your Stripe Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

## Step 3: Set Up Stripe Webhook

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **Add endpoint**
3. Set endpoint URL to: `https://yourdomain.com/api/webhook`
4. Select event: `checkout.session.completed`
5. Copy the **Signing secret** (starts with `whsec_`)

## Step 4: Get Resend API Key

1. Go to https://resend.com/api-keys
2. Create a new API key
3. Copy the API key (starts with `re_`)

## Step 5: Configure Environment Variables

### For Local Development (.env.local)

Create a `.env.local` file in the root directory:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
RESEND_API_KEY=re_your_key_here
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
BASE_URL=http://localhost:5173
```

### For Production (Vercel)

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the following variables:
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`
   - `FROM_EMAIL`
   - `ADMIN_EMAIL`
   - `BASE_URL` (your production domain)

## Step 6: Update API Endpoints for Your Hosting Platform

### Option A: Vercel (Recommended)

The `vercel.json` file is already configured. Just deploy to Vercel:

```bash
vercel deploy
```

### Option B: Netlify Functions

If using Netlify, move the API files to `netlify/functions/`:

```bash
mkdir -p netlify/functions
mv api/*.js netlify/functions/
```

Then update the function exports to use Netlify's handler format.

### Option C: Custom Backend

If you have a separate backend, update the API URLs in `Booking.jsx`:

```javascript
const response = await fetch("https://your-backend.com/api/create-checkout-session", {
  // ...
});
```

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/booking` page
3. Fill out the booking form
4. Click "Book" - you'll be redirected to Stripe Checkout
5. Use Stripe test card: `4242 4242 4242 4242`
6. Complete the payment
7. Check your email for confirmation

## Testing with Stripe Test Cards

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)

## Troubleshooting

### Emails not sending
- Verify Resend API key is correct
- Check `FROM_EMAIL` domain is verified in Resend
- Check Resend dashboard for email logs

### Webhook not working
- Verify webhook URL is accessible
- Check webhook secret matches Stripe dashboard
- View webhook logs in Stripe dashboard

### Payment not processing
- Verify Stripe keys are correct
- Check browser console for errors
- Verify API endpoints are accessible

## Production Checklist

- [ ] Switch to Stripe live keys (`pk_live_` and `sk_live_`)
- [ ] Update webhook endpoint to production URL
- [ ] Verify email domain in Resend
- [ ] Test complete booking flow
- [ ] Set up monitoring/alerts for failed payments
- [ ] Configure proper error handling

## Support

For issues with:
- **Stripe**: https://support.stripe.com
- **Resend**: https://resend.com/support
- **Vercel**: https://vercel.com/support
