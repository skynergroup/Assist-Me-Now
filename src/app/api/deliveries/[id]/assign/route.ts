import { NextRequest, NextResponse } from 'next/server';
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

// PUT (update) the assignment of a specific delivery
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Validate input
    if (!body.userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find the delivery index
    const deliveryIndex = deliveries.findIndex((d) => d.id === id);

    if (deliveryIndex === -1) {
      return NextResponse.json(
        { error: 'Delivery not found' },
        { status: 404 }
      );
    }

    // Update the delivery assignment
    const updatedDelivery = {
      ...deliveries[deliveryIndex],
      assignedTo: body.userId,
      status: DeliveryStatus.ASSIGNED,
      updatedAt: new Date().toISOString(),
    };

    deliveries[deliveryIndex] = updatedDelivery;

    return NextResponse.json(updatedDelivery, { status: 200 });
  } catch (error) {
    console.error('Error assigning delivery:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
