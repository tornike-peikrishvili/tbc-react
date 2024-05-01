import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_KEY } from "@/constants";
import { createI18nMiddleware } from "next-international/middleware";

export default function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const auth = request.cookies.get(AUTH_COOKIE_KEY);
  if (!auth?.value && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (auth?.value && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return I18nMiddleware(request);
}

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "ka"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
