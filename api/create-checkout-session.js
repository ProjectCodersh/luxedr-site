// API endpoint: /api/create-checkout-session
// Creates a Stripe Checkout Session and returns sessionId
// Works with Vercel Serverless Functions

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Get base URL
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }
  return "http://localhost:5173";
}

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { packageId, packageName, packagePrice, meals, additionalRequests } =
      req.body;

    // Validate required fields
    if (!packageId || !packageName || !packagePrice) {
      return res
        .status(400)
        .json({ error: "Missing required booking information" });
    }

    // Extract numeric price from string like "$1,660"
    const priceAmount = parseFloat(packagePrice.replace(/[^0-9.]/g, "")) * 100; // Convert to cents

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: packageName,
              description: `Package booking with meal preferences`,
            },
            unit_amount: priceAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${getBaseUrl()}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getBaseUrl()}/booking?package=${packageId}`,
      metadata: {
        packageId,
        packageName,
        packagePrice,
        meals: JSON.stringify(meals),
        additionalRequests: additionalRequests || "",
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to create checkout session" });
  }
}
