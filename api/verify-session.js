// API endpoint: /api/verify-session
// Verifies a Stripe Checkout Session was successful
// Works with Vercel Serverless Functions

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      return res.status(200).json({
        success: true,
        session: {
          id: session.id,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
        },
      });
    } else {
      return res.status(400).json({
        error: "Payment not completed",
        payment_status: session.payment_status,
      });
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    return res.status(500).json({ error: "Failed to verify session" });
  }
}
