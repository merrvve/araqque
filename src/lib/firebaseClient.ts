// lib/firebaseClient.ts
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useUserStore } from '../stores/userStore'; // Import Zustand store



// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign-in with email and password
export const signInWithEmailPassword = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const { user } = result;
 
  const idTokenResult = await user.getIdTokenResult();
  const role = idTokenResult.claims.role || 'student'; // Default to 'student' if no role is found

  // Store user in Zustand
  useUserStore.getState().setUser({
    id: user.uid,
    email: user.email || '',
    name: user.displayName || '',
    role: role
  });

};

// Sign-in with Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const idTokenResult = await user.getIdTokenResult();
  const role = idTokenResult.claims.role || 'student';
  // Store user in Zustand
  useUserStore.getState().setUser({
    id: user.uid,
    email: user.email || '',
    name: user.displayName || '',
    role,
  });

};

export { auth };
