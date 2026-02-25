import { NextRequest, NextResponse } from "next/server";

const RESERVED_SUBDOMAINS = new Set([
  "api", "console", "www", "voice", "cdn", "mail", "status",
]);

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Skip Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  let tenantSlug: string | null = null;

  // 1. Try x-forwarded-host header (production behind proxy)
  const forwardedHost = request.headers.get("x-forwarded-host");
  if (forwardedHost) {
    const sub = forwardedHost.split(".")[0];
    if (sub && !RESERVED_SUBDOMAINS.has(sub) && sub !== "aerwave") {
      tenantSlug = sub;
    }
  }

  // 2. Try host header directly
  if (!tenantSlug) {
    const host = request.headers.get("host") || "";
    const sub = host.split(".")[0];
    if (
      sub &&
      !RESERVED_SUBDOMAINS.has(sub) &&
      sub !== "aerwave" &&
      sub !== "localhost" &&
      !sub.match(/^\d+$/) // skip IP addresses
    ) {
      tenantSlug = sub;
    }
  }

  // 3. Local dev: support ?tenant=slug query param
  if (!tenantSlug) {
    tenantSlug = searchParams.get("tenant");
  }

  // No valid tenant -> redirect to main site
  if (!tenantSlug) {
    // In dev mode, allow access without tenant for convenience
    if (process.env.NODE_ENV === "development") {
      const headers = new Headers(request.headers);
      headers.set("x-tenant-slug", "demo");
      return NextResponse.next({ request: { headers } });
    }
    return NextResponse.redirect(new URL("https://aerwave.ai"));
  }

  // Set tenant slug header for downstream use
  const headers = new Headers(request.headers);
  headers.set("x-tenant-slug", tenantSlug);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
