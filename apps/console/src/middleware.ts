import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Allow localhost, staging, and production
  const allowed = [
    "localhost",
    "127.0.0.1",
    "console.aerwave.stg",
    "console.aerwave.ai",
  ];

  const isAllowed = allowed.some((h) => hostname.startsWith(h));

  if (!isAllowed) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  // In production: check for super_admin role in JWT
  // const token = request.cookies.get("session")?.value;
  // if (!token) return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
