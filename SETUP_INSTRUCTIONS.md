# Quick Setup Instructions

## 1. Install Dependencies

```bash
npm install stripe resend
```

## 2. Create Environment File

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

## 3. Get Your API Keys

### Stripe:
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy Publishable key and Secret key
3. Go to https://dashboard.stripe.com/test/webhooks
4. Create webhook endpoint: `https://yourdomain.com/api/webhook`
5. Select event: `checkout.session.completed`
6. Copy the webhook signing secret

### Resend:
1. Go to https://resend.com/api-keys
2. Create API key
3. Verify your email domain in Resend dashboard

## 4. Test Locally

For local testing, you'll need to use Stripe CLI to forward webhooks:

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:5173/api/webhook
```

This will give you a webhook secret starting with `whsec_` - use this in your `.env.local`.

## 5. Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Testing

Use Stripe test card: `4242 4242 4242 4242`
- Expiry: Any future date (12/34)
- CVC: Any 3 digits (123)
