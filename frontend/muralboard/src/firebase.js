// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6TEeHJV5YaRat0N_Kp1QE-Vb_mAJsIGw",
  authDomain: "muralboard.firebaseapp.com",
  projectId: "muralboard",
  storageBucket: "muralboard.firebasestorage.app",
  messagingSenderId: "182291279239",
  appId: "1:182291279239:web:ca8293b569bc011cd73722"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };