// lib/firebaseAdmin.js
import admin from 'firebase-admin';
import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import serviceAccount from './firebase-adminsdk.json';
export const verifyIdToken = async (token: any) => {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
};


const firebaseAdminConfig = {
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
      //databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      //storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}

