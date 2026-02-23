import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Create response
  const response = NextResponse.next()
  
  // Add performance headers
  response.headers.set('X-Robots-Tag', 'index, follow')
  
  // Long cache only for hashed/static assets (browser can cache; updates use new URLs)
  if (request.nextUrl.pathname.startsWith('/_next/static/') || 
      request.nextUrl.pathname.endsWith('.ico') ||
      request.nextUrl.pathname.endsWith('.jpeg') ||
      request.nextUrl.pathname.endsWith('.jpg') ||
      request.nextUrl.pathname.endsWith('.png') ||
      request.nextUrl.pathname.endsWith('.webp') ||
      request.nextUrl.pathname.endsWith('.avif') ||
      request.nextUrl.pathname.startsWith('/fonts/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else {
    // Documents and app routes: always revalidate so deploys show up without hard refresh
    response.headers.set('Cache-Control', 'private, max-age=0, must-revalidate')
  }
  
  // Early Hints for root only
  if (request.nextUrl.pathname === '/') {
    response.headers.set('Link', '</fonts/inter-latin-400.woff2>; rel=preload; as=font; type=font/woff2; crossorigin, </pfp.avif>; rel=preload; as=image; fetchpriority=high')
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
