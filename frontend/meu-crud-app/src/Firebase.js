// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtPSXIeiRHTvoNiGqGyxUi43x-Aip79Vs",
  authDomain: "projetotds-8f456.firebaseapp.com",
  projectId: "projetotds-8f456",
  storageBucket: "projetotds-8f456.firebasestorage.app",
  messagingSenderId: "564906986283",
  appId: "1:564906986283:web:78c82134836382330b136e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);