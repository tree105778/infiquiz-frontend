import { type NextRequest, NextResponse } from 'next/server';

const PUBLIC = ['/', '/login', '/topics'];

export default function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (PUBLIC.includes(path)) return NextResponse.next();

  const hasSession = req.cookies
    .getAll()
    .some((c) => c.name.startsWith('sb-') && c.name.includes('-auth-token'));

  if (!hasSession) {
    const url = new URL('/login', req.url);
    url.searchParams.set('return_to', path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
