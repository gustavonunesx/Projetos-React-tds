import React from 'react';

// Recebe a tarefa individual e as funções de update e delete
function TaskItem({ task, onUpdateStatus, onDeleteTask }) {
  
  const handleCheckboxChange = () => {
    // Chama a função de update, passando o ID e o *novo* status
    onUpdateStatus(task.id, !task.status);
  };

  const handleDeleteClick = () => {
    // Chama a função de delete
    onDeleteTask(task.id);
  };

  return (
    <li className="task-item">
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.status}
          onChange={handleCheckboxChange}
        />
        <span className={task.status ? 'completed' : ''}>
          {task.titulo}
        </span>
      </div>
      <span className="task-category">{task.categoria}</span>
      <button onClick={handleDeleteClick}>Excluir</button>
    </li>
  );
}

export default TaskItem;