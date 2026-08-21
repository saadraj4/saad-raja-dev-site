import { POST } from './route';
import { NextResponse } from 'next/server';

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, options) => ({
      body,
      status: options?.status || 200,
    })),
  },
}));

describe('Contact API Route - Input Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isValidEmail function', () => {
    test('accepts valid email addresses', async () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'test123@subdomain.example.com',
      ];

      for (const email of validEmails) {
        const request = {
          json: async () => ({
            name: 'Test User',
            email: email,
            message: 'Test message',
          }),
        };

        const response = await POST(request);
        
        // Should not return validation error for email
        if (response.status === 400) {
          expect(response.body.errors).not.toContain('Invalid email address');
        }
      }
    });

    test('rejects invalid email addresses', async () => {
      const invalidEmails = [
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
        'user@example',
        '',
      ];

      for (const email of invalidEmails) {
        const request = {
          json: async () => ({
            name: 'Test User',
            email: email,
            message: 'Test message',
          }),
        };

        const response = await POST(request);
        
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain('Invalid email address');
      }
    });
  });

  describe('validatePayload function', () => {
    test('accepts valid payload with all fields within constraints', async () => {
      const request = {
        json: async () => ({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'This is a valid test message.',
        }),
      };

      const response = await POST(request);
      
      // Should not be a validation error (400)
      expect(response.status).not.toBe(400);
    });

    test('rejects payload with missing name', async () => {
      const request = {
        json: async () => ({
          email: 'john@example.com',
          message: 'Test message',
        }),
      };

      const response = await POST(request);
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toContain('Name must be between 1 and 100 characters');
    });

    test('rejects payload with empty name', async () => {
      const request = {
        json: async () => ({
          name: '',
          email: 'john@example.com',
          message: 'Test message',
        }),
      };

      const response = await POST(request);
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Name must be between 1 and 100 characters');
    });

    test('rejects payload with name exceeding 100 characters', async () => {
      const request = {
        json: async () => ({
          name: 'a'.repeat(101),
          email: 'john@example.com',
          message: 'Test message',
        }),
      };

      const response = await POST(request);
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Name must be between 1 and 100 characters');
    });

    test('accepts payload with name exactly 100 characters', async () => {
      const request = {
        json: async () => ({
          name: 'a'.repeat(100),
          email: 'john@example.com',
          message: 'Test message',
        }),
      };

      const response = await POST(request);
      
      expect(response.status).not.toBe(400);
    });

    test('rejects payload with missing email', async () => {
      const request = {
        json: async () => ({
          name: 'John Doe',
          message: 'Test message',
        }),
      };

      const response = await POST(request);
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Invalid email address');
    });

    test('rejects payload with missing message', async () => {
      const request = {
        json: async () => ({
          name: 'John Doe',
          email: 'john@example.com',
        }),
      };

      const response = await POST(request);
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Message must be between 1 and 500 characters');
    });

    test('rejects payload with empty message', async () => {
      const request = {
        json: async () => ({
          name: 'John Doe',
          email: 'john@example.com',
          message: '',
        }),
      };

      const response = await POST(request);
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Message must be between 1 and 500 characters');
    });

    test('rejects payload with message exceeding 500 characters', async () => {
      const request = {
        json: async () => ({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'a'.repeat(501),
        }),
      };

      const response = await POST(request);
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('Message must be between 1 and 500 characters');
    });

    test('accepts payload with message exactly 500 characters', async () => {
      const request = {
        json: async () => ({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'a'.repeat(500),
        }),
      };

      const response = await POST(request);
      
      expect(response.status).not.toBe(400);
    });

    test('returns multiple validation errors when multiple fields are invalid', async () => {
      const request = {
        json: async () => ({
          name: '',
          email: 'invalid-email',
          message: '',
        }),
      };

      const response = await POST(request);
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toHaveLength(3);
      expect(response.body.errors).toContain('Name must be between 1 and 100 characters');
      expect(response.body.errors).toContain('Invalid email address');
      expect(response.body.errors).toContain('Message must be between 1 and 500 characters');
    });

    test('returns descriptive error structure with success false', async () => {
      const request = {
        json: async () => ({
          name: '',
          email: 'invalid',
          message: '',
        }),
      };

      const response = await POST(request);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Validation failed');
      expect(response.body).toHaveProperty('errors');
      expect(Array.isArray(response.body.errors)).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles payload with extra fields gracefully', async () => {
      const request = {
        json: async () => ({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message',
          extraField: 'should be ignored',
        }),
      };

      const response = await POST(request);
      
      // Should not fail validation due to extra fields
      expect(response.status).not.toBe(400);
    });

    test('rejects whitespace-only name', async () => {
      const request = {
        json: async () => ({
          name: '   ',
          email: 'john@example.com',
          message: 'Test message',
        }),
      };

      const response = await POST(request);
      
      expect(response.status).toBe(400);
    });

    test('rejects whitespace-only message', async () => {
      const request = {
        json: async () => ({
          name: 'John Doe',
          email: 'john@example.com',
          message: '   ',
        }),
      };

      const response = await POST(request);
      
      expect(response.status).toBe(400);
    });
  });
});
