// API endpoint: /api/webhook
// Handles Stripe webhook events (payment success, etc.)
// Sends confirmation email to customer and booking details to admin
// Works with Vercel Serverless Functions

import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// Admin email is intentionally fixed as requested
const ADMIN_EMAIL = "project.codersh@gmail.com";
// FROM must be a verified / allowed sender in Resend (cannot be arbitrary user email)
const FROM_EMAIL = "onboarding@resend.dev";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Get raw body for webhook signature verification
  // In Vercel, req.body might be a buffer or string
  const body =
    typeof req.body === "string"
      ? req.body
      : Buffer.isBuffer(req.body)
        ? req.body.toString()
        : JSON.stringify(req.body);

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Retrieve the full session with metadata
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["customer", "payment_intent"],
      });

      const metadata = fullSession.metadata;

      // Parse primary guest + additional people from metadata
      const mainGuest = JSON.parse(metadata.mainGuest || "{}");
      const formEmail =
        (typeof mainGuest.email === "string" && mainGuest.email.trim()) || "";
      const stripeEmail =
        fullSession.customer_details?.email || fullSession.customer_email || "";
      const customerEmail = formEmail || stripeEmail;

      // Parse meal preferences from metadata
      const meals = JSON.parse(metadata.meals || "{}");
      const additionalGuestCount = parseInt(
        metadata.additionalGuestCount || "0",
        10,
      );
      const additionalCharges = parseFloat(metadata.additionalCharges || "0");
      const arrivalDate = metadata.arrivalDate || "";
      const endDate = metadata.endDate || "";
      const packageDurationDays = parseInt(
        metadata.packageDurationDays || "0",
        10,
      );
      const packageDurationNights = parseInt(
        metadata.packageDurationNights || "0",
        10,
      );

      // Prepare booking details
      const totalGuests =
        1 + (additionalGuestCount > 0 ? additionalGuestCount : 0);

      const bookingDetails = {
        packageName: metadata.packageName,
        packagePrice: metadata.packagePrice,
        packageId: metadata.packageId,
        customerEmail,
        paymentAmount: `$${(fullSession.amount_total / 100).toFixed(2)}`,
        paymentStatus: fullSession.payment_status,
        additionalRequests: metadata.additionalRequests || "None",
        meals: {
          breakfast: meals.breakfast || {},
          lunch: meals.lunch || {},
          dinner: meals.dinner || {},
        },
        mainGuest,
        additionalGuestCount,
        additionalCharges,
        arrivalDate,
        endDate,
        totalGuests,
        packageDurationDays,
        packageDurationNights,
      };

      // Send confirmation email to customer (only if we have an email)
      if (customerEmail) {
        await sendCustomerConfirmationEmail(customerEmail, bookingDetails);
      } else {
        console.warn(
          "Skipping customer confirmation email because no customer email was found for session:",
          session.id,
        );
      }

      // Send booking details to admin
      await sendAdminNotificationEmail(ADMIN_EMAIL, bookingDetails);

      console.log("Emails processed successfully for booking:", session.id);
    } catch (error) {
      console.error("Error processing webhook:", error);
      // Don't fail the webhook - log error but return 200
    }
  }

  res.status(200).json({ received: true });
}

// Customer confirmation email (simple thank-you with key details)
async function sendCustomerConfirmationEmail(customerEmail, bookingDetails) {
  const primaryName = bookingDetails.mainGuest?.name || "Guest";
  const totalGuests = bookingDetails.totalGuests || 1;

  try {
    console.log(
      "Sending customer confirmation email via Resend",
      JSON.stringify(
        {
          to: customerEmail,
          hasApiKey: !!process.env.RESEND_API_KEY,
        },
        null,
        2,
      ),
    );

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: customerEmail,
      reply_to: customerEmail,
      subject: "Thank you for your booking with LuxeDR",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #7d4d00; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .details { background-color: white; padding: 15px; margin: 10px 0; border-left: 4px solid #7d4d00; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmed</h1>
            </div>
            <div class="content">
              <p>Dear ${primaryName},</p>
              <p>Thank you for your booking with LuxeDR. We're delighted to host you.</p>
              
              <div class="details">
                <h2>Your Booking Summary</h2>
                <p><strong>Package:</strong> ${bookingDetails.packageName}</p>
                ${
                  bookingDetails.arrivalDate
                    ? `<p><strong>Arrival Date:</strong> ${bookingDetails.arrivalDate}</p>`
                    : ""
                }
                ${
                  bookingDetails.endDate
                    ? `<p><strong>End Date:</strong> ${bookingDetails.endDate}</p>`
                    : ""
                }
                ${
                  bookingDetails.packageDurationDays
                    ? `<p><strong>Duration:</strong> ${bookingDetails.packageDurationDays} day${bookingDetails.packageDurationDays !== 1 ? "s" : ""} & ${bookingDetails.packageDurationNights} night${bookingDetails.packageDurationNights !== 1 ? "s" : ""}</p>`
                    : ""
                }
                <p><strong>Total Guests:</strong> ${totalGuests}</p>
                <p><strong>Total Amount Paid:</strong> ${bookingDetails.paymentAmount}</p>
              </div>

              <p>We will contact you soon with any additional details or questions regarding your stay.</p>
              <p>If you need to update your booking or have any questions, simply reply to this email.</p>
            </div>
            <div class="footer">
              <p>Warm regards,<br>The LuxeDR Team</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Customer email sent via Resend:", result);
  } catch (error) {
    console.error("Error sending customer email via Resend:", {
      message: error?.message,
      name: error?.name,
      statusCode: error?.statusCode,
      stack: error?.stack,
      raw: error,
    });
    throw error;
  }
}

// Admin notification email
async function sendAdminNotificationEmail(adminEmail, bookingDetails) {
  const mealDetails = formatMealDetails(bookingDetails.meals);
  const guestDetails = formatPrimaryGuestDetails(
    bookingDetails.mainGuest,
    bookingDetails.additionalGuestCount,
    bookingDetails.additionalCharges,
  );

  try {
    console.log(
      "Sending admin notification email via Resend",
      JSON.stringify(
        {
          to: adminEmail,
          hasApiKey: !!process.env.RESEND_API_KEY,
        },
        null,
        2,
      ),
    );

    const result = await resend.emails.send({
      // Admin email remains fixed and predefined
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `New Booking: ${bookingDetails.packageName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #d32f2f; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .details { background-color: white; padding: 15px; margin: 10px 0; border-left: 4px solid #d32f2f; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Booking Received</h1>
            </div>
            <div class="content">
              <div class="details">
                <h2>Customer Information</h2>
                <p><strong>Email:</strong> ${bookingDetails.customerEmail}</p>
                <p><strong>Package:</strong> ${bookingDetails.packageName}</p>
                <p><strong>Package ID:</strong> ${bookingDetails.packageId}</p>
                <p><strong>Base Price:</strong> ${bookingDetails.packagePrice} USD</p>
                ${bookingDetails.arrivalDate ? `<p><strong>Arrival Date:</strong> ${bookingDetails.arrivalDate}</p>` : ""}
                ${bookingDetails.endDate ? `<p><strong>End Date:</strong> ${bookingDetails.endDate}</p>` : ""}
                ${
                  bookingDetails.packageDurationDays
                    ? `<p><strong>Duration:</strong> ${bookingDetails.packageDurationDays} day${bookingDetails.packageDurationDays !== 1 ? "s" : ""} & ${bookingDetails.packageDurationNights} night${bookingDetails.packageDurationNights !== 1 ? "s" : ""}</p>`
                    : ""
                }
                ${bookingDetails.additionalCharges > 0 ? `<p><strong>Additional Guest Charges:</strong> $${bookingDetails.additionalCharges.toFixed(2)} USD</p>` : ""}
                <p><strong>Total Payment Amount:</strong> ${bookingDetails.paymentAmount}</p>
                <p><strong>Payment Status:</strong> ${bookingDetails.paymentStatus}</p>
              </div>

              ${guestDetails}

              ${mealDetails}

              ${
                bookingDetails.additionalRequests &&
                bookingDetails.additionalRequests !== "None"
                  ? `
                <div class="details">
                  <h3>Additional Requests</h3>
                  <p>${bookingDetails.additionalRequests}</p>
                </div>
              `
                  : ""
              }
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin email sent via Resend:", result);
  } catch (error) {
    console.error("Error sending admin email via Resend:", {
      message: error?.message,
      name: error?.name,
      statusCode: error?.statusCode,
      stack: error?.stack,
      raw: error,
    });
    throw error;
  }
}

// Helper function to format meal details
function formatMealDetails(meals) {
  let html = '<div class="details"><h3>Meal Preferences</h3>';

  ["breakfast", "lunch", "dinner"].forEach((mealType) => {
    const meal = meals[mealType];
    if (meal) {
      html += `<p><strong>${mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</strong> `;
      if (meal.menu) {
        html += `${meal.menu}`;
      } else {
        html += "Not selected";
      }
      if (meal.customRequested && meal.customNotes) {
        html += `<br><em>Custom Request:</em> ${meal.customNotes}`;
      }
      html += "</p>";
    }
  });

  html += "</div>";
  return html;
}

// Helper function to format primary guest + additional people details
function formatPrimaryGuestDetails(
  mainGuest,
  additionalGuestCount,
  additionalCharges,
) {
  let html = '<div class="details"><h3>Guest Information</h3>';

  if (mainGuest) {
    html += "<p><strong>Primary Guest:</strong></p>";
    html += "<ul>";
    html += `<li><strong>Name:</strong> ${mainGuest.name || "N/A"}</li>`;
    html += `<li><strong>Age:</strong> ${mainGuest.age || "N/A"}</li>`;
    html += `<li><strong>Gender:</strong> ${
      mainGuest.gender
        ? mainGuest.gender.charAt(0).toUpperCase() + mainGuest.gender.slice(1)
        : "N/A"
    }</li>`;
    html += `<li><strong>Email:</strong> ${mainGuest.email || "N/A"}</li>`;
    html += `<li><strong>Phone:</strong> ${mainGuest.phone || "N/A"}</li>`;
    html += "</ul>";
  }

  html += `<p><strong>Additional People:</strong> ${additionalGuestCount || 0}</p>`;

  if (additionalGuestCount > 0 && additionalCharges > 0) {
    html += `<p><strong>Additional Guest Charges:</strong> $${additionalCharges.toFixed(
      2,
    )}</p>`;
  }

  html += "</div>";
  return html;
}
