import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Create an S3 client
// In local development, we'll use a mock or local S3-compatible service
// In production, this would connect to the real AWS S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  // For local development, we can use environment variables to configure credentials
  // In production, AWS SDK will use the instance role or environment variables
  credentials: process.env.NODE_ENV === 'production' 
    ? undefined 
    : {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local-key',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local-secret',
      },
  // For local development, we can use a local S3-compatible endpoint
  endpoint: process.env.NODE_ENV === 'production' 
    ? undefined 
    : 'http://localhost:9000',
  forcePathStyle: process.env.NODE_ENV !== 'production', // Required for local S3-compatible services
});

// S3 bucket name - would be an environment variable in production
const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'assist-me-now-local';

// Helper functions for common S3 operations
export const s3 = {
  // Upload a file to S3
  uploadFile: async (key: string, body: Buffer, contentType: string) => {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
    });
    return s3Client.send(command);
  },

  // Get a file from S3
  getFile: async (key: string) => {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    return s3Client.send(command);
  },

  // Delete a file from S3
  deleteFile: async (key: string) => {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    return s3Client.send(command);
  },

  // Generate a pre-signed URL for uploading a file directly to S3
  getUploadUrl: async (key: string, contentType: string, expiresIn = 3600) => {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });
    return getSignedUrl(s3Client, command, { expiresIn });
  },

  // Generate a pre-signed URL for downloading a file directly from S3
  getDownloadUrl: async (key: string, expiresIn = 3600) => {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    return getSignedUrl(s3Client, command, { expiresIn });
  },
};
