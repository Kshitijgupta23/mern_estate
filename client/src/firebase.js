// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dreamestate-68e21.firebaseapp.com",
  projectId: "dreamestate-68e21",
  storageBucket: "dreamestate-68e21.appspot.com",
  messagingSenderId: "952771202811",
  appId: "1:952771202811:web:30bc31cd00fdcb9d44ea5e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);