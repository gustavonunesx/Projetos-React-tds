import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import {
collection,
getDocs,
addDoc,
updateDoc,
deleteDoc,
doc,
} from "firebase/firestore";
export default function Crud() {
const [items, setItems] = useState([]);
const [input, setInput] = useState("");
const [editingId, setEditingId] = useState(null);
const itemsCollection = collection(db, "items");
const fetchItems = async () => {
try {
const data = await getDocs(itemsCollection);
setItems(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
} catch (error) {
console.error("Erro ao buscar itens:", error);
}
};
useEffect(() => {
fetchItems();
}, []);

const handleAdd = async () => {
if (input.trim() === "") return;
await addDoc(itemsCollection, { name: input });
setInput("");
fetchItems();
};
const handleUpdate = async () => {
if (input.trim() === "") return;
const itemDoc = doc(db, "items", editingId);
await updateDoc(itemDoc, { name: input });
setInput("");
setEditingId(null);
fetchItems();
};
const handleDelete = async (id) => {
const itemDoc = doc(db, "items", id);
await deleteDoc(itemDoc);
fetchItems();
};
const startEdit = (item) => {
setEditingId(item.id);
setInput(item.name);
};
return (
<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
<h1>CRUD Meu App</h1>
<div style={{ marginBottom: "10px" }}>
<input
type="text"
placeholder="Digite um item"
value={input}
onChange={(e) => setInput(e.target.value)}
style={{ padding: "5px", marginRight: "5px" }}
/>
{editingId ? (
<button onClick={handleUpdate}>Atualizar</button>
) : (
<button onClick={handleAdd}>Adicionar</button>
)}
</div>

<ul>
{items.length === 0 ? (
<li>Nenhum item encontrado</li>
) : (
items.map((item) => (
<li key={item.id} style={{ marginBottom: "5px" }}>
{item.name}{" "}
<button onClick={() => startEdit(item)}>Editar</button>{" "}
<button onClick={() => handleDelete(item.id)}>Deletar</button>
</li>
))
)}
</ul>
</div>
);
}