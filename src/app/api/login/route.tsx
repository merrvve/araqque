import { auth } from "firebase-admin";
import { customInitApp } from "@/lib/firebaseAdmin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { useUserStore } from "@/stores/userStore"; // Import the Zustand store

// Initialize the Firebase Admin SDK
customInitApp();

export async function POST(request: NextRequest) {
  const authorization = headers().get("Authorization");

  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    try {
      const decodedToken = await auth().verifyIdToken(idToken);

      if (decodedToken) {
        const { uid, email, name, role } = decodedToken;

        // Generate a session cookie
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await auth().createSessionCookie(idToken, { expiresIn });

        // Set the session cookie on the response
        const cookieOptions = {
          name: "session",
          value: sessionCookie,
          httpOnly: true,
          secure: true,
          path: "/",
          maxAge: expiresIn / 1000, // maxAge in seconds
        };
        cookies().set(cookieOptions);

        // Optionally update Zustand store (if required in server-side logic)
        useUserStore.getState().setUser({
          id: uid,
          email: email || null,
          name: name || null,
          role: role || "student", // Default to "student" if role isn't provided
        });

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
      }
    } catch (error) {
      console.error("Error verifying ID token:", error);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.json(
    { error: "Authorization header is missing or malformed" },
    { status: 400 }
  );
}


export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";

  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  try {
    // Validate session cookie
    const decodedClaims = await auth().verifySessionCookie(session, true);

    if (decodedClaims) {
      // Update Zustand store with the user's data if it isn't already set
      const { uid, email, name, role } = decodedClaims;
      const userStore = useUserStore.getState();
      if (!userStore.isAuthenticated) {
        userStore.setUser({
          id: uid,
          email: email || null,
          name: name || null,
          role: role || "student", // Default to "student" if role isn't provided
        });
      }

      return NextResponse.json(
        { isLogged: true, user: { id: uid, email, name, role } },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return NextResponse.json(
      { isLogged: false, error: "Invalid or expired session" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { isLogged: false, error: "Unknown error" },
    { status: 500 }
  );
}
