import { NextRequest, NextResponse } from "next/server";
import { apiUrl } from "./config/constants";

const VERIFY_TOKEN_API = `${apiUrl}/user/me`;

async function verifyToken(token: string) {
  try {
    const response = await fetch(VERIFY_TOKEN_API, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    });

    if (!response.ok) throw new Error("Token verification failed");
    return await response.json();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith("/secure/admin");
  const isSignInRoute = pathname === "/secure/login";

  // Get token from either Authorization header or cookie
  let token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    token = req.cookies.get("auth_token")?.value;
  }

  // If user is authenticated and tries to access sign-in, redirect to dashboard
  if (token && isSignInRoute) {
    return NextResponse.redirect(new URL("/secure/admin", req.url));
  }

  // Protect auth routes
  if (isAuthRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/secure/login", req.url));
    }

    const isValidToken = await verifyToken(token);
    if (!isValidToken) {
      // Clear invalid token cookie
      const response = NextResponse.redirect(new URL("/secure/login", req.url));
      response.cookies.delete("auth_token");
      return response;
    }

    // Add token to headers for API routes
    // if (pathname.startsWith("/dashboard/api")) {
    //   const response = NextResponse.next();
    //   response.headers.set("Authorization", `Bearer ${token}`);
    //   return response;
    // }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/secure/admin/:path*", "/secure/login"],
};