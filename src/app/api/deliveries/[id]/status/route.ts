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

// PUT (update) the status of a specific delivery
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Validate input
    if (!body.status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Check if the status is valid
    if (!Object.values(DeliveryStatus).includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
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

    // Update the delivery status
    const updatedDelivery = {
      ...deliveries[deliveryIndex],
      status: body.status,
      updatedAt: new Date().toISOString(),
    };

    // If the status is DELIVERED, set the delivery date
    if (body.status === DeliveryStatus.DELIVERED) {
      updatedDelivery.deliveryDate = new Date().toISOString();
    }

    deliveries[deliveryIndex] = updatedDelivery;

    return NextResponse.json(updatedDelivery, { status: 200 });
  } catch (error) {
    console.error('Error updating delivery status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
