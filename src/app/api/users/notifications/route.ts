import { NextRequest, NextResponse } from 'next/server';

// Mock notification settings for local development
const notificationSettings = {
  '1': { // Admin user
    email: {
      deliveryUpdates: true,
      newHampers: true,
      recipientUpdates: false,
    },
    sms: {
      deliveryUpdates: false,
      urgentNotifications: true,
    },
  },
  '2': { // Staff user
    email: {
      deliveryUpdates: true,
      newHampers: false,
      recipientUpdates: true,
    },
    sms: {
      deliveryUpdates: true,
      urgentNotifications: true,
    },
  },
};

// GET notification settings
export async function GET(request: NextRequest) {
  try {
    // In a real app, we would get the user ID from the authenticated session
    const userId = '1'; // Mock admin user
    
    const settings = notificationSettings[userId];
    
    if (!settings) {
      return NextResponse.json(
        { error: 'Notification settings not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT (update) notification settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, we would get the user ID from the authenticated session
    const userId = '1'; // Mock admin user
    
    // Update notification settings
    notificationSettings[userId] = {
      email: {
        deliveryUpdates: body.email?.deliveryUpdates ?? notificationSettings[userId].email.deliveryUpdates,
        newHampers: body.email?.newHampers ?? notificationSettings[userId].email.newHampers,
        recipientUpdates: body.email?.recipientUpdates ?? notificationSettings[userId].email.recipientUpdates,
      },
      sms: {
        deliveryUpdates: body.sms?.deliveryUpdates ?? notificationSettings[userId].sms.deliveryUpdates,
        urgentNotifications: body.sms?.urgentNotifications ?? notificationSettings[userId].sms.urgentNotifications,
      },
    };
    
    return NextResponse.json(
      { 
        message: 'Notification settings updated successfully',
        settings: notificationSettings[userId],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating notification settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
