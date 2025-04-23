import { NextRequest, NextResponse } from 'next/server';

// Mock recipient data for local development
const recipients = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+27123456789',
    address: {
      street: '123 Main St',
      city: 'Johannesburg',
      state: 'Gauteng',
      postalCode: '2000',
      country: 'South Africa',
    },
    notes: 'Family of 4, needs regular assistance',
    photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+27987654321',
    address: {
      street: '456 Oak Ave',
      city: 'Cape Town',
      state: 'Western Cape',
      postalCode: '8000',
      country: 'South Africa',
    },
    notes: 'Elderly, lives alone',
    photoUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    phone: '+27456789123',
    address: {
      street: '789 Pine St',
      city: 'Durban',
      state: 'KwaZulu-Natal',
      postalCode: '4000',
      country: 'South Africa',
    },
    notes: 'Family of 3',
    photoUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@example.com',
    phone: '+27789123456',
    address: {
      street: '321 Cedar St',
      city: 'Johannesburg',
      state: 'Gauteng',
      postalCode: '2000',
      country: 'South Africa',
    },
    notes: 'Single parent with 2 children',
    photoUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@example.com',
    phone: '+27321654987',
    address: {
      street: '654 Maple St',
      city: 'Pretoria',
      state: 'Gauteng',
      postalCode: '0001',
      country: 'South Africa',
    },
    notes: 'Elderly couple',
    photoUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET recipient report
export async function GET(request: NextRequest) {
  try {
    // Count total recipients
    const totalRecipients = recipients.length;

    // Group recipients by city
    const recipientsByCity: Record<string, number> = {};
    
    recipients.forEach(recipient => {
      const city = recipient.address.city;
      recipientsByCity[city] = (recipientsByCity[city] || 0) + 1;
    });

    // Create the report
    const report = {
      totalRecipients,
      recipientsByCity,
    };

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error('Error generating recipient report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
