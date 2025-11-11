import React, { useState } from 'react';

// O formulário recebe a função 'onAddTask' como prop
function TaskForm({ onAddTask }) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !categoria) {
      alert("Por favor, preencha o título e a categoria.");
      return;
    }
    // Chama a função passada por prop, enviando os dados
    onAddTask({ titulo, categoria });
    // Limpa o formulário
    setTitulo('');
    setCategoria('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título da Tarefa"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoria (ex: reciclagem)"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TaskForm;