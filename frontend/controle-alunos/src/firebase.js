// Importa o núcleo do Firebase
import { initializeApp } from "firebase/app";
// Importa o Firestore (banco de dados)
import { getFirestore, initializeFirestore } from "firebase/firestore";

// Configuração do seu projeto (copiada do painel do Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyCoBsb12-d2-q3c2AphqAusBHeHAhopTeQ",
  authDomain: "controle-de-alunos-4ddd1.firebaseapp.com",
  projectId: "controle-de-alunos-4ddd1",
  storageBucket: "controle-de-alunos-4ddd1.firebasestorage.app",
  messagingSenderId: "145459005179",
  appId: "1:145459005179:web:0356df1580c11cb404925e"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Inicializa o Firestore com compatibilidade para o ambiente local (Vite)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Corrige problemas de streaming no localhost
  useFetchStreams: false,
});

// ✅ Exporta também o app (caso precise usar outros serviços futuramente)
export default app;
