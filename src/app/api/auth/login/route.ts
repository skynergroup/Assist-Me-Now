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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Find the user
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Create a session token (in a real app, this would be a JWT)
    const token = btoa(JSON.stringify({ id: user.id, username: user.username }));

    // Create the response
    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
      },
      { status: 200 }
    );

    // Set the token as a cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
