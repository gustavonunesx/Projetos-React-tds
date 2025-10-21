import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export async function registrarPresenca(alunoId, turmaId, presente) {
  await addDoc(collection(db, "frequencias"), {
    alunoId,
    turmaId,
    data: new Date(),
    presente
  });
}

export async function listarFrequenciasPorAluno(alunoId) {
  const q = query(collection(db, "frequencias"), where("alunoId", "==", alunoId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
