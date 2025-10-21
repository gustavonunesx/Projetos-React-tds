import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function cadastrarAluno(dados, foto) {
  try {
    let fotoUrl = "";
    if (foto) {
      const storageRef = ref(storage, `alunos/${foto.name}`);
      await uploadBytes(storageRef, foto);
      fotoUrl = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db, "alunos"), { ...dados, fotoUrl });
  } catch (e) {
    console.error("Erro ao cadastrar aluno:", e);
  }
}

export async function listarAlunos() {
  const snapshot = await getDocs(collection(db, "alunos"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function atualizarAluno(id, novosDados) {
  await updateDoc(doc(db, "alunos", id), novosDados);
}

export async function excluirAluno(id) {
  await deleteDoc(doc(db, "alunos", id));
}
