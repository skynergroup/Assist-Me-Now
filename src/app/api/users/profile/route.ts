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
    phone: '+27123456789',
  },
  {
    id: '2',
    username: 'staff',
    password: 'password123',
    email: 'staff@assistmenow.org',
    role: 'STAFF',
    firstName: 'Staff',
    lastName: 'User',
    phone: '+27987654321',
  },
];

// GET user profile
export async function GET(request: NextRequest) {
  try {
    // In a real app, we would get the user ID from the authenticated session
    const userId = '1'; // Mock admin user
    
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Don't return the password
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT (update) user profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, we would get the user ID from the authenticated session
    const userId = '1'; // Mock admin user
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      firstName: body.firstName || users[userIndex].firstName,
      lastName: body.lastName || users[userIndex].lastName,
      email: body.email || users[userIndex].email,
      phone: body.phone || users[userIndex].phone,
    };
    
    // Don't return the password
    const { password, ...userWithoutPassword } = users[userIndex];
    
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
