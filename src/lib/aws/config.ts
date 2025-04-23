// AWS Configuration
// For local development, we're not actually using AWS Amplify
// This is a placeholder for when we deploy to AWS

export const configureAWS = () => {
  // In local development, we don't need to configure AWS
  // This function is a no-op for local development
  console.log('AWS configuration skipped in local development');
};

// Export a function to get the API endpoint
export const getApiEndpoint = () => {
  return process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000/api';
};
