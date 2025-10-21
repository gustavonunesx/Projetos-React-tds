import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export async function lancarNota(alunoId, disciplinaId, bimestre, nota1, nota2) {
  const media = (parseFloat(nota1) + parseFloat(nota2)) / 2;
  const aprovado = media >= 6;
  await addDoc(collection(db, "notas"), {
    alunoId,
    disciplinaId,
    bimestre,
    nota1,
    nota2,
    media,
    aprovado
  });
}

export async function listarNotasPorAluno(alunoId) {
  const q = query(collection(db, "notas"), where("alunoId", "==", alunoId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
