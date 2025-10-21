import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAetbx2yTY3kLYru0txvLzP-6omKZu7mew",
  authDomain: "myapp-crud-411be.firebaseapp.com",
  projectId: "myapp-crud-411be",
  storageBucket: "myapp-crud-411be.firebasestorage.app",
  messagingSenderId: "277147848651",
  appId: "1:277147848651:web:a2bd0411a0d10b7e77f04e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
