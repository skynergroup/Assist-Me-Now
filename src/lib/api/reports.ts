import { getApiEndpoint } from '@/lib/aws/config';

const API_ENDPOINT = getApiEndpoint();

// Reports API service
export const reportService = {
  // Get recipient reports
  getRecipientReports: async (params: any = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_ENDPOINT}/reports/recipients${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch recipient reports',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching recipient reports:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Get hamper reports
  getHamperReports: async (params: any = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_ENDPOINT}/reports/hampers${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch hamper reports',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching hamper reports:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Get delivery reports
  getDeliveryReports: async (params: any = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_ENDPOINT}/reports/deliveries${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch delivery reports',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching delivery reports:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },
};
