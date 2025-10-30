// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBD0xaH28H4Zlb9TcvblfchWdyzDASW980",
  authDomain: "meuappfirebase-352bc.firebaseapp.com",
  projectId: "meuappfirebase-352bc",
  storageBucket: "meuappfirebase-352bc.appspot.com", // ✅ Corrigido
  messagingSenderId: "132913225073",
  appId: "1:132913225073:web:376cfd877f6b1ab8556ad0"
};

// 🔥 Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Inicializa a autenticação e exporta
export const auth = getAuth(app);

// (opcional) exporta o app se quiser usar em outro lugar
export default app;
