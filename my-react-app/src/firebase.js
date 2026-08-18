import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmGbRVXblF7OG3OzVYgIzicW8yh62KJTY",
  authDomain: "first-lesson-c0b44.firebaseapp.com",
  projectId: "first-lesson-c0b44",
  storageBucket: "first-lesson-c0b44.firebasestorage.app",
  messagingSenderId: "540446046129",
  appId: "1:540446046129:web:c4b154622820aefd21af90",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
