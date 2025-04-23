// Simple mock authentication service for local development

// Define a simple mock user type
type MockUser = {
  username: string;
  password: string;
  attributes: Record<string, string>;
};

// Just two mock users for testing
const mockUsers: MockUser[] = [
  {
    username: 'admin',
    password: 'password',
    attributes: {
      email: 'admin@assistmenow.org',
      'custom:role': 'ADMIN',
      given_name: 'Admin',
      family_name: 'User',
    },
  },
  {
    username: 'staff',
    password: 'password',
    attributes: {
      email: 'staff@assistmenow.org',
      'custom:role': 'STAFF',
      given_name: 'Staff',
      family_name: 'User',
    },
  },
];

// Mock authentication state - for development, always logged in as admin
let currentUser: MockUser = mockUsers[0];

// Authentication service
export const authService = {
  // Sign up a new user
  signUp: async (username: string, password: string, email: string, phone_number: string) => {
    try {
      // Check if username already exists
      if (mockUsers.some(user => user.username === username)) {
        throw new Error('Username already exists');
      }

      // Create new user
      const newUser = {
        username,
        password,
        attributes: {
          email,
          phone_number,
          'custom:role': 'STAFF', // Default role
        },
      };

      mockUsers.push(newUser);
      return { username };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  // Confirm sign up with verification code
  confirmSignUp: async (_username: string, _code: string) => {
    try {
      // In a mock environment, any code is valid
      return true;
    } catch (error) {
      console.error('Error confirming sign up:', error);
      throw error;
    }
  },

  // Sign in a user
  signIn: async (username: string, password: string) => {
    try {
      console.log(`Attempting to sign in with username: ${username}`);

      // Find user
      const user = mockUsers.find(u => u.username === username && u.password === password);

      if (!user) {
        console.error('User not found or password incorrect');
        throw new Error('Invalid username or password');
      }

      console.log('User found, login successful:', user.username);

      // Set current user
      currentUser = user;

      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  // Sign out the current user
  signOut: async () => {
    try {
      // For local development, just reset to the admin user
      currentUser = mockUsers[0];
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Get the current authenticated user
  getCurrentUser: async () => {
    try {
      // For local development, we'll return the current user if it exists
      // In a real app, this would check with Cognito
      console.log('Getting current user:', currentUser ? currentUser.username : 'none');
      return currentUser;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Get the current session
  getCurrentSession: async () => {
    try {
      return {
        getIdToken: () => ({
          getJwtToken: () => 'mock-jwt-token',
        }),
      };
    } catch (error) {
      console.error('Error getting current session:', error);
      return null;
    }
  },

  // Get the JWT token for the current user
  getJwtToken: async () => {
    try {
      return 'mock-jwt-token';
    } catch (error) {
      console.error('Error getting JWT token:', error);
      return null;
    }
  },

  // Change password for the current user
  changePassword: async (oldPassword: string, newPassword: string) => {
    try {
      if (!currentUser) {
        throw new Error('No user is signed in');
      }

      if (currentUser.password !== oldPassword) {
        throw new Error('Incorrect old password');
      }

      currentUser.password = newPassword;
      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  // Request a password reset
  forgotPassword: async (username: string) => {
    try {
      const user = mockUsers.find(u => u.username === username);

      if (!user) {
        throw new Error('User not found');
      }

      return true;
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  },

  // Confirm a password reset with verification code
  forgotPasswordSubmit: async (username: string, _code: string, newPassword: string) => {
    try {
      const userIndex = mockUsers.findIndex(u => u.username === username);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      mockUsers[userIndex].password = newPassword;
      return true;
    } catch (error) {
      console.error('Error confirming password reset:', error);
      throw error;
    }
  },

  // Update user attributes
  updateUserAttributes: async (attributes: Record<string, string>) => {
    try {
      if (!currentUser) {
        throw new Error('No user is signed in');
      }

      Object.assign(currentUser.attributes, attributes);
      return true;
    } catch (error) {
      console.error('Error updating user attributes:', error);
      throw error;
    }
  },
};
