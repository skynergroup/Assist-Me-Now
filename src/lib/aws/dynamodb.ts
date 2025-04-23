import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

// Create a DynamoDB client
// In local development, we'll use a mock or local DynamoDB
// In production, this would connect to the real AWS DynamoDB
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  // For local development, we can use environment variables to configure credentials
  // In production, AWS SDK will use the instance role or environment variables
  credentials: process.env.NODE_ENV === 'production' 
    ? undefined 
    : {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local-key',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local-secret',
      },
  // For local development, we can use a local DynamoDB endpoint
  endpoint: process.env.NODE_ENV === 'production' 
    ? undefined 
    : 'http://localhost:8000',
});

// Create a DynamoDB Document client (easier to work with)
const docClient = DynamoDBDocumentClient.from(client);

// Helper functions for common DynamoDB operations
export const dynamoDB = {
  // Put an item in a table
  put: async (tableName: string, item: Record<string, any>) => {
    const command = new PutCommand({
      TableName: tableName,
      Item: item,
    });
    return docClient.send(command);
  },

  // Get an item from a table by key
  get: async (tableName: string, key: Record<string, any>) => {
    const command = new GetCommand({
      TableName: tableName,
      Key: key,
    });
    const response = await docClient.send(command);
    return response.Item;
  },

  // Query items from a table
  query: async (tableName: string, keyConditionExpression: string, expressionAttributeValues: Record<string, any>) => {
    const command = new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    });
    const response = await docClient.send(command);
    return response.Items || [];
  },

  // Scan all items in a table
  scan: async (tableName: string) => {
    const command = new ScanCommand({
      TableName: tableName,
    });
    const response = await docClient.send(command);
    return response.Items || [];
  },

  // Update an item in a table
  update: async (
    tableName: string, 
    key: Record<string, any>, 
    updateExpression: string, 
    expressionAttributeValues: Record<string, any>
  ) => {
    const command = new UpdateCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });
    const response = await docClient.send(command);
    return response.Attributes;
  },

  // Delete an item from a table
  delete: async (tableName: string, key: Record<string, any>) => {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: key,
    });
    return docClient.send(command);
  },
};

// Table names - these would be environment variables in production
export const TABLES = {
  USERS: process.env.USERS_TABLE || 'Users',
  HAMPERS: process.env.HAMPERS_TABLE || 'Hampers',
  RECIPIENTS: process.env.RECIPIENTS_TABLE || 'Recipients',
  DELIVERIES: process.env.DELIVERIES_TABLE || 'Deliveries',
};
