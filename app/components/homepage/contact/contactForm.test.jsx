/**
 * Property-Based Tests for ContactForm Component
 * 
 * These tests use fast-check to verify universal properties across
 * randomly generated inputs, ensuring the ContactForm behaves correctly
 * for all valid input combinations.
 */

import React from 'react';
import { render, waitFor, cleanup, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import ContactForm from './contactForm';

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, whileHover, whileTap, ...props }) => <button {...props}>{children}</button>,
  },
}));

// Mock react-icons
jest.mock('react-icons/tb', () => ({
  TbMailForward: () => <span data-testid="mail-icon">Mail Icon</span>,
}));

describe('ContactForm - Property-Based Tests', () => {
  let originalFetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  /**
   * Property 9: Form Clearing on Success
   * 
   * **Validates: Requirements 4.4**
   * 
   * This property verifies that WHEN the Email_API returns a success response,
   * THEN THE Contact_Form SHALL clear all form fields to empty strings.
   * 
   * The test generates random valid form data and verifies that after a successful
   * submission, all input fields are reset to their initial empty state.
   */
  describe('Property 9: Form Clearing on Success', () => {
    it('should clear all form fields (name, email, message) after successful submission', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random valid form data
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
            email: fc.emailAddress(),
            message: fc.string({ minLength: 1, maxLength: 500 }).filter(s => s.trim().length > 0),
          }),
          async (formData) => {
            // Clean up any previous renders
            cleanup();
            
            // Mock successful API response
            global.fetch = jest.fn().mockResolvedValue({
              ok: true,
              json: async () => ({
                success: true,
                message: 'Message sent successfully!',
              }),
            });

            // Render the ContactForm component
            const { container } = render(<ContactForm />);

            // Fill in the form fields with generated data using fireEvent for efficiency
            const nameInput = container.querySelector('input[placeholder="John Doe"]');
            const emailInput = container.querySelector('input[placeholder="johndoe@example.com"]');
            const messageInput = container.querySelector('textarea[placeholder*="Hi Saad"]');

            fireEvent.change(nameInput, { target: { value: formData.name } });
            fireEvent.change(emailInput, { target: { value: formData.email } });
            fireEvent.change(messageInput, { target: { value: formData.message } });

            // Verify fields have the expected values before submission
            expect(nameInput.value).toBe(formData.name);
            expect(emailInput.value).toBe(formData.email);
            expect(messageInput.value).toBe(formData.message);

            // Submit the form
            const submitButton = container.querySelector('button[type="submit"]');
            fireEvent.click(submitButton);

            // Wait for the async submission to complete
            await waitFor(() => {
              expect(global.fetch).toHaveBeenCalledWith(
                '/api/contact',
                expect.objectContaining({
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                  }),
                })
              );
            }, { timeout: 3000 });

            // Verify all form fields are cleared to empty strings
            await waitFor(() => {
              expect(nameInput.value).toBe('');
              expect(emailInput.value).toBe('');
              expect(messageInput.value).toBe('');
            }, { timeout: 3000 });
            
            // Clean up after this test
            cleanup();
          }
        ),
        {
          // Run 20 random test cases to ensure property holds across diverse inputs
          numRuns: 20,
          // Set timeout for async operations
          timeout: 15000,
        }
      );
    }, 20000); // Jest test timeout

    it('should clear form fields even with special characters in input', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate form data with special characters
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 100 })
              .filter(s => s.trim().length > 0)
              .map(s => s.replace(/[<>]/g, '')), // Remove angle brackets for HTML safety
            email: fc.emailAddress(),
            message: fc.string({ minLength: 1, maxLength: 500 })
              .filter(s => s.trim().length > 0)
              .map(s => s.replace(/[<>]/g, '')), // Remove angle brackets for HTML safety
          }),
          async (formData) => {
            // Clean up any previous renders
            cleanup();
            
            // Mock successful API response
            global.fetch = jest.fn().mockResolvedValue({
              ok: true,
              json: async () => ({
                success: true,
                message: 'Message sent successfully!',
              }),
            });

            const { container } = render(<ContactForm />);

            const nameInput = container.querySelector('input[placeholder="John Doe"]');
            const emailInput = container.querySelector('input[placeholder="johndoe@example.com"]');
            const messageInput = container.querySelector('textarea[placeholder*="Hi Saad"]');

            fireEvent.change(nameInput, { target: { value: formData.name } });
            fireEvent.change(emailInput, { target: { value: formData.email } });
            fireEvent.change(messageInput, { target: { value: formData.message } });

            const submitButton = container.querySelector('button[type="submit"]');
            fireEvent.click(submitButton);

            await waitFor(() => {
              expect(global.fetch).toHaveBeenCalled();
            }, { timeout: 3000 });

            // Verify clearing works regardless of input content
            await waitFor(() => {
              expect(nameInput.value).toBe('');
              expect(emailInput.value).toBe('');
              expect(messageInput.value).toBe('');
            }, { timeout: 3000 });
            
            // Clean up after this test
            cleanup();
          }
        ),
        {
          numRuns: 20,
          timeout: 15000,
        }
      );
    }, 20000); // Jest test timeout

    it('should clear form fields for boundary length inputs', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Test with boundary cases: minimum and maximum valid lengths
          fc.record({
            name: fc.oneof(
              fc.constant('A'), // Minimum length (1 character)
              fc.constant('A'.repeat(100)) // Maximum length (100 characters)
            ),
            email: fc.emailAddress(),
            message: fc.oneof(
              fc.constant('M'), // Minimum length (1 character)
              fc.constant('M'.repeat(500)) // Maximum length (500 characters)
            ),
          }),
          async (formData) => {
            // Clean up any previous renders
            cleanup();
            
            global.fetch = jest.fn().mockResolvedValue({
              ok: true,
              json: async () => ({
                success: true,
                message: 'Message sent successfully!',
              }),
            });

            const { container } = render(<ContactForm />);

            const nameInput = container.querySelector('input[placeholder="John Doe"]');
            const emailInput = container.querySelector('input[placeholder="johndoe@example.com"]');
            const messageInput = container.querySelector('textarea[placeholder*="Hi Saad"]');

            fireEvent.change(nameInput, { target: { value: formData.name } });
            fireEvent.change(emailInput, { target: { value: formData.email } });
            fireEvent.change(messageInput, { target: { value: formData.message } });

            const submitButton = container.querySelector('button[type="submit"]');
            fireEvent.click(submitButton);

            await waitFor(() => {
              expect(global.fetch).toHaveBeenCalled();
            }, { timeout: 3000 });

            await waitFor(() => {
              expect(nameInput.value).toBe('');
              expect(emailInput.value).toBe('');
              expect(messageInput.value).toBe('');
            }, { timeout: 3000 });
            
            // Clean up after this test
            cleanup();
          }
        ),
        {
          numRuns: 10,
          timeout: 15000,
        }
      );
    }, 20000); // Jest test timeout
  });

  /**
   * Property 10: Form Preservation on Failure
   * 
   * **Validates: Requirements 4.5**
   * 
   * This property verifies that WHEN the Email_API returns an error response,
   * THEN THE Contact_Form SHALL preserve the Form_Submitter input values.
   * 
   * The test generates random valid form data and verifies that after a failed
   * submission (API error), all input fields retain their original values.
   */
  describe('Property 10: Form Preservation on Failure', () => {
    it('should preserve all form fields when API returns error response (response.ok = false)', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random valid form data
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
            email: fc.emailAddress(),
            message: fc.string({ minLength: 1, maxLength: 500 }).filter(s => s.trim().length > 0),
          }),
          async (formData) => {
            // Clean up any previous renders
            cleanup();
            
            // Mock failed API response (response.ok = false)
            global.fetch = jest.fn().mockResolvedValue({
              ok: false,
              json: async () => ({
                success: false,
                message: 'Failed to send message',
              }),
            });

            // Render the ContactForm component
            const { container } = render(<ContactForm />);

            // Fill in the form fields with generated data
            const nameInput = container.querySelector('input[placeholder="John Doe"]');
            const emailInput = container.querySelector('input[placeholder="johndoe@example.com"]');
            const messageInput = container.querySelector('textarea[placeholder*="Hi Saad"]');

            fireEvent.change(nameInput, { target: { value: formData.name } });
            fireEvent.change(emailInput, { target: { value: formData.email } });
            fireEvent.change(messageInput, { target: { value: formData.message } });

            // Verify fields have the expected values before submission
            expect(nameInput.value).toBe(formData.name);
            expect(emailInput.value).toBe(formData.email);
            expect(messageInput.value).toBe(formData.message);

            // Submit the form
            const submitButton = container.querySelector('button[type="submit"]');
            fireEvent.click(submitButton);

            // Wait for the async submission to complete
            await waitFor(() => {
              expect(global.fetch).toHaveBeenCalledWith(
                '/api/contact',
                expect.objectContaining({
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                  }),
                })
              );
            }, { timeout: 3000 });

            // Verify all form fields are preserved with original values
            await waitFor(() => {
              expect(nameInput.value).toBe(formData.name);
              expect(emailInput.value).toBe(formData.email);
              expect(messageInput.value).toBe(formData.message);
            }, { timeout: 3000 });
            
            // Clean up after this test
            cleanup();
          }
        ),
        {
          // Run 20 random test cases to ensure property holds across diverse inputs
          numRuns: 20,
          // Set timeout for async operations
          timeout: 15000,
        }
      );
    }, 20000); // Jest test timeout

    it('should preserve form fields when API throws network error', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random valid form data
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
            email: fc.emailAddress(),
            message: fc.string({ minLength: 1, maxLength: 500 }).filter(s => s.trim().length > 0),
          }),
          async (formData) => {
            // Clean up any previous renders
            cleanup();
            
            // Mock network error (fetch throws exception)
            global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

            const { container } = render(<ContactForm />);

            const nameInput = container.querySelector('input[placeholder="John Doe"]');
            const emailInput = container.querySelector('input[placeholder="johndoe@example.com"]');
            const messageInput = container.querySelector('textarea[placeholder*="Hi Saad"]');

            fireEvent.change(nameInput, { target: { value: formData.name } });
            fireEvent.change(emailInput, { target: { value: formData.email } });
            fireEvent.change(messageInput, { target: { value: formData.message } });

            // Store original values
            const originalName = formData.name;
            const originalEmail = formData.email;
            const originalMessage = formData.message;

            const submitButton = container.querySelector('button[type="submit"]');
            fireEvent.click(submitButton);

            // Wait for the async submission attempt to complete
            await waitFor(() => {
              expect(global.fetch).toHaveBeenCalled();
            }, { timeout: 3000 });

            // Verify all form fields still have original values after error
            await waitFor(() => {
              expect(nameInput.value).toBe(originalName);
              expect(emailInput.value).toBe(originalEmail);
              expect(messageInput.value).toBe(originalMessage);
            }, { timeout: 3000 });
            
            // Clean up after this test
            cleanup();
          }
        ),
        {
          numRuns: 20,
          timeout: 15000,
        }
      );
    }, 20000); // Jest test timeout

    it('should preserve form fields when API returns error with success=false', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random valid form data with various error messages
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
            email: fc.emailAddress(),
            message: fc.string({ minLength: 1, maxLength: 500 }).filter(s => s.trim().length > 0),
            errorMessage: fc.oneof(
              fc.constant('Validation error'),
              fc.constant('Server error'),
              fc.constant('Rate limit exceeded'),
              fc.constant('Invalid email address')
            ),
          }),
          async (formData) => {
            // Clean up any previous renders
            cleanup();
            
            // Mock API response with response.ok=true but success=false (application-level error)
            global.fetch = jest.fn().mockResolvedValue({
              ok: true,
              json: async () => ({
                success: false,
                message: formData.errorMessage,
              }),
            });

            const { container } = render(<ContactForm />);

            const nameInput = container.querySelector('input[placeholder="John Doe"]');
            const emailInput = container.querySelector('input[placeholder="johndoe@example.com"]');
            const messageInput = container.querySelector('textarea[placeholder*="Hi Saad"]');

            fireEvent.change(nameInput, { target: { value: formData.name } });
            fireEvent.change(emailInput, { target: { value: formData.email } });
            fireEvent.change(messageInput, { target: { value: formData.message } });

            const submitButton = container.querySelector('button[type="submit"]');
            fireEvent.click(submitButton);

            await waitFor(() => {
              expect(global.fetch).toHaveBeenCalled();
            }, { timeout: 3000 });

            // Verify form preservation even with application-level errors
            await waitFor(() => {
              expect(nameInput.value).toBe(formData.name);
              expect(emailInput.value).toBe(formData.email);
              expect(messageInput.value).toBe(formData.message);
            }, { timeout: 3000 });
            
            // Clean up after this test
            cleanup();
          }
        ),
        {
          numRuns: 20,
          timeout: 15000,
        }
      );
    }, 20000); // Jest test timeout

    it('should preserve form fields with special characters on API failure', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate form data with special characters to test preservation
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 100 })
              .filter(s => s.trim().length > 0)
              .map(s => s.replace(/[<>]/g, '')),
            email: fc.emailAddress(),
            message: fc.string({ minLength: 1, maxLength: 500 })
              .filter(s => s.trim().length > 0)
              .map(s => s.replace(/[<>]/g, '')),
          }),
          async (formData) => {
            // Clean up any previous renders
            cleanup();
            
            // Mock failed API response
            global.fetch = jest.fn().mockResolvedValue({
              ok: false,
              json: async () => ({
                success: false,
                message: 'Server error',
              }),
            });

            const { container } = render(<ContactForm />);

            const nameInput = container.querySelector('input[placeholder="John Doe"]');
            const emailInput = container.querySelector('input[placeholder="johndoe@example.com"]');
            const messageInput = container.querySelector('textarea[placeholder*="Hi Saad"]');

            fireEvent.change(nameInput, { target: { value: formData.name } });
            fireEvent.change(emailInput, { target: { value: formData.email } });
            fireEvent.change(messageInput, { target: { value: formData.message } });

            const submitButton = container.querySelector('button[type="submit"]');
            fireEvent.click(submitButton);

            await waitFor(() => {
              expect(global.fetch).toHaveBeenCalled();
            }, { timeout: 3000 });

            // Verify preservation works regardless of input content
            await waitFor(() => {
              expect(nameInput.value).toBe(formData.name);
              expect(emailInput.value).toBe(formData.email);
              expect(messageInput.value).toBe(formData.message);
            }, { timeout: 3000 });
            
            // Clean up after this test
            cleanup();
          }
        ),
        {
          numRuns: 20,
          timeout: 15000,
        }
      );
    }, 20000); // Jest test timeout
  });
});
