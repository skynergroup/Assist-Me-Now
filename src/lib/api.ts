import { authService } from './aws/auth';
import { ApiResponse } from '@/types';
import { getApiEndpoint } from './aws/config';

// Base API URL
const API_URL = getApiEndpoint();

// Helper function to get authorization headers
const getAuthHeaders = async (): Promise<HeadersInit> => {
  const token = await authService.getJwtToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  method: string = 'GET',
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const headers = await getAuthHeaders();
    const url = `${API_URL}${endpoint}`;
    
    const options: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'An error occurred',
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

// API functions for different endpoints
export const api = {
  // User endpoints
  users: {
    getProfile: () => apiRequest('/users/profile', 'GET'),
    updateProfile: (data: any) => apiRequest('/users/profile', 'PUT', data),
  },

  // Hamper endpoints
  hampers: {
    getAll: () => apiRequest('/hampers', 'GET'),
    getById: (id: string) => apiRequest(`/hampers/${id}`, 'GET'),
    create: (data: any) => apiRequest('/hampers', 'POST', data),
    update: (id: string, data: any) => apiRequest(`/hampers/${id}`, 'PUT', data),
    delete: (id: string) => apiRequest(`/hampers/${id}`, 'DELETE'),
  },

  // Recipient endpoints
  recipients: {
    getAll: () => apiRequest('/recipients', 'GET'),
    getById: (id: string) => apiRequest(`/recipients/${id}`, 'GET'),
    create: (data: any) => apiRequest('/recipients', 'POST', data),
    update: (id: string, data: any) => apiRequest(`/recipients/${id}`, 'PUT', data),
    delete: (id: string) => apiRequest(`/recipients/${id}`, 'DELETE'),
  },

  // Delivery endpoints
  deliveries: {
    getAll: () => apiRequest('/deliveries', 'GET'),
    getById: (id: string) => apiRequest(`/deliveries/${id}`, 'GET'),
    create: (data: any) => apiRequest('/deliveries', 'POST', data),
    update: (id: string, data: any) => apiRequest(`/deliveries/${id}`, 'PUT', data),
    delete: (id: string) => apiRequest(`/deliveries/${id}`, 'DELETE'),
    updateStatus: (id: string, status: string) => 
      apiRequest(`/deliveries/${id}/status`, 'PUT', { status }),
    assign: (id: string, userId: string) => 
      apiRequest(`/deliveries/${id}/assign`, 'PUT', { userId }),
  },

  // Report endpoints
  reports: {
    getDeliveryReport: () => apiRequest('/reports/deliveries', 'GET'),
    getRecipientReport: () => apiRequest('/reports/recipients', 'GET'),
    getHamperReport: () => apiRequest('/reports/hampers', 'GET'),
  },
};
