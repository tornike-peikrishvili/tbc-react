import { NextResponse } from "next/server";
import { AUTH_COOKIE_KEY } from "@/constants";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const auth = request.cookies.get(AUTH_COOKIE_KEY);
  if (!auth?.value && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (auth?.value && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return undefined;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
