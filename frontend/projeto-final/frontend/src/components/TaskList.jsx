import React from 'react';
import TaskItem from './TaskItem';

// Recebe a lista de tarefas e as funções
function TaskList({ tasks, onUpdateStatus, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p>Nenhuma tarefa cadastrada ainda.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // Passa a tarefa e as funções para o componente TaskItem
        <TaskItem
          key={task.id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;