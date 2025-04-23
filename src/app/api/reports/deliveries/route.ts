import { NextRequest, NextResponse } from 'next/server';
import { DeliveryStatus } from '@/types';

// Mock delivery data for local development
const deliveries = [
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
  {
    id: '3',
    hamperId: '1',
    recipientId: '2',
    status: DeliveryStatus.IN_TRANSIT,
    assignedTo: '2',
    scheduledDate: '2023-05-18T13:00:00Z',
    deliveryDate: null,
    notes: 'On the way',
    createdBy: '1',
    createdAt: '2023-05-15T10:00:00Z',
    updatedAt: '2023-05-18T13:00:00Z',
  },
  {
    id: '4',
    hamperId: '2',
    recipientId: '1',
    status: DeliveryStatus.FAILED,
    assignedTo: '2',
    scheduledDate: '2023-05-16T09:00:00Z',
    deliveryDate: null,
    notes: 'Recipient not available',
    createdBy: '1',
    createdAt: '2023-05-14T11:00:00Z',
    updatedAt: '2023-05-16T09:30:00Z',
  },
  {
    id: '5',
    hamperId: '1',
    recipientId: '1',
    status: DeliveryStatus.DELIVERED,
    assignedTo: '2',
    scheduledDate: '2023-05-17T14:00:00Z',
    deliveryDate: '2023-05-17T14:45:00Z',
    notes: 'Delivered successfully',
    createdBy: '1',
    createdAt: '2023-05-15T09:00:00Z',
    updatedAt: '2023-05-17T14:45:00Z',
  },
];

// GET delivery report
export async function GET(request: NextRequest) {
  try {
    // Count deliveries by status
    const totalDeliveries = deliveries.length;
    const deliveredCount = deliveries.filter(d => d.status === DeliveryStatus.DELIVERED).length;
    const pendingCount = deliveries.filter(d => d.status === DeliveryStatus.PENDING).length;
    const failedCount = deliveries.filter(d => d.status === DeliveryStatus.FAILED).length;

    // Group deliveries by date
    const deliveriesByDate: Record<string, number> = {};
    
    deliveries.forEach(delivery => {
      const date = delivery.deliveryDate || delivery.scheduledDate;
      if (date) {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        deliveriesByDate[formattedDate] = (deliveriesByDate[formattedDate] || 0) + 1;
      }
    });

    // Create the report
    const report = {
      totalDeliveries,
      deliveredCount,
      pendingCount,
      failedCount,
      deliveriesByDate,
    };

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error('Error generating delivery report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
