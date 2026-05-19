import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC83MSA4BhFUYayLN6UPtbCSZb82DNDr8E",
  authDomain: "socialpulse-rohit.firebaseapp.com",
  projectId: "socialpulse-rohit",
  storageBucket: "socialpulse-rohit.firebasestorage.app",
  messagingSenderId: "715875777947",
  appId: "1:715875777947:web:0ddcc9a54193da6edbb53e",
  measurementId: "G-E3YQJWNC3V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);