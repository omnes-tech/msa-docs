import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /docs to /docs/en
  if (pathname === '/docs' || pathname === '/docs/') {
    return NextResponse.redirect(new URL('/docs/en/index', request.url));
  }

  // Handle /docs/en or /docs/pt (without trailing slash) - redirect to index
  if (pathname === '/docs/en' || pathname === '/docs/pt') {
    const locale = pathname === '/docs/en' ? 'en' : 'pt';
    return NextResponse.redirect(new URL(`/docs/${locale}/index`, request.url));
  }

  // Only redirect old /docs/* routes to /docs/en/* for truly old routes
  // Be very conservative to avoid interfering with Fumadocs internal navigation
  if (pathname.startsWith('/docs/') && !pathname.startsWith('/docs/en/') && !pathname.startsWith('/docs/pt/')) {
    const slug = pathname.replace('/docs/', '');

    // Only redirect if it's a simple slug without subdirectories (old API routes)
    // This avoids interfering with complex paths that Fumadocs might generate
    if (slug && slug !== '/' && !slug.includes('/') && slug !== 'index') {
      return NextResponse.redirect(new URL(`/docs/en/${slug}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/docs/:path*',
  ],
};

