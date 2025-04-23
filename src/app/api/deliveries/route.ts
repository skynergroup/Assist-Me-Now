import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { DeliveryStatus } from '@/types';

// Mock delivery data for local development
let deliveries = [
  {
    id: '1',
    hamperId: '1',
    recipientId: '1',
    status: DeliveryStatus.DELIVERED,
    assignedTo: '2',
    scheduledDate: '2023-05-15T10:00:00Z',
    deliveryDate: '2023-05-15T11:30:00Z',
    notes: 'Delivered successfully',
    createdBy: '1',
    createdAt: '2023-05-10T08:00:00Z',
    updatedAt: '2023-05-15T11:30:00Z',
  },
  {
    id: '2',
    hamperId: '2',
    recipientId: '2',
    status: DeliveryStatus.PENDING,
    assignedTo: null,
    scheduledDate: '2023-05-20T14:00:00Z',
    deliveryDate: null,
    notes: 'Awaiting assignment',
    createdBy: '1',
    createdAt: '2023-05-12T09:30:00Z',
    updatedAt: '2023-05-12T09:30:00Z',
  },
];

// GET all deliveries
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(deliveries, { status: 200 });
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST a new delivery
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.hamperId || !body.recipientId) {
      return NextResponse.json(
        { error: 'Hamper ID and recipient ID are required' },
        { status: 400 }
      );
    }

    // Create a new delivery
    const newDelivery = {
      id: uuidv4(),
      hamperId: body.hamperId,
      recipientId: body.recipientId,
      status: body.status || DeliveryStatus.PENDING,
      assignedTo: body.assignedTo || null,
      scheduledDate: body.scheduledDate || null,
      deliveryDate: body.deliveryDate || null,
      notes: body.notes || '',
      createdBy: '1', // In a real app, this would be the authenticated user's ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to the deliveries array
    deliveries.push(newDelivery);

    return NextResponse.json(newDelivery, { status: 201 });
  } catch (error) {
    console.error('Error creating delivery:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
