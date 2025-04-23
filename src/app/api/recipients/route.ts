import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock recipient data for local development
let recipients = [
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
];

// GET all recipients
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(recipients, { status: 200 });
  } catch (error) {
    console.error('Error fetching recipients:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST a new recipient
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.firstName || !body.lastName || !body.address) {
      return NextResponse.json(
        { error: 'First name, last name, and address are required' },
        { status: 400 }
      );
    }

    // Create a new recipient
    const newRecipient = {
      id: uuidv4(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email || '',
      phone: body.phone || '',
      address: body.address,
      notes: body.notes || '',
      photoUrl: body.photoUrl || '',
      createdBy: '1', // In a real app, this would be the authenticated user's ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to the recipients array
    recipients.push(newRecipient);

    return NextResponse.json(newRecipient, { status: 201 });
  } catch (error) {
    console.error('Error creating recipient:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
