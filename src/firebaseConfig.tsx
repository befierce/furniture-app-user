
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCZTUUzbf7tqWw7OQ3r9DRxogSuttgPLbA",
  authDomain: "furniture-web-app-ef64f.firebaseapp.com",
  projectId: "furniture-web-app-ef64f",
  storageBucket: "furniture-web-app-ef64f.firebasestorage.app",
  messagingSenderId: "231402089570",
  appId: "1:231402089570:web:26b5243a6b6a09c712753b",
  measurementId: "G-1QQNEZ6Z5S"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
