# Design: EmailJS to SMTP Migration

## Overview

This design describes the migration from client-side EmailJS to server-side SMTP using Nodemailer with Gmail. The implementation moves email sending logic to a secure Next.js API route, removes client-side email dependencies, and maintains the existing user experience while improving security.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Side                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         ContactForm Component                       │    │
│  │  - Form state management                            │    │
│  │  - Client-side validation                           │    │
│  │  - Toast notifications                              │    │
│  └────────────────┬───────────────────────────────────┘    │
│                   │                                          │
│                   │ POST /api/contact                        │
│                   │ { name, email, message }                 │
│                   ↓                                          │
└─────────────────────────────────────────────────────────────┘
                    │
                    │ HTTPS (JSON)
                    │
┌───────────────────┴─────────────────────────────────────────┐
│                         Server Side                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │      /api/contact Route Handler (MODIFIED)          │    │
│  │  1. Validate request method (POST only)             │    │
│  │  2. Parse and validate JSON payload                 │    │
│  │  3. Sanitize inputs (prevent injection)             │    │
│  │  4. Create email transport (Nodemailer)             │    │
│  │  5. Send HTML email to site owner                   │    │
│  │  6. Send HTML confirmation to form submitter        │    │
│  │  7. Return response (success/error)                 │    │
│  └────────────────┬───────────────────────────────────┘    │
│                   │                                          │
│                   │ Environment Variables                    │
│                   │ (server-side only)                       │
│  ┌────────────────┴───────────────────────────────────┐    │
│  │      SMTP Configuration                             │    │
│  │  - SMTP_HOST: smtp.gmail.com                        │    │
│  │  - SMTP_PORT: 465 or 587                            │    │
│  │  - SMTP_USER: Gmail address                         │    │
│  │  - SMTP_PASS: App password or OAuth2                │    │
│  │  - SMTP_FROM: Sender address                        │    │
│  │  - SMTP_TO: Site owner address                      │    │
│  └────────────────┬───────────────────────────────────┘    │
│                   │                                          │
│                   │ SMTP Protocol (TLS/SSL)                  │
│                   ↓                                          │
└─────────────────────────────────────────────────────────────┘
                    │
                    ├──────────────────┬─────────────────┐
                    ↓                  ↓                 ↓
         ┌──────────────────┐  ┌──────────────────┐   │
         │ Gmail SMTP Server │  │  HTML Email to   │   │
         │  smtp.gmail.com   │  │   Site Owner     │   │
         │  Port 465/587     │  │  (SMTP_TO env)   │   │
         └──────────────────┘  └──────────────────┘   │
                                                       │
                                        ┌──────────────┴────────┐
                                        │  HTML Email to User   │
                                        │ (Form email address)  │
                                        │ (Confirmation)        │
                                        └───────────────────────┘
```

### Component Breakdown

#### 1. ContactForm Component (Client)

**Location:** `app/components/homepage/contact/contactForm.jsx`

**Responsibilities:**
- Render contact form UI
- Manage form state (name, email, message)
- Perform client-side validation
- Submit form data to API endpoint
- Display loading states and feedback notifications
- Clear form on success, preserve on failure

**Key Changes:**
- Remove EmailJS import and related code
- Replace `emailjs.send()` with `fetch()` to API endpoint
- Remove EmailJS environment variable references
- Keep all existing validation and UI logic

#### 2. Email API Route (Server)

**Location:** `app/api/contact/route.js` (EXISTING FILE - WILL BE MODIFIED)

**Responsibilities:**
- Replace existing Telegram notification code with email functionality
- Accept POST requests with contact form data
- Validate request payload structure and content
- Sanitize inputs to prevent injection attacks
- Configure Nodemailer SMTP transport
- Send HTML email to site owner (SMTP_TO environment variable)
- Send HTML confirmation email to form submitter (from form input)
- Handle errors and provide appropriate responses
- Log errors for debugging (without exposing credentials)

**Key Features:**
- Server-side only (credentials never exposed)
- Proper HTTP status codes (200, 400, 500)
- Descriptive error messages for clients
- Email address validation
- Input sanitization
- HTML email templates for both recipient types
- Dual recipient sending (owner + submitter)

#### 3. Email Service Module (Server)

**Location:** `lib/email.js` (new file, optional but recommended)

**Responsibilities:**
- Create and configure Nodemailer transporter
- Validate SMTP configuration
- Format email content
- Provide reusable email sending function
- Handle SMTP connection errors

**Benefits:**
- Separation of concerns
- Testability
- Reusability for future email needs
- Centralized configuration

## Data Models

### Request Payload

```javascript
{
  "name": string,     // Required, 1-100 characters
  "email": string,    // Required, valid email format
  "message": string   // Required, 1-500 characters
}
```

### Success Response

```javascript
{
  "success": true,
  "message": "Message sent successfully!"
}
```

### Error Response

```javascript
{
  "success": false,
  "message": string,  // User-friendly error description
  "error": string     // Optional: specific error type
}
```

### Email Configuration

```javascript
{
  host: "smtp.gmail.com",
  port: 465,              // or 587 for TLS
  secure: true,           // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}
```

### HTML Email Templates

#### Owner Notification Email Template

```javascript
{
  from: process.env.SMTP_FROM,
  to: process.env.SMTP_TO,
  subject: `New Contact Form Submission from ${name}`,
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
            <div class="field-value">${name}</div>
          </div>
          <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value"><a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="field">
            <div class="field-label">Message:</div>
            <div class="message-box">${message}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  replyTo: email
}
```

#### User Confirmation Email Template

```javascript
{
  from: process.env.SMTP_FROM,
  to: email, // Form submitter's email
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
          <p>Hi ${name},</p>
          <p>Thank you for reaching out! I've received your message and I'll get back to you as soon as possible.</p>
          <div class="highlight">
            <strong>Your message:</strong><br>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
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
  `
}
```

## Implementation Details

### 1. Environment Variables

**New Server-Side Variables:**

```bash
# Gmail SMTP Configuration (server-side only - no NEXT_PUBLIC_ prefix)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
SMTP_TO=recipient@example.com
```

**Removed Variables:**

```bash
# These will be removed
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

### 2. Email API Route Implementation

```javascript
// app/api/contact/route.js (MODIFIED EXISTING FILE)
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input to prevent injection
function sanitizeInput(input) {
  return input
    .replace(/[\r\n]/g, ' ')  // Remove newlines
    .replace(/[<>]/g, '')      // Remove angle brackets
    .trim();
}

// Escape HTML for safe display in email
function escapeHtml(text) {
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
  
  if (!data.name || data.name.length < 1 || data.name.length > 100) {
    errors.push('Name must be between 1 and 100 characters');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Invalid email address');
  }
  
  if (!data.message || data.message.length < 1 || data.message.length > 500) {
    errors.push('Message must be between 1 and 500 characters');
  }
  
  return errors;
}

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate payload
    const validationErrors = validatePayload(body);
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
    
    // Sanitize inputs
    const name = sanitizeInput(body.name);
    const email = sanitizeInput(body.email);
    const message = sanitizeInput(body.message);
    
    // Escape for HTML
    const nameSafe = escapeHtml(name);
    const emailSafe = escapeHtml(email);
    const messageSafe = escapeHtml(message);
    
    // Verify SMTP configuration
    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };
    
    // Check for missing configuration
    if (!smtpConfig.auth.user || !smtpConfig.auth.pass || !process.env.SMTP_TO) {
      console.error('SMTP configuration missing');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service is not configured' 
        },
        { status: 500 }
      );
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport(smtpConfig);
    
    // Owner notification email with HTML template
    const ownerMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO,
      subject: `New Contact Form Submission from ${nameSafe}`,
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
                <div class="field-value">${nameSafe}</div>
              </div>
              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value"><a href="mailto:${emailSafe}">${emailSafe}</a></div>
              </div>
              <div class="field">
                <div class="field-label">Message:</div>
                <div class="message-box">${messageSafe}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo: email,
    };
    
    // User confirmation email with HTML template
    const userMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
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
              <p>Hi ${nameSafe},</p>
              <p>Thank you for reaching out! I've received your message and I'll get back to you as soon as possible.</p>
              <div class="highlight">
                <strong>Your message:</strong><br>
                <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${messageSafe}</p>
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
    
    // Send both emails
    try {
      await transporter.sendMail(ownerMailOptions);
      await transporter.sendMail(userMailOptions);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      throw emailError;
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Email sending error:', error);
    
    // Return user-friendly error without exposing internals
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle non-POST requests
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
```

### 3. Updated ContactForm Component

```javascript
// app/components/homepage/contact/contactForm.jsx
"use client";

import { isValidEmail } from '@/utils/check-email';
import { useState, useTransition } from 'react';
import { TbMailForward } from "react-icons/tb";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isPending, startTransition] = useTransition();
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    message: '',
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userInput.name,
            email: userInput.email,
            message: userInput.message,
          }),
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          toast.success(data.message || 'Message sent successfully!');
          // Clear form on success
          setUserInput({
            name: '',
            email: '',
            message: '',
          });
        } else {
          toast.error(data.message || 'Failed to send message');
        }
      } catch (err) {
        console.error('Send error:', err);
        toast.error('Failed to send message. Please try again.');
      }
    });
  };

  // ... rest of the JSX remains the same
}

export default ContactForm;
```

### 4. Optional Email Service Module

```javascript
// lib/email.js
import nodemailer from 'nodemailer';

let transporter = null;

export function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendContactEmail({ name, email, message }) {
  const transporter = getTransporter();
  
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.SMTP_TO,
    subject: `Contact Form Submission from ${name}`,
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `.trim(),
    replyTo: email,
  };
  
  return await transporter.sendMail(mailOptions);
}
```

## Security Considerations

### 1. Credential Protection

- **Server-side only:** All SMTP credentials stored in server-side environment variables
- **No client exposure:** Variables without `NEXT_PUBLIC_` prefix are never sent to client
- **No logging:** Credentials never logged or exposed in error messages
- **Build-time safety:** Credentials not included in client-side bundles

### 2. Input Sanitization

- **Newline removal:** Prevents email header injection via CRLF sequences
- **HTML escaping:** Removes angle brackets to prevent XSS in email clients
- **Length limits:** Enforces maximum lengths to prevent DoS via large payloads
- **Email validation:** Validates email format before sending

### 3. Rate Limiting Considerations

While not implemented in the initial version, consider adding:
- IP-based rate limiting to prevent spam
- CAPTCHA integration for additional protection
- Request throttling using Next.js middleware

### 4. Error Handling

- **Generic errors to clients:** Don't expose internal details in error messages
- **Detailed server logs:** Log full error details for debugging
- **Credential redaction:** Ensure logs don't contain credentials

## Error Handling

### Error Categories

1. **Validation Errors (400)**
   - Missing required fields
   - Invalid email format
   - Field length violations
   - Return: Descriptive validation errors

2. **Configuration Errors (500)**
   - Missing SMTP credentials
   - Invalid SMTP configuration
   - Return: Generic "service unavailable" message

3. **SMTP Errors (500)**
   - Connection failures
   - Authentication failures
   - Send failures
   - Timeout errors
   - Return: Generic "failed to send" message

4. **Network Errors (500)**
   - Request parsing failures
   - Unexpected exceptions
   - Return: Generic error message

### Error Response Format

```javascript
// Validation error
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Name must be between 1 and 100 characters"]
}

// Server error
{
  "success": false,
  "message": "Failed to send message. Please try again later."
}
```

## Testing Strategy

### Unit Tests

1. **Input Validation**
   - Test email validation function with valid/invalid emails
   - Test field length validation
   - Test required field validation

2. **Input Sanitization**
   - Test newline removal
   - Test special character handling
   - Test trim functionality

3. **Error Handling**
   - Test validation error responses
   - Test missing configuration handling
   - Test SMTP error handling

### Integration Tests

1. **API Route Tests**
   - Test successful email sending (with mocked SMTP)
   - Test validation error responses
   - Test method restrictions (POST only)
   - Test malformed JSON handling

2. **Form Submission Tests**
   - Test successful submission flow
   - Test form clearing on success
   - Test form preservation on failure
   - Test toast notifications

### Property-Based Tests

Property-based tests will verify universal properties across randomly generated inputs:

1. **Email Content Preservation**
   - Generate random valid form data
   - Verify all fields appear in email content

2. **Credential Security**
   - Generate random requests
   - Verify no response contains credentials

3. **Input Sanitization**
   - Generate inputs with injection patterns
   - Verify all inputs are properly sanitized

4. **Validation Consistency**
   - Generate invalid payloads
   - Verify validation catches all violations

### Manual Testing Checklist

- [ ] Submit form with valid data - both owner and user emails received
- [ ] Verify owner email contains all form fields in HTML format
- [ ] Verify user confirmation email has HTML formatting and confirmation message
- [ ] Submit form with invalid email - validation error shown
- [ ] Submit form with empty fields - validation error shown
- [ ] Submit form with very long inputs - handled correctly
- [ ] Verify EmailJS references removed from codebase
- [ ] Verify Telegram code completely removed from `/api/contact/route.js`
- [ ] Verify axios not in package.json (unless needed elsewhere)
- [ ] Verify EmailJS not in package.json
- [ ] Verify EmailJS not in client bundle
- [ ] Verify SMTP credentials not exposed in network tab
- [ ] Verify Telegram env vars not referenced anywhere
- [ ] Test with incorrect SMTP credentials - appropriate error
- [ ] Test with Gmail SMTP - successful delivery to both recipients
- [ ] Verify HTML emails render correctly in common email clients

## Migration Steps

1. **Install Nodemailer**
   ```bash
   npm install nodemailer
   ```

2. **Modify Existing Email API Route**
   - Modify `app/api/contact/route.js`
   - Remove all Telegram code (axios import, Telegram API calls, Telegram env vars)
   - Implement validation, sanitization, and SMTP logic
   - Add HTML email templates for both owner and user
   - Implement dual recipient sending

3. **Update Environment Variables**
   - Add SMTP configuration to `.env`
   - Update `.env.example` with new variables and instructions
   - Remove EmailJS variables
   - Remove Telegram variables (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)

4. **Update ContactForm Component**
   - Remove EmailJS imports
   - Replace `emailjs.send()` with `fetch('/api/contact')`
   - Keep all existing UI/validation logic

5. **Remove EmailJS and Telegram Dependencies**
   ```bash
   npm uninstall emailjs-com @emailjs/browser axios
   ```

6. **Test Thoroughly**
   - Test successful email sending to both recipients
   - Test HTML email rendering
   - Test error handling
   - Test form behavior (clearing/preservation)
   - Verify no EmailJS or Telegram code remains

7. **Update Documentation**
   - Document new environment variables
   - Document Gmail App Password setup
   - Update README if necessary

## Gmail Setup Instructions

### Option 1: App Password (Recommended)

1. Enable 2-Factor Authentication on Gmail account
2. Go to Google Account → Security → 2-Step Verification → App passwords
3. Generate new app password for "Mail"
4. Use generated password as `SMTP_PASS`

### Option 2: OAuth2 (Advanced)

For production environments, consider OAuth2:
1. Create Google Cloud project
2. Enable Gmail API
3. Create OAuth2 credentials
4. Configure Nodemailer with OAuth2 tokens

## Performance Considerations

- **Email sending time:** 1-3 seconds typical
- **Timeout:** Set reasonable timeout (5-10 seconds)
- **Non-blocking:** Use async/await properly
- **Connection pooling:** Nodemailer handles connection reuse
- **Error recovery:** No automatic retries (keep it simple)

## Compatibility

- **Next.js:** App Router (v13+)
- **Node.js:** v18+ (required by Next.js)
- **Gmail SMTP:** Compatible with all Nodemailer versions
- **Browsers:** No browser-specific dependencies

## Rollback Plan

If issues arise:
1. Revert ContactForm component changes
2. Reinstall EmailJS packages
3. Restore EmailJS environment variables
4. Restore Telegram notification code in `/api/contact/route.js`
5. Reinstall axios if needed
6. Redeploy

Keep EmailJS and Telegram configuration available during initial rollout for quick rollback if needed.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Email Content Preservation

*For any* valid form submission with name, email, and message fields, the sent email SHALL contain all three field values in the email body.

**Validates: Requirements 1.4**

### Property 2: Success Response Format

*For any* valid form submission that successfully sends an email, the API response SHALL have `success: true` and status code 200.

**Validates: Requirements 1.2**

### Property 3: Credential Security in Responses

*For any* API request (valid or invalid), the response body SHALL NOT contain SMTP credentials (user, pass, host configuration).

**Validates: Requirements 2.2**

### Property 4: Credential Security in Logs

*For any* error condition that triggers logging, the log output SHALL NOT contain raw SMTP password values.

**Validates: Requirements 2.3**

### Property 5: Input Sanitization Against Injection

*For any* input string containing newline characters (\\r or \\n) or angle brackets (< >), the sanitized output SHALL have these characters removed or replaced.

**Validates: Requirements 7.5**

### Property 6: Email Validation Before Send

*For any* form submission with an invalid email format, the system SHALL reject the request with a 400 status code before attempting SMTP connection.

**Validates: Requirements 7.4**

### Property 7: Validation Error Descriptiveness

*For any* form submission that fails validation, the error response SHALL include a specific message indicating which field(s) are invalid.

**Validates: Requirements 6.5**

### Property 8: HTTP Status Code Correctness

*For any* API request, the response status code SHALL be 200 for success, 400 for validation failures, and 500 for server errors.

**Validates: Requirements 6.4**

### Property 9: Form Clearing on Success

*For any* successful form submission, all form fields (name, email, message) SHALL be cleared to empty strings.

**Validates: Requirements 4.4**

### Property 10: Form Preservation on Failure

*For any* failed form submission, all form field values SHALL remain unchanged from their pre-submission state.

**Validates: Requirements 4.5**

### Property 11: Request Method Validation

*For any* non-POST request to the email API endpoint, the system SHALL reject the request with validation failing before processing any payload.

**Validates: Requirements 6.2, 6.3**

### Property 12: Missing Configuration Error Handling

*For any* configuration where SMTP credentials (user or pass) are undefined, the API SHALL return a 500 error without attempting SMTP connection.

**Validates: Requirements 8.4**

### Property 13: SMTP Error Response Clarity

*For any* SMTP connection failure, the system SHALL return a user-friendly error message that does not expose internal SMTP details.

**Validates: Requirements 3.4, 7.3**

### Property 14: Dual Recipient Email Delivery

*For any* valid form submission, the system SHALL send HTML emails to both the Site_Owner (SMTP_TO) and the Form_Submitter (form email input).

**Validates: Requirements 1.1, 1.2**

### Property 15: HTML Email Format Compliance

*For any* sent email, the email body SHALL be formatted as HTML (not plain text) with proper DOCTYPE and HTML structure.

**Validates: Requirements 10.1, 10.2, 10.3**

### Property 16: Owner Email Content Completeness

*For any* email sent to the Site_Owner, the HTML body SHALL contain all three form fields (name, email, message) in a structured format.

**Validates: Requirements 1.5**

### Property 17: User Confirmation Content

*For any* email sent to the Form_Submitter, the HTML body SHALL include a confirmation message acknowledging receipt of their inquiry.

**Validates: Requirements 1.6**

### Property 18: Telegram Code Removal

*For any* inspection of the modified `/api/contact` route, the code SHALL NOT contain axios imports, Telegram API calls, or Telegram environment variable references.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4**

## Dependencies

### New Dependencies

- **nodemailer** (^6.9.0): SMTP client for Node.js
  - Well-maintained, widely used
  - Supports Gmail SMTP
  - Handles connection pooling
  - No security vulnerabilities

### Removed Dependencies

- **emailjs-com** (v3.2.0): Client-side email service
- **@emailjs/browser**: Browser-specific EmailJS package
- **axios**: HTTP client (previously used for Telegram notifications)

### Existing Dependencies (Unchanged)

- **react-toastify**: Toast notifications
- **framer-motion**: UI animations
- **next**: Next.js framework

## Future Enhancements

### Phase 2 Potential Features

1. **Email Templates**
   - HTML email formatting
   - Template engine integration
   - Branded email design

2. **Rate Limiting**
   - IP-based throttling
   - CAPTCHA integration
   - Abuse prevention

3. **Email Queue**
   - Retry mechanism for failed sends
   - Background job processing
   - Better resilience

4. **Multiple Recipients**
   - CC/BCC support
   - Distribution lists
   - Notification routing

5. **Email Logging**
   - Database logging of sent emails
   - Admin dashboard for submissions
   - Analytics and reporting

6. **Enhanced Error Recovery**
   - Automatic retry with exponential backoff
   - Fallback email service
   - Dead letter queue

These enhancements are out of scope for the initial migration but can be considered for future iterations.
