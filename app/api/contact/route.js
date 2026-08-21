import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input to prevent injection attacks
// Removes newlines (\r, \n) and angle brackets (< >)
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  return input
    .replace(/[\r\n]/g, ' ')  // Remove newlines (CRLF injection prevention)
    .replace(/[<>]/g, '')      // Remove angle brackets
    .trim();
}

// Escape HTML entities to prevent XSS in email clients
// Escapes &, <, >, ", '
function escapeHtml(text) {
  if (typeof text !== 'string') {
    return '';
  }
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Validate request payload
function validatePayload(data) {
  const errors = [];
  
  const trimmedName = data.name?.trim() || '';
  if (!trimmedName || trimmedName.length < 1 || trimmedName.length > 100) {
    errors.push('Name must be between 1 and 100 characters');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Invalid email address');
  }
  
  const trimmedMessage = data.message?.trim() || '';
  if (!trimmedMessage || trimmedMessage.length < 1 || trimmedMessage.length > 500) {
    errors.push('Message must be between 1 and 500 characters');
  }
  
  return errors;
}

export async function POST(request) {
  try {
    const payload = await request.json();
    
    // Validate payload
    const validationErrors = validatePayload(payload);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: validationErrors 
        },
        { status: 400 }
      );
    }
    
    // Sanitize all user inputs to prevent injection attacks
    const sanitizedName = sanitizeInput(payload.name);
    const sanitizedEmail = sanitizeInput(payload.email);
    const sanitizedMessage = sanitizeInput(payload.message);
    
    // Escape HTML entities for safe display in emails
    const escapedName = escapeHtml(sanitizedName);
    const escapedEmail = escapeHtml(sanitizedEmail);
    const escapedMessage = escapeHtml(sanitizedMessage);
    
    // SMTP Configuration - read from environment variables (server-side only)
    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465', 10),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };
    
    // Validate required SMTP credentials
    const requiredCredentials = {
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      SMTP_TO: process.env.SMTP_TO,
    };
    
    const missingCredentials = Object.entries(requiredCredentials)
      .filter(([key, value]) => !value)
      .map(([key]) => key);
    
    if (missingCredentials.length > 0) {
      console.error('Missing SMTP credentials:', missingCredentials);
      return NextResponse.json(
        {
          success: false,
          message: 'Email service is not configured. Please contact the site administrator.',
          error: `Missing required environment variables: ${missingCredentials.join(', ')}`,
        },
        { status: 500 }
      );
    }
    
    // Create Nodemailer transporter with Gmail SMTP settings
    const transporter = nodemailer.createTransport(smtpConfig);
    
    // Task 3.2: Create owner mail options with HTML email template
    const ownerMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO,
      subject: `New Contact Form Submission from ${escapedName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .header h2 { margin: 0; color: #2c3e50; }
            .content { background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #555; }
            .field-value { margin-top: 5px; padding: 10px; background-color: #f9f9f9; border-left: 3px solid #3498db; }
            .message-box { margin-top: 10px; padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 3px; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">From:</div>
                <div class="field-value">${escapedName}</div>
              </div>
              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value"><a href="mailto:${escapedEmail}">${escapedEmail}</a></div>
              </div>
              <div class="field">
                <div class="field-label">Message:</div>
                <div class="message-box">${escapedMessage}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo: sanitizedEmail,
    };
    
    // Task 3.3: Create user mail options with HTML email template
    const userMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: sanitizedEmail,
      subject: 'Thanks for reaching out!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3498db; color: white; padding: 30px 20px; border-radius: 5px; margin-bottom: 20px; text-align: center; }
            .header h2 { margin: 0; font-size: 24px; }
            .content { background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .content p { margin: 10px 0; }
            .highlight { background-color: #f4f4f4; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>✓ Message Received</h2>
            </div>
            <div class="content">
              <p>Hi ${escapedName},</p>
              <p>Thank you for reaching out! I've received your message and I'll get back to you as soon as possible.</p>
              <div class="highlight">
                <strong>Your message:</strong><br>
                <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${escapedMessage}</p>
              </div>
              <p>I typically respond within 24-48 hours. If your inquiry is urgent, feel free to send a follow-up email.</p>
              <p>Best regards,<br>Saad Raja</p>
            </div>
            <div class="footer">
              This is an automated confirmation email. Please do not reply directly to this message.
            </div>
          </div>
        </body>
        </html>
      `,
    };
    
    // Task 3.4 & 3.5: Send both emails with error handling
    try {
      // Send owner notification email
      await transporter.sendMail(ownerMailOptions);
      
      // Send user confirmation email
      await transporter.sendMail(userMailOptions);
      
      // Return success response when both emails send successfully
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      }, { status: 200 });
      
    } catch (emailError) {
      // Log SMTP errors securely without exposing credentials
      console.error('SMTP error during email sending:', {
        message: emailError.message,
        code: emailError.code,
        // Do not log credentials or sensitive config details
      });
      
      // Return user-friendly error message without internal details
      return NextResponse.json({
        success: false,
        message: "Failed to send message. Please try again later.",
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({
      message: "Message sending failed!",
      success: false,
    }, { status: 500 });
  }
};