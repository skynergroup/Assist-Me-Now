import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For local development, we'll disable authentication checks
  // In a real application with AWS Cognito, we would verify the JWT token here

  // Just pass through all requests for now
  return NextResponse.next();

  /* Uncomment this for production with real authentication
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path.startsWith('/auth/') || path === '/';

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value || '';

  // If the path is not public and there's no token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If the path is login/register and there's a token, redirect to dashboard
  if (isPublicPath && token && path !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
  */
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
