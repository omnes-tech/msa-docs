import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /docs to /docs/en
  if (pathname === '/docs' || pathname === '/docs/') {
    return NextResponse.redirect(new URL('/docs/en', request.url));
  }

  // Redirect old /docs/* routes to /docs/en/*
  if (pathname.startsWith('/docs/') && !pathname.startsWith('/docs/en/') && !pathname.startsWith('/docs/pt/')) {
    const slug = pathname.replace('/docs/', '');
    return NextResponse.redirect(new URL(`/docs/en/${slug}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/docs/:path*',
  ],
};

