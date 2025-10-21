import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

// CREATE
export async function criarRecado(titulo, mensagem, categoria) {
  try {
    await addDoc(collection(db, "recados"), {
      titulo,
      mensagem,
      categoria,
      data: new Date()
    });
  } catch (e) {
    console.error("Erro ao criar recado:", e);
  }
}

// READ (tempo real)
export function escutarRecados(callback) {
  const q = query(collection(db, "recados"), orderBy("data", "desc"));
  onSnapshot(q, (snapshot) => {
    const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(lista);
  });
}

// UPDATE
export async function editarRecado(id, novosDados) {
  try {
    await updateDoc(doc(db, "recados", id), novosDados);
  } catch (e) {
    console.error("Erro ao editar recado:", e);
  }
}

// DELETE
export async function excluirRecado(id) {
  try {
    await deleteDoc(doc(db, "recados", id));
  } catch (e) {
    console.error("Erro ao excluir recado:", e);
  }
}
