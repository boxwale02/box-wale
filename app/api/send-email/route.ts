// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("📧 Email API called with:", body);

    // Extract name from multiple possible field names
    const name = body.fullName || body.name || "";
    const email = body.email || "";
    const whatsappNumber = body.whatsappNumber || body.phoneNumber || "";
    const productType = body.productType || "";
    const message = body.message || "";

    // Validate required fields
    if (!email) {
      console.error("❌ Email is required but not provided");
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!name) {
      console.error("❌ Name is required but not provided");
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const emailFrom = process.env.EMAIL_FROM;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailFrom || !emailPass) {
      console.error("❌ Missing email configuration");
      return NextResponse.json(
        { error: "Email configuration error" },
        { status: 500 }
      );
    }

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailFrom,
        pass: emailPass,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP connection verified");

    const mailOptions = {
      from: `"Box Wale" <${emailFrom}>`,
      to: email,
      subject: "We Received Your Quote Request",
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7fc;">

      <!-- Main Container -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fc; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #d97706, #f59e0b); padding: 35px 40px 25px; text-align: center;">
                  <h2 style="margin:0;color:#ffffff;font-size:22px;">
Quote Request Confirmation
</h2>

<p style="margin-top:8px;color:#f3f4f6;font-size:14px;">
Your request has been received.
</p>
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding: 35px 40px 25px;">

                  <!-- Greeting -->
                  <p style="font-size:16px; color:#1f2937; margin:0 0 6px;">
                    Hi <strong style="color:#d97706;">${name}</strong>,
                  </p>
                  <p style="font-size:15px; color:#4b5563; margin:0 0 20px; line-height:1.6;">
                    Thank you for contacting Box Wale.

This email confirms that we have received your quote request. Our team will review the information you submitted and contact you if any additional details are required.
                  </p>

                  <!-- Submitted Information -->
                  <h3 style="color:#d97706; font-size:16px; margin:0 0 14px; border-bottom:2px solid #f59e0b; padding-bottom:8px;">Submitted Information</h3>
                  <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom:24px; background:#fafafa; border-radius:8px; border:1px solid #e5e7eb;">
                    <tr>
                      <td width="35%" style="font-weight:600; color:#555;">Product Type</td>
                      <td width="65%" style="color:#1f2937; font-weight:500;">${productType}</td>
                    </tr>
                   ${body.width && body.height && body.length ? `
<tr>
  <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">
    Dimensions
  </td>
  <td style="color:#1f2937; border-top:1px solid #e5e7eb;">
    ${body.width} × ${body.height} × ${body.length} cm
  </td>
</tr>
` : ""}
                  ${body.quantity ? `
<tr>
  <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">
    Quantity
  </td>
  <td style="color:#1f2937; border-top:1px solid #e5e7eb;">
    <strong>${body.quantity}</strong> units
  </td>
</tr>
` : ""}
                  ${body.totalCost ? `
<tr>
  <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">
    Approximate Cost
  </td>
  <td style="color:#d97706; border-top:1px solid #e5e7eb; font-size:17px; font-weight:600;">
    ₹${body.totalCost}
  </td>
</tr>
` : ""}
                    <tr>
                      <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">Contact Email</td>
                      <td style="color:#1f2937; border-top:1px solid #e5e7eb;">${email}</td>
                    </tr>
                    <tr>
                      <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">WhatsApp</td>
                      <td style="color:#1f2937; border-top:1px solid #e5e7eb;">${whatsappNumber || "<span style='color:#9ca3af;'>Not provided</span>"}</td>
                    </tr>
                    ${message ? `
                    <tr>
                      <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">Your Message</td>
                      <td style="color:#1f2937; border-top:1px solid #e5e7eb; font-style:italic;">"${message}"</td>
                    </tr>
                    ` : ''}
                  </table>

                  <!-- Contact Info -->
                  <div style="background:#fef3c7; border-radius:8px; padding:16px 20px; margin-bottom:24px; border:1px solid #fcd34d;">
                    <p style="margin:0; font-size:14px; color:#92400e; text-align:center;">
                      Our team will review your request and respond as soon as possible.
                    </p>
                  </div>

                  <!-- Footer -->
                  <hr style="border:none; border-top:1px solid #e5e7eb; margin:20px 0 16px;" />

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="text-align:center;">
                        <p style="margin:0; font-size:12px; color:#9ca3af;">
                          <strong>Box Wale</strong><br>
                          <span style="font-size:11px;">
                            boxwale02@gmail.com &nbsp;|&nbsp; 8209293782 &nbsp;|&nbsp; www.boxwale.com
                          </span>
                        </p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>

    </body>
    </html>
  `,
    };

    const adminMailOptions = {
      from: `"Box Wale Website" <${emailFrom}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `📦 New Quote Request - ${productType} | ${name}`,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7fc;">

      <!-- Main Container -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fc; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="650" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #d97706, #f59e0b); padding: 30px 40px; text-align: center;">
                  <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:700; letter-spacing:1px;">📦 New Quote Request</h1>
                  <p style="margin:8px 0 0; color:#fef3c7; font-size:15px;">A new lead has been generated from Box Wale website</p>
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding: 35px 40px 25px;">

                  <!-- Greeting -->
                  <p style="font-size:16px; color:#333; margin:0 0 20px;">
                    <strong style="color:#d97706;">Hello Team,</strong><br>
                    A new quote request has been submitted. Please find the details below.
                  </p>

                  <!-- Customer Details Section -->
                  <h3 style="color:#d97706; font-size:17px; margin:0 0 12px; border-bottom:2px solid #f59e0b; padding-bottom:6px;">👤 Customer Details</h3>
                  <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom:24px; background:#fafafa; border-radius:8px; border:1px solid #e5e7eb;">
                    <tr>
                      <td width="35%" style="font-weight:600; color:#555;">Full Name</td>
                      <td width="65%" style="color:#1f2937;">${name}</td>
                    </tr>
                    <tr>
                      <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">Company</td>
                      <td style="color:#1f2937; border-top:1px solid #e5e7eb;">${body.company || "<span style='color:#9ca3af;'>Not Provided</span>"}</td>
                    </tr>
                    <tr>
                      <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">Email Address</td>
                      <td style="color:#1f2937; border-top:1px solid #e5e7eb;"><a href="mailto:${email}" style="color:#d97706; text-decoration:none;">${email}</a></td>
                    </tr>
                    <tr>
                      <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">Phone / WhatsApp</td>
                      <td style="color:#1f2937; border-top:1px solid #e5e7eb;"><a href="tel:${whatsappNumber}" style="color:#d97706; text-decoration:none;">${whatsappNumber}</a></td>
                    </tr>
                  </table>

                  <!-- Product Details Section -->
                  <h3 style="color:#d97706; font-size:17px; margin:0 0 12px; border-bottom:2px solid #f59e0b; padding-bottom:6px;">📐 Product Details</h3>
                  <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom:24px; background:#fafafa; border-radius:8px; border:1px solid #e5e7eb;">
                    <tr>
                      <td width="40%" style="font-weight:600; color:#555;">Product Type</td>
                      <td width="60%" style="color:#1f2937; font-weight:500;">${productType}</td>
                    </tr>
                  
                    ${body.width && body.height && body.length ? `
<tr>
  <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">Dimensions</td>
  <td style="color:#1f2937; border-top:1px solid #e5e7eb;">
    ${body.width} × ${body.height} × ${body.length} cm
  </td>
</tr>
` : ""}
                
                    ${body.quantity ? `
<tr>
  <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">Quantity</td>
  <td style="color:#1f2937; border-top:1px solid #e5e7eb;">
    <strong>${body.quantity}</strong> units
  </td>
</tr>
` : ""}
                  

${body.estimatedPrice ? `
<tr>
  <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">
    Estimated Price / Unit
  </td>
  <td style="color:#d97706; border-top:1px solid #e5e7eb; font-size:17px; font-weight:600;">
    ₹${body.estimatedPrice}
  </td>
</tr>
` : ""}                    <tr>
                
                    ${body.totalCost ? `
<tr>
  <td style="font-weight:600; color:#555; border-top:1px solid #e5e7eb;">Approximate Cost</td>
  <td style="color:#d97706; border-top:1px solid #e5e7eb; font-weight:600;">
    ₹${body.totalCost}
  </td>
</tr>
` : ""}
                  </table>

                  <!-- Customer Message Section -->
                  <h3 style="color:#d97706; font-size:17px; margin:0 0 12px; border-bottom:2px solid #f59e0b; padding-bottom:6px;">💬 Customer Message</h3>
                  <div style="background:#f9fafb; border-left:4px solid #f59e0b; padding:16px 20px; margin-bottom:24px; border-radius:4px; color:#374151; font-style:italic; min-height:40px;">
                    ${message ? `<p style="margin:0; font-style:normal;">${message}</p>` : "<span style='color:#9ca3af;'>No additional message provided</span>"}
                  </div>

                  <!-- Quick Action Buttons -->
                  <div style="background:#f3f4f6; border-radius:8px; padding:16px 20px; margin-bottom:20px; text-align:center;">
                    <p style="margin:0 0 12px; font-size:14px; color:#6b7280; font-weight:500;">📌 Quick Actions</p>
                    <div style="display:inline-block; margin:0 6px;">
                      <a href="mailto:${email}?subject=Re: Quote Request - ${productType}" style="display:inline-block; background:#d97706; color:#ffffff; padding:8px 18px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:600; margin:4px;">Reply via Email</a>
                    </div>
                    <div style="display:inline-block; margin:0 6px;">
                      <a href="https://wa.me/${whatsappNumber}?text=Hi%20${encodeURIComponent(name)}%2C%20Thank%20you%20for%20your%20quote%20request." style="display:inline-block; background:#25D366; color:#ffffff; padding:8px 18px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:600; margin:4px;">Chat on WhatsApp</a>
                    </div>
                  </div>

                  <!-- Footer Note -->
                  <p style="font-size:12px; color:#9ca3af; border-top:1px solid #e5e7eb; padding-top:16px; margin:0; text-align:center;">
                    ⚡ This lead was automatically generated from the <strong>Box Wale</strong> website.<br>
                    Sent on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </p>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f9fafb; padding:16px 40px; text-align:center; border-top:1px solid #e5e7eb;">
                  <p style="margin:0; font-size:12px; color:#9ca3af;">
                    &copy; ${new Date().getFullYear()} Box Wale. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>

    </body>
    </html>
  `,
    };
    try {
      const info = await transporter.sendMail(adminMailOptions);
      console.log("Admin Email Sent:", info.messageId);
    } catch (err) {
      console.error("Admin Email Error:", err);
    }
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");

    return NextResponse.json(
      {
        success: true,
        message: "Quote request submitted successfully"
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}