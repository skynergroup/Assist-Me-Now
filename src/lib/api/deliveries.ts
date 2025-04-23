import { getApiEndpoint } from '@/lib/aws/config';

const API_ENDPOINT = getApiEndpoint();

// Deliveries API service
export const deliveryService = {
  // Get all deliveries
  getAll: async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/deliveries`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch deliveries',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching deliveries:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Get delivery by ID
  getById: async (id: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/deliveries/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch delivery',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching delivery:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Create a new delivery
  create: async (deliveryData: any) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/deliveries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliveryData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to create delivery',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error creating delivery:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Update a delivery
  update: async (id: string, deliveryData: any) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/deliveries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliveryData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to update delivery',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error updating delivery:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Delete a delivery
  delete: async (id: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/deliveries/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to delete delivery',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error deleting delivery:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Update delivery status
  updateStatus: async (id: string, status: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/deliveries/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to update delivery status',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error updating delivery status:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Assign delivery to a user
  assignDelivery: async (id: string, userId: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/deliveries/${id}/assign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to assign delivery',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error assigning delivery:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },
};
