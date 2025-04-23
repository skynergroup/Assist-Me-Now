import { getApiEndpoint } from '@/lib/aws/config';

const API_ENDPOINT = getApiEndpoint();

// Hampers API service
export const hamperService = {
  // Get all hampers
  getAll: async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/hampers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch hampers',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching hampers:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Get hamper by ID
  getById: async (id: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/hampers/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch hamper',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching hamper:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Create a new hamper
  create: async (hamperData: any) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/hampers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hamperData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to create hamper',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error creating hamper:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Update a hamper
  update: async (id: string, hamperData: any) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/hampers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hamperData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to update hamper',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error updating hamper:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Delete a hamper
  delete: async (id: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/hampers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to delete hamper',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error deleting hamper:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },
};
