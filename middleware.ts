import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { sql } from "@vercel/postgres";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "ka"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession();
  const user = session?.user;

  // Profile Completion
  if (user) {
    const userId = user.sub;
    const { rows } =
      await sql`SELECT profile_complete FROM users WHERE user_id = ${userId}`;

    if (rows.length > 0 && rows[0].profile_complete) {
      if (pathname === "/profile-completion") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else {
      if (pathname !== "/profile-completion") {
        return NextResponse.redirect(
          new URL("/profile-completion", request.url),
        );
      }
    }
  } else {
    if (pathname === "/profile-completion") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Admin
  if (!user && pathname === "/admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (user && !user.role.includes("Admin") && pathname === "/admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
