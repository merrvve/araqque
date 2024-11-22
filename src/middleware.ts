import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define your protected routes
export const config = {
  matcher: ["/student/:path*"], // Protect all `/student` routes
};

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value;
  console.log(sessionCookie)
  // Redirect to login if the session cookie is missing
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Call your backend API to validate the session cookie
    const response = await fetch(`${request.nextUrl.origin}/api/login`, {
      method: "GET", // Use GET to check the session validity
      headers: {
        Cookie: `session=${sessionCookie}`, // Forward the session cookie
      },
    });
    const data = await response.json();
    console.log(data)
    // If the session is invalid, redirect to login
    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Proceed to the requested route if the session is valid
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // Redirect to login on any unexpected error
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
