import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC35f9lkpbktyGl21kvwBrvMhQ7lAb1jzk",
  authDomain: "booking-4e6cd.firebaseapp.com",
  projectId: "booking-4e6cd",
  storageBucket: "booking-4e6cd.firebasestorage.app",
  messagingSenderId: "350528923244",
  appId: "1:350528923244:web:21c4a5cb8563604bde1a49"
};

const app = initializeApp(firebaseConfig);

// Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;