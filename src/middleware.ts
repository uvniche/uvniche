import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Create response
  const response = NextResponse.next()
  
  // Add performance headers
  response.headers.set('X-Robots-Tag', 'index, follow')
  
  // Enable edge caching for static assets
  if (request.nextUrl.pathname.startsWith('/_next/static/') || 
      request.nextUrl.pathname.endsWith('.ico') ||
      request.nextUrl.pathname.endsWith('.jpeg') ||
      request.nextUrl.pathname.endsWith('.jpg') ||
      request.nextUrl.pathname.endsWith('.png') ||
      request.nextUrl.pathname.endsWith('.webp') ||
      request.nextUrl.pathname.endsWith('.avif')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // Optimize main page caching
  if (request.nextUrl.pathname === '/') {
    response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400')
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
