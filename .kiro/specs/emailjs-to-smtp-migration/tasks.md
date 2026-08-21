# Implementation Plan: EmailJS to SMTP Migration

## Overview

This plan migrates the contact form from client-side EmailJS to server-side SMTP using Nodemailer with Gmail. The implementation modifies the existing `/api/contact` route to replace Telegram notifications with HTML email sending to dual recipients (site owner + form submitter). All Telegram code will be removed. All code will be written in JavaScript using Next.js patterns.

## Tasks

- [x] 1. Set up server-side infrastructure and dependencies
  - [x] 1.1 Install Nodemailer package
    - Run `npm install nodemailer` to add SMTP client
    - _Requirements: 3.1_
  
  - [x] 1.2 Update environment variable configuration
    - Add new SMTP environment variables to `.env.example`: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_TO`
    - Include helpful comments explaining Gmail App Password setup
    - Remove EmailJS variables from `.env.example`: `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
    - Remove Telegram variables from `.env.example`: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
    - _Requirements: 8.1, 8.2, 8.3, 2.4, 9.2_

- [x] 2. Modify existing API route with validation and sanitization
  - [x] 2.1 Remove Telegram code from existing route
    - Open `app/api/contact/route.js`
    - Remove axios import statement
    - Remove all Telegram-related code (API calls, environment variable references)
    - Keep the basic POST handler structure
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  
  - [x] 2.2 Implement input validation functions in route
    - Add `isValidEmail()` function for email format validation
    - Add `validatePayload()` function to check required fields and length constraints (name 1-100 chars, email valid format, message 1-500 chars)
    - Return descriptive validation errors with 400 status when validation fails
    - _Requirements: 6.3, 6.5, 7.4_
  
  - [x] 2.3 Implement input sanitization and HTML escape functions
    - Add `sanitizeInput()` function to remove newlines (\\r, \\n) and angle brackets (< >)
    - Add `escapeHtml()` function to escape HTML entities (&, <, >, ", ')
    - Apply sanitization and escaping to all user inputs (name, email, message)
    - _Requirements: 7.5_
  
  - [ ]* 2.4 Write property test for input sanitization
    - **Property 5: Input Sanitization Against Injection**
    - Generate random inputs with newlines and angle brackets
    - Verify sanitizeInput() removes all dangerous characters
    - **Validates: Requirements 7.5**
  
  - [ ]* 2.5 Write property test for email validation
    - **Property 6: Email Validation Before Send**
    - Generate invalid email formats
    - Verify API rejects with 400 before attempting SMTP
    - **Validates: Requirements 7.4**

- [x] 3. Implement SMTP email sending functionality in existing route
  - [x] 3.1 Implement SMTP transporter configuration
    - Read SMTP credentials from environment variables (server-side only)
    - Create Nodemailer transporter with Gmail SMTP settings (host, port 465/587, secure flag)
    - Implement configuration validation to check for missing credentials (SMTP_USER, SMTP_PASS, SMTP_TO)
    - Return 500 error with helpful message if SMTP credentials are missing
    - _Requirements: 2.1, 3.2, 3.3, 8.4_
  
  - [x] 3.2 Create HTML email template for site owner
    - Create HTML template with proper DOCTYPE and responsive CSS
    - Include structured display of sender name, email (as mailto link), and message
    - Use professional styling with headers, borders, and highlighted message box
    - Set replyTo field to form submitter's email for easy responses
    - _Requirements: 1.5, 10.1, 10.2, 10.4_
  
  - [x] 3.3 Create HTML email template for form submitter (confirmation)
    - Create HTML template with branded header and confirmation message
    - Include personalized greeting using submitter's name
    - Display their submitted message in a highlighted box
    - Add footer indicating expected response time and automated message notice
    - _Requirements: 1.6, 10.1, 10.3, 10.4_
  
  - [x] 3.4 Implement dual email sending logic
    - Configure owner mail options (to: SMTP_TO, subject: "New Contact Form Submission from {name}", HTML body)
    - Configure user mail options (to: form email, subject: "Thanks for reaching out!", HTML body)
    - Send both emails sequentially using `transporter.sendMail()`
    - Handle successful send with 200 response and success message
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.7, 3.1_
  
  - [x] 3.5 Implement error handling for SMTP operations
    - Catch and log SMTP errors securely (no credential exposure in logs)
    - Return user-friendly error messages without exposing internal details
    - Handle network timeouts and connection failures gracefully
    - Return 500 status with generic error message on failure
    - _Requirements: 2.2, 2.3, 3.4, 7.1, 7.2, 7.3_
  
  - [ ]* 3.6 Write property test for credential security in responses
    - **Property 3: Credential Security in Responses**
    - Generate random API requests (valid and invalid)
    - Verify no response contains SMTP credentials (user, pass, host)
    - **Validates: Requirements 2.2**
  
  - [ ]* 3.7 Write property test for dual recipient delivery
    - **Property 14: Dual Recipient Email Delivery**
    - Generate random valid form submissions
    - Mock email sending and verify two emails sent (one to SMTP_TO, one to form email)
    - **Validates: Requirements 1.1, 1.2**
  
  - [ ]* 3.8 Write property test for HTML email format
    - **Property 15: HTML Email Format Compliance**
    - Generate random valid form submissions
    - Verify both email bodies contain proper HTML structure (DOCTYPE, html, head, body tags)
    - **Validates: Requirements 10.1, 10.2, 10.3**

- [x] 4. Checkpoint - Verify API route functionality
  - Ensure all tests pass, ask the user if questions arise.
  - Manually test API route with Postman or curl
  - Verify emails are sent to both recipients with HTML formatting

- [x] 5. Update ContactForm component to use modified API
  - [x] 5.1 Remove EmailJS dependencies from ContactForm
    - Remove `import emailjs from 'emailjs-com'` statement
    - Remove EmailJS environment variable references (`process.env.NEXT_PUBLIC_EMAILJS_*`)
    - Remove `emailjs.send()` call and related EmailJS logic
    - _Requirements: 5.1, 5.2_
  
  - [x] 5.2 Implement fetch-based API call to existing route
    - Replace EmailJS send with `fetch('/api/contact')` POST request
    - Set Content-Type header to 'application/json'
    - Send JSON payload with name, email, and message fields
    - Parse JSON response from API
    - _Requirements: 1.1, 6.2, 6.3_
  
  - [x] 5.3 Implement response handling and user feedback
    - Display success toast notification when `response.ok && data.success` is true
    - Display error toast notification with error message when request fails
    - Clear form fields (name, email, message to empty strings) on successful send
    - Preserve form field values when send fails
    - Maintain loading state display during submission
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [x] 5.4 Write property test for form clearing on success
    - **Property 9: Form Clearing on Success**
    - Mock successful API responses
    - Verify all form fields are cleared to empty strings after success
    - **Validates: Requirements 4.4**
  
  - [x] 5.5 Write property test for form preservation on failure
    - **Property 10: Form Preservation on Failure**
    - Mock failed API responses
    - Verify form field values remain unchanged from pre-submission state
    - **Validates: Requirements 4.5**

- [ ] 6. Remove unused dependencies from project
  - [x] 6.1 Uninstall EmailJS and axios dependencies
    - Run `npm uninstall emailjs-com @emailjs/browser axios` to remove packages
    - Verify package.json no longer lists these packages
    - Run `npm run build` to verify no build errors
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 9.1_

- [x] 7. Final integration and testing
  - [ ]* 7.1 Write integration test for successful dual email flow
    - Mock Nodemailer transport
    - Test complete flow from form submission to success response
    - Verify two emails sent (owner + user) with HTML formatting
    - Verify form clears and success toast displays
    - **Validates: Requirements 1.1, 1.2, 1.6, 4.2, 4.4**
  
  - [ ]* 7.2 Write integration test for validation errors
    - Test API with missing fields, invalid email, and length violations
    - Verify 400 status and descriptive error messages
    - Verify form preserves user input
    - **Validates: Requirements 6.4, 6.5, 4.5**
  
  - [ ]* 7.3 Write integration test for SMTP errors
    - Mock SMTP failures (connection, auth, send errors)
    - Verify user-friendly error messages without internal details
    - Verify form preserves user input
    - **Validates: Requirements 3.4, 7.1, 7.2, 7.3**

- [x] 8. Final checkpoint - Verify complete migration
  - Ensure all tests pass, ask the user if questions arise.
  - Verify EmailJS completely removed from codebase (no imports, no env vars, not in package.json)
  - Verify Telegram code completely removed from `/api/contact/route.js` (no axios, no Telegram API calls)
  - Verify contact form successfully sends HTML emails via Gmail SMTP to both recipients
  - Verify no SMTP credentials exposed in client-side code or browser network tab
  - Test in browser: submit form and verify both owner and user receive HTML emails

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation before proceeding
- Property tests validate universal correctness properties across random inputs
- Integration tests validate end-to-end flows with realistic scenarios
- **All Telegram code will be removed** - no fallback, email-only functionality
- **Modify existing `/api/contact/route.js`** - do not create new route
- **Dual recipients**: owner (SMTP_TO) + user (form email)
- **HTML emails**: both owner and user receive HTML-formatted messages
- Gmail App Password setup is documented in design but not implemented as a coding task
- All SMTP environment variables are server-side only (no `NEXT_PUBLIC_` prefix)
- The migration maintains existing form validation, toast notifications, and UI/UX

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3"] },
    { "id": 3, "tasks": ["2.4", "2.5", "3.1"] },
    { "id": 4, "tasks": ["3.2", "3.3"] },
    { "id": 5, "tasks": ["3.4", "3.5"] },
    { "id": 6, "tasks": ["3.6", "3.7", "3.8"] },
    { "id": 7, "tasks": ["5.1", "5.2"] },
    { "id": 8, "tasks": ["5.3"] },
    { "id": 9, "tasks": ["5.4", "5.5", "6.1"] },
    { "id": 10, "tasks": ["7.1", "7.2", "7.3"] }
  ]
}
```
