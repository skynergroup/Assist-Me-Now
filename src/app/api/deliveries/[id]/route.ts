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

// GET a specific delivery by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const delivery = deliveries.find((d) => d.id === id);

    if (!delivery) {
      return NextResponse.json(
        { error: 'Delivery not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(delivery, { status: 200 });
  } catch (error) {
    console.error('Error fetching delivery:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT (update) a specific delivery by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Find the delivery index
    const deliveryIndex = deliveries.findIndex((d) => d.id === id);

    if (deliveryIndex === -1) {
      return NextResponse.json(
        { error: 'Delivery not found' },
        { status: 404 }
      );
    }

    // Update the delivery
    const updatedDelivery = {
      ...deliveries[deliveryIndex],
      hamperId: body.hamperId || deliveries[deliveryIndex].hamperId,
      recipientId: body.recipientId || deliveries[deliveryIndex].recipientId,
      status: body.status || deliveries[deliveryIndex].status,
      assignedTo: body.assignedTo !== undefined ? body.assignedTo : deliveries[deliveryIndex].assignedTo,
      scheduledDate: body.scheduledDate !== undefined ? body.scheduledDate : deliveries[deliveryIndex].scheduledDate,
      deliveryDate: body.deliveryDate !== undefined ? body.deliveryDate : deliveries[deliveryIndex].deliveryDate,
      notes: body.notes !== undefined ? body.notes : deliveries[deliveryIndex].notes,
      updatedAt: new Date().toISOString(),
    };

    deliveries[deliveryIndex] = updatedDelivery;

    return NextResponse.json(updatedDelivery, { status: 200 });
  } catch (error) {
    console.error('Error updating delivery:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE a specific delivery by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Find the delivery index
    const deliveryIndex = deliveries.findIndex((d) => d.id === id);

    if (deliveryIndex === -1) {
      return NextResponse.json(
        { error: 'Delivery not found' },
        { status: 404 }
      );
    }

    // Remove the delivery
    deliveries.splice(deliveryIndex, 1);

    return NextResponse.json(
      { message: 'Delivery deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting delivery:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
