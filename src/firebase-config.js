// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgkeZTdsNgoElU0CAUa6qc-1hGqkxMHU4",
  authDomain: "blog-platform-ac1c1.firebaseapp.com",
  projectId: "blog-platform-ac1c1",
  storageBucket: "blog-platform-ac1c1.appspot.com",
  messagingSenderId: "792994168745",
  appId: "1:792994168745:web:a4fc45eb7d73833210ceb8",
  measurementId: "G-KT6WZZ49K4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize FireStore
export const db = getFirestore(app);
