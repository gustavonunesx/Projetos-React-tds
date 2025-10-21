import { useEffect, useState } from "react";
import { escutarRecados } from "../services/firestoreService";
import RecadoItem from "./RecadoItem";

export default function ListaRecados() {
  const [recados, setRecados] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");

  useEffect(() => {
    escutarRecados(setRecados);
  }, []);

  const recadosFiltrados =
    categoriaFiltro === "Todos"
      ? recados
      : recados.filter((r) => r.categoria === categoriaFiltro);

  return (
    <div className="lista-recados">
      <h2>🧾 Mural de Recados</h2>
      <select
        className="filtro"
        value={categoriaFiltro}
        onChange={(e) => setCategoriaFiltro(e.target.value)}
      >
        <option>Todos</option>
        <option>Geral</option>
        <option>Agradecimento</option>
        <option>Aviso</option>
        <option>Sugestão</option>
      </select>

      {recadosFiltrados.length > 0 ? (
        recadosFiltrados.map((r) => <RecadoItem key={r.id} recado={r} />)
      ) : (
        <p>Nenhum recado encontrado.</p>
      )}
    </div>
  );
}
