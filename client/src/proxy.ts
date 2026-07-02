import { NextRequest, NextResponse } from "next/server";
import { apiUrl } from "./config/constants";
import { AUTH_COOKIE, DONOR_DEFAULT_REDIRECT } from "./lib/auth/constants";

const VERIFY_TOKEN_API = `${apiUrl}/user/me`;

const donorProtectedMatchers = [
  "/user/donations",
  "/user/regular-donations",
  "/user/subscriptions",
  "/user/profile",
  "/user/donation-dashboard",
];

async function verifyToken(token: string) {
  try {
    const response = await fetch(VERIFY_TOKEN_API, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Token verification failed");
    return await response.json();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

function isDonorProtectedPath(pathname: string) {
  return donorProtectedMatchers.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export default async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith("/secure/admin");
  const isSignInRoute = pathname === "/secure/login";
  const isDonorProtected = isDonorProtectedPath(pathname);

  let token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    token = req.cookies.get(AUTH_COOKIE)?.value;
  }

  if (isDonorProtected) {
    if (!token) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/user";
      loginUrl.searchParams.set("redirect", pathname || DONOR_DEFAULT_REDIRECT);
      return NextResponse.redirect(loginUrl);
    }

    const isValidToken = await verifyToken(token);
    if (!isValidToken) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/user";
      loginUrl.searchParams.set("redirect", pathname || DONOR_DEFAULT_REDIRECT);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(AUTH_COOKIE);
      return response;
    }

    return NextResponse.next();
  }

  if (token && isSignInRoute) {
    return NextResponse.redirect(new URL("/secure/admin", req.url));
  }

  if (isAuthRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/secure/login", req.url));
    }

    const isValidToken = await verifyToken(token);
    if (!isValidToken) {
      const response = NextResponse.redirect(new URL("/secure/login", req.url));
      response.cookies.delete(AUTH_COOKIE);
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/secure/admin/:path*",
    "/secure/login",
    "/user/donations/:path*",
    "/user/regular-donations/:path*",
    "/user/subscriptions/:path*",
    "/user/profile/:path*",
    "/user/donation-dashboard/:path*",
  ],
};
