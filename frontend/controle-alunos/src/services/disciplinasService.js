import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

// Cadastrar nova disciplina
export async function cadastrarDisciplina(dados) {
  try {
    await addDoc(collection(db, "disciplinas"), dados);
  } catch (e) {
    console.error("Erro ao cadastrar disciplina:", e);
  }
}

// Listar todas as disciplinas
export async function listarDisciplinas() {
  const snapshot = await getDocs(collection(db, "disciplinas"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Editar uma disciplina
export async function editarDisciplina(id, dadosAtualizados) {
  try {
    const ref = doc(db, "disciplinas", id);
    await updateDoc(ref, dadosAtualizados);
  } catch (e) {
    console.error("Erro ao editar disciplina:", e);
  }
}

// Excluir disciplina
export async function excluirDisciplina(id) {
  try {
    await deleteDoc(doc(db, "disciplinas", id));
  } catch (e) {
    console.error("Erro ao excluir disciplina:", e);
  }
}
