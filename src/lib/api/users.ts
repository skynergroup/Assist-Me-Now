import { getApiEndpoint } from '@/lib/aws/config';

const API_ENDPOINT = getApiEndpoint();

// User profile API service
export const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch user profile',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Update user profile
  updateProfile: async (profileData: any) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to update user profile',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Change password
  changePassword: async (passwordData: any) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to change password',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error changing password:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Get notification settings
  getNotificationSettings: async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/notifications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch notification settings',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching notification settings:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Update notification settings
  updateNotificationSettings: async (settingsData: any) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/notifications`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to update notification settings',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error updating notification settings:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },
};
