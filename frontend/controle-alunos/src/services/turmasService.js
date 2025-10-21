import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

export async function cadastrarTurma(dados) {
  try {
    await addDoc(collection(db, "turmas"), dados);
  } catch (e) {
    console.error("Erro ao cadastrar turma:", e);
  }
}

export async function listarTurmas() {
  const snapshot = await getDocs(collection(db, "turmas"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function excluirTurma(id) {
  await deleteDoc(doc(db, "turmas", id));
}
