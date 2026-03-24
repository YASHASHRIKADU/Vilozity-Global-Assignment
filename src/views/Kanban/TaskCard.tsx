import React from 'react';
import { Priority, Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  dragging?: boolean;
  onPointerDown?: (
    event: React.PointerEvent<HTMLElement>,
    task: Task
  ) => void;
}

const priorityColors: Record<Priority, string> = {
  Critical: '#dc2626',
  High: '#ea580c',
  Medium: '#ca8a04',
  Low: '#16a34a',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function isOverdue(dueDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  return due < today;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  dragging = false,
  onPointerDown,
}) => {
  const overdue = isOverdue(task.dueDate);

  return (
    <article
      onPointerDown={onPointerDown ? (event) => onPointerDown(event, task) : undefined}
      style={{
        border: '1px solid #d1d5db',
        padding: '12px',
        marginBottom: '12px',
        backgroundColor: '#ffffff',
        opacity: dragging ? 0.45 : 1,
        boxShadow: dragging ? '0 10px 24px rgba(0, 0, 0, 0.18)' : 'none',
        cursor: onPointerDown ? 'grab' : 'default',
        touchAction: 'none',
      }}
    >
      <div style={{ marginBottom: '8px', fontWeight: 600 }}>{task.title}</div>
      <div style={{ marginBottom: '8px' }}>
        <span
          style={{
            display: 'inline-block',
            minWidth: '32px',
            padding: '4px 0',
            textAlign: 'center',
            border: '1px solid #9ca3af',
          }}
        >
          {getInitials(task.assignee)}
        </span>
      </div>
      <div style={{ marginBottom: '8px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 8px',
            color: '#ffffff',
            backgroundColor: priorityColors[task.priority],
          }}
        >
          {task.priority}
        </span>
      </div>
      <div style={{ color: overdue ? '#dc2626' : undefined }}>
        Due: {task.dueDate}
      </div>
    </article>
  );
};

export default TaskCard;
