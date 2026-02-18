// API endpoint: /api/create-checkout-session
// Creates a Stripe Checkout Session and returns sessionId
// Works with Vercel Serverless Functions

import Stripe from "stripe";

// Lazy Stripe client initialization so we can surface clear errors
let stripe;
function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "Stripe secret key is not configured on the server. Please set STRIPE_SECRET_KEY in your Vercel environment variables."
    );
  }

  if (!stripe) {
    stripe = new Stripe(secretKey);
  }

  return stripe;
}

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
    const {
      packageId,
      packageName,
      packagePrice,
      meals,
      additionalRequests,
      mainGuest,
      additionalGuestCount = 0,
      additionalCharges = 0,
      totalPrice = 0,
    } = req.body;

    // Validate required fields
    if (!packageId || !packageName || !packagePrice) {
      return res
        .status(400)
        .json({ error: "Missing required booking information" });
    }

    // Extract numeric price from string like "$1,660"
    const packagePriceAmount = parseFloat(packagePrice.replace(/[^0-9.]/g, "")) * 100; // Convert to cents
    const additionalChargesAmount = Math.round(additionalCharges * 100); // Convert to cents

    // Create Stripe Checkout Session
    const stripeClient = getStripeClient();

    // Build line items array
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: packageName,
            description: `Package booking with meal preferences`,
          },
          unit_amount: packagePriceAmount,
        },
        quantity: 1,
      },
    ];

    // Add line item for additional guests if any
    if (additionalGuestCount > 0 && additionalChargesAmount > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Additional Guests (${additionalGuestCount} guest${additionalGuestCount !== 1 ? "s" : ""})`,
            description: `Additional guest charge: $${additionalCharges} for ${additionalGuestCount} guest${additionalGuestCount !== 1 ? "s" : ""}`,
          },
          unit_amount: additionalChargesAmount,
        },
        quantity: 1,
      });
    }

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${getBaseUrl()}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getBaseUrl()}/booking?package=${packageId}`,
      metadata: {
        packageId,
        packageName,
        packagePrice,
        meals: JSON.stringify(meals),
        additionalRequests: additionalRequests || "",
        mainGuest: JSON.stringify(mainGuest || {}),
        additionalGuestCount: additionalGuestCount.toString(),
        additionalCharges: additionalCharges.toString(),
        totalPrice: totalPrice.toString(),
      },
    });

    // Return both session ID and URL (for direct redirect)
    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to create checkout session" });
  }
}
