// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vu-blog-4a660.firebaseapp.com",
  projectId: "vu-blog-4a660",
  storageBucket: "vu-blog-4a660.appspot.com",
  messagingSenderId: "750162614814",
  appId: "1:750162614814:web:2de891798e0c6fed36ac0f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
