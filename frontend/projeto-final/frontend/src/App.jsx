import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

// URL da nossa API (backend)
const API_URL = 'http://localhost:8800';

function App() {
  const [tasks, setTasks] = useState([]); // Estado para armazenar a lista de tarefas

  // --- 1. BUSCAR TAREFAS (READ) ---
  // useEffect para buscar as tarefas da API quando o componente carregar
  useEffect(() => {
    fetchTasks();
  }, []); // O array vazio [] faz com que rode apenas uma vez

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tarefas`);
      const data = await response.json();
      setTasks(data); // Atualiza o estado com as tarefas do backend
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // --- 2. ADICIONAR TAREFA (CREATE) ---
  const handleAddTask = async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/tarefas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData), // Envia { titulo, categoria }
      });
      const newTask = await response.json();
      // Adiciona a nova tarefa no início da lista (feedback visual imediato)
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  // --- 3. ATUALIZAR STATUS (UPDATE) ---
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await fetch(`${API_URL}/tarefas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }), // Envia { "status": true/false }
      });
      
      // Atualiza a lista localmente para refletir a mudança
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  // --- 4. DELETAR TAREFA (DELETE) ---
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tarefas/${id}`, {
        method: 'DELETE',
      });
      
      // Remove a tarefa da lista localmente
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  // Renderização do componente
  return (
    <div>
      <h1>♻️ EcoTasks - Gestor de Tarefas Sustentáveis</h1>
      
      {/* Passa a função de adicionar para o formulário */}
      <TaskForm onAddTask={handleAddTask} />
      
      {/* Passa a lista e as funções de update/delete para a lista */}
      <TaskList
        tasks={tasks}
        onUpdateStatus={handleUpdateStatus}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;