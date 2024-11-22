// lib/firebaseAdmin.js
import admin from 'firebase-admin';
import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
//import serviceAccount from './firebase-adminsdk.json';
const firebaseConfig = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};
export const verifyIdToken = async (token: any) => {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
};


const firebaseAdminConfig = {
    credential: admin.credential.cert(firebaseConfig as ServiceAccount),
      //databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      //storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}

