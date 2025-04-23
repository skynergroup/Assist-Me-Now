import { getApiEndpoint } from '@/lib/aws/config';

const API_ENDPOINT = getApiEndpoint();

// Authentication API service
export const authService = {
  // Login
  login: async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Login failed',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Register
  register: async (userData: any) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Registration failed',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Logout failed',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },
};
