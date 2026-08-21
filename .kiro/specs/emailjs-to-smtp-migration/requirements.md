# Requirements: EmailJS to SMTP Migration

## Overview

Migrate the contact form email functionality from client-side EmailJS to server-side SMTP using Nodemailer with Gmail. This migration improves security by moving email credentials to the server, reduces client-side dependencies, and provides better control over email delivery. The existing `/api/contact` route will be modified to send HTML-formatted emails to both the form submitter and the site owner, completely replacing the current Telegram-only functionality.

## Glossary

- **Contact_Form**: The client-side React component that collects user name, email, and message inputs
- **Email_API**: The server-side Next.js API route at `/app/api/contact/route.js` that handles email sending
- **SMTP_Client**: Nodemailer library configured to send emails via Gmail SMTP
- **Form_Submitter**: The person who fills out and submits the contact form
- **Site_Owner**: The recipient of contact form submissions (email configured via environment variable)
- **HTML_Email**: Email message formatted with HTML markup for rich display
- **App_Password**: Gmail-specific authentication credential for SMTP access

## Current State Analysis

**Current Implementation:**
- Existing `/app/api/contact/route.js` sends Telegram notifications only
- Client-side email sending using `emailjs-com` library (to be removed)
- Public API keys exposed in client environment variables (to be removed)
- Direct submission from React component to EmailJS service (to be removed)
- Dependencies: `emailjs-com` (v3.2.0), `@emailjs/browser` (to be uninstalled)
- Email validation using custom utility function (to be retained)
- Toast notifications for user feedback (to be retained)
- Telegram notification system (to be completely removed)

**Current Flow:**
1. User fills contact form (name, email, message)
2. Client-side validation checks email format and required fields
3. Form submission triggers `emailjs.send()` with public credentials
4. EmailJS service sends email directly from client
5. Telegram notification sent to site owner
6. Success/error toast displayed to user

**Target Flow:**
1. User fills contact form (name, email, message)
2. Client-side validation checks email format and required fields
3. Form submission sends POST request to `/api/contact`
4. Email_API validates and sanitizes inputs
5. Email_API sends HTML emails to both Form_Submitter and Site_Owner via SMTP_Client
6. Success/error toast displayed to user

## Requirements

### Requirement 1

**User Story:** As a Form_Submitter, I want my message to be delivered via email, so that the Site_Owner receives my inquiry and I receive a confirmation.

#### Acceptance Criteria

1. WHEN a Form_Submitter submits a valid Contact_Form, THEN THE Email_API SHALL send an HTML_Email to the Site_Owner email address
2. WHEN a Form_Submitter submits a valid Contact_Form, THEN THE Email_API SHALL send an HTML_Email to the Form_Submitter email address
3. WHEN both emails send successfully, THEN THE Email_API SHALL return a success response to the Contact_Form
4. WHEN either email fails to send, THEN THE Email_API SHALL return an error message to the Contact_Form
5. WHEN an HTML_Email is sent to the Site_Owner, THEN THE Email_API SHALL include the Form_Submitter name, email, and message in the email body
6. WHEN an HTML_Email is sent to the Form_Submitter, THEN THE Email_API SHALL include a confirmation message with HTML formatting
7. WHEN an HTML_Email is sent, THEN THE Email_API SHALL set an appropriate subject line identifying it as a contact form submission

### Requirement 2

**User Story:** As a developer, I want email credentials stored securely on the server, so that sensitive authentication details are not exposed to clients.

#### Acceptance Criteria

1. WHEN the application starts, THEN THE Email_API SHALL read SMTP credentials from server-side environment variables only
2. WHEN the Contact_Form makes a request, THEN THE Email_API SHALL NOT expose SMTP credentials in any response
3. WHEN email configuration is invalid, THEN THE Email_API SHALL log the error securely without exposing credentials
4. THE Email_API SHALL NOT include SMTP credentials in client-side bundles or public environment variables

### Requirement 3

**User Story:** As a site owner, I want to use Gmail SMTP with Nodemailer, so that I can leverage my existing Gmail account for sending emails.

#### Acceptance Criteria

1. THE SMTP_Client SHALL use Nodemailer library for SMTP email sending
2. THE SMTP_Client SHALL connect to Gmail SMTP server (smtp.gmail.com) on port 465 or 587
3. WHEN authenticating with Gmail, THEN THE SMTP_Client SHALL use OAuth2 or App_Password authentication
4. WHEN the SMTP connection fails, THEN THE Email_API SHALL return a clear error message to the Contact_Form
5. WHEN Gmail rate limits are reached, THEN THE SMTP_Client SHALL handle throttling appropriately

### Requirement 4

**User Story:** As a Form_Submitter, I want immediate feedback when submitting the Contact_Form, so that I know whether my message was sent successfully.

#### Acceptance Criteria

1. WHILE the Contact_Form is submitting, THE Contact_Form SHALL display a loading state on the submit button
2. WHEN the Email_API returns a success response, THEN THE Contact_Form SHALL display a success toast notification
3. WHEN the Email_API returns an error response, THEN THE Contact_Form SHALL display an error toast notification with a helpful message
4. WHEN the Email_API returns a success response, THEN THE Contact_Form SHALL clear all form fields
5. WHEN the Email_API returns an error response, THEN THE Contact_Form SHALL preserve the Form_Submitter input values

### Requirement 5

**User Story:** As a developer, I want to remove EmailJS dependencies, so that the codebase is cleaner and has fewer external service dependencies.

#### Acceptance Criteria

1. WHEN the migration is complete, THEN THE Contact_Form SHALL NOT import `emailjs-com` or `@emailjs/browser` packages
2. WHEN the migration is complete, THEN THE Contact_Form SHALL NOT reference EmailJS environment variables
3. WHEN building the application, THEN THE build output SHALL NOT include EmailJS libraries in the bundle
4. THE package.json SHALL NOT list EmailJS packages as dependencies after migration

### Requirement 6

**User Story:** As a developer, I want to modify the existing `/api/contact` route following Next.js best practices, so that the implementation is maintainable and consistent with the existing codebase.

#### Acceptance Criteria

1. THE Email_API SHALL be implemented by modifying the existing `/app/api/contact/route.js` file
2. THE Email_API SHALL accept POST requests with JSON payloads containing name, email, and message fields
3. THE Email_API SHALL validate incoming request data before processing
4. THE Email_API SHALL return appropriate HTTP status codes (200 for success, 400 for validation errors, 500 for server errors)
5. WHEN validation fails, THEN THE Email_API SHALL return a descriptive error message indicating which fields are invalid
6. THE Email_API SHALL use Next.js Response/Request patterns (NextResponse)

### Requirement 7

**User Story:** As a site owner, I want email delivery to be reliable, so that I do not miss important contact form submissions.

#### Acceptance Criteria

1. WHEN the SMTP server is temporarily unavailable, THEN THE Email_API SHALL return an appropriate error to the Contact_Form
2. WHEN network errors occur, THEN THE Email_API SHALL handle them gracefully and provide user feedback
3. WHEN emails fail to send, THEN THE Email_API SHALL log detailed error information for debugging
4. THE Email_API SHALL validate email addresses before attempting to send
5. THE Email_API SHALL sanitize user input to prevent email header injection attacks

### Requirement 8

**User Story:** As a developer, I want clear documentation for environment variable setup, so that I can easily configure the SMTP connection in different environments.

#### Acceptance Criteria

1. THE .env.example file SHALL include all required SMTP environment variables
2. THE .env.example file SHALL include comments explaining how to obtain Gmail credentials
3. THE .env.example file SHALL indicate which variables are server-side only (no NEXT_PUBLIC_ prefix)
4. WHEN SMTP credentials are missing, THEN THE Email_API SHALL provide helpful error messages indicating which variables are required

### Requirement 9

**User Story:** As a developer, I want the Telegram notification code completely removed, so that the `/api/contact` route only handles email sending functionality.

#### Acceptance Criteria

1. WHEN the migration is complete, THEN THE Email_API SHALL NOT import axios or any Telegram-related libraries
2. WHEN the migration is complete, THEN THE Email_API SHALL NOT reference Telegram environment variables (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
3. WHEN the migration is complete, THEN THE Email_API SHALL NOT contain any Telegram API calls
4. THE Email_API SHALL replace all Telegram notification logic with email sending logic

### Requirement 10

**User Story:** As a Form_Submitter, I want to receive HTML-formatted emails, so that confirmation messages are visually appealing and easy to read.

#### Acceptance Criteria

1. WHEN the Email_API sends an email, THEN THE email SHALL be formatted as HTML_Email (not plain text)
2. WHEN sending an HTML_Email to the Site_Owner, THEN THE email body SHALL include HTML formatting for structure and readability
3. WHEN sending an HTML_Email to the Form_Submitter, THEN THE email body SHALL include HTML formatting for the confirmation message
4. THE HTML_Email formatting SHALL be compatible with common email clients

## Non-Functional Requirements

### Security
- SMTP credentials must never be exposed to the client
- Email content must be sanitized to prevent injection attacks
- Rate limiting should be considered to prevent abuse

### Performance
- Email sending should not block the user interface
- API response time should be under 5 seconds under normal conditions
- Failed email attempts should timeout appropriately

### Maintainability
- Code should follow existing project conventions
- Error handling should be comprehensive and logged appropriately
- The migration should completely replace Telegram functionality with email functionality

### Compatibility
- Must work with Gmail SMTP (smtp.gmail.com)
- Must support Gmail App Passwords or OAuth2
- Must be compatible with Next.js app router structure
- Must work with existing form validation and toast notification systems

## Success Criteria

1. EmailJS libraries completely removed from package.json
2. Contact form successfully sends HTML_Email via Gmail SMTP to both Form_Submitter and Site_Owner
3. No SMTP credentials exposed in client-side code or environment variables
4. Existing user experience (validation, toasts, form clearing) maintained
5. All Telegram notification code completely removed from `/app/api/contact/route.js`
6. All error cases handled gracefully with appropriate user feedback
7. Documentation updated with new environment variable requirements

## Out of Scope

- Modifying the contact form UI/UX
- Changing form validation logic
- Implementing email queue or retry mechanisms
- Adding email templates with advanced styling (basic HTML formatting is sufficient)
- Supporting multiple email providers beyond Gmail
- Implementing rate limiting or CAPTCHA
