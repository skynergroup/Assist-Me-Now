import { NextRequest, NextResponse } from 'next/server';

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

// GET a specific recipient by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const recipient = recipients.find((r) => r.id === id);

    if (!recipient) {
      return NextResponse.json(
        { error: 'Recipient not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(recipient, { status: 200 });
  } catch (error) {
    console.error('Error fetching recipient:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT (update) a specific recipient by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Find the recipient index
    const recipientIndex = recipients.findIndex((r) => r.id === id);

    if (recipientIndex === -1) {
      return NextResponse.json(
        { error: 'Recipient not found' },
        { status: 404 }
      );
    }

    // Update the recipient
    const updatedRecipient = {
      ...recipients[recipientIndex],
      firstName: body.firstName || recipients[recipientIndex].firstName,
      lastName: body.lastName || recipients[recipientIndex].lastName,
      email: body.email !== undefined ? body.email : recipients[recipientIndex].email,
      phone: body.phone !== undefined ? body.phone : recipients[recipientIndex].phone,
      address: body.address || recipients[recipientIndex].address,
      notes: body.notes !== undefined ? body.notes : recipients[recipientIndex].notes,
      photoUrl: body.photoUrl !== undefined ? body.photoUrl : recipients[recipientIndex].photoUrl,
      updatedAt: new Date().toISOString(),
    };

    recipients[recipientIndex] = updatedRecipient;

    return NextResponse.json(updatedRecipient, { status: 200 });
  } catch (error) {
    console.error('Error updating recipient:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE a specific recipient by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Find the recipient index
    const recipientIndex = recipients.findIndex((r) => r.id === id);

    if (recipientIndex === -1) {
      return NextResponse.json(
        { error: 'Recipient not found' },
        { status: 404 }
      );
    }

    // Remove the recipient
    recipients.splice(recipientIndex, 1);

    return NextResponse.json(
      { message: 'Recipient deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting recipient:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
