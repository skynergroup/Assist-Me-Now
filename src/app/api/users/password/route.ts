import { NextRequest, NextResponse } from 'next/server';

// Mock user data for local development
const users = [
  {
    id: '1',
    username: 'admin',
    password: 'password123',
    email: 'admin@assistmenow.org',
    role: 'ADMIN',
    firstName: 'Admin',
    lastName: 'User',
  },
  {
    id: '2',
    username: 'staff',
    password: 'password123',
    email: 'staff@assistmenow.org',
    role: 'STAFF',
    firstName: 'Staff',
    lastName: 'User',
  },
];

// PUT (update) user password
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.currentPassword || !body.newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }
    
    // In a real app, we would get the user ID from the authenticated session
    const userId = '1'; // Mock admin user
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if current password is correct
    if (users[userIndex].password !== body.currentPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }
    
    // Update password
    users[userIndex].password = body.newPassword;
    
    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
