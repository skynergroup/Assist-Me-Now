import { getApiEndpoint } from '@/lib/aws/config';

const API_ENDPOINT = getApiEndpoint();

// Recipients API service
export const recipientService = {
  // Get all recipients
  getAll: async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/recipients`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch recipients',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching recipients:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Get recipient by ID
  getById: async (id: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/recipients/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch recipient',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching recipient:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Create a new recipient
  create: async (recipientData: any) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/recipients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipientData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to create recipient',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error creating recipient:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Update a recipient
  update: async (id: string, recipientData: any) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/recipients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipientData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to update recipient',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error updating recipient:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Delete a recipient
  delete: async (id: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/recipients/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to delete recipient',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error deleting recipient:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },
};
