import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()