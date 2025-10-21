import "./styles/style.css";
import FormRecado from "./components/FormRecado";
import ListaRecados from "./components/ListaRecados";

export default function App() {
  return (
    <div className="container">
      <h1>📋 MuralBoard</h1>
      <FormRecado />
      <ListaRecados />
    </div>
  );
}
