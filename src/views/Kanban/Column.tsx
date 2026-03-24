import React from 'react';
import { Status, Task } from '../../types/task';
import TaskCard from './TaskCard';

interface ColumnProps {
  status: Status;
  tasks: Task[];
  dragTaskId: string | null;
  dragPlaceholderHeight: number | null;
  activeDropStatus: Status | null;
  onTaskPointerDown: (
    event: React.PointerEvent<HTMLElement>,
    task: Task
  ) => void;
}

const Column: React.FC<ColumnProps> = ({
  status,
  tasks,
  dragTaskId,
  dragPlaceholderHeight,
  activeDropStatus,
  onTaskPointerDown,
}) => {
  const isDragging = dragTaskId !== null;
  const isActiveDrop = activeDropStatus === status;

  return (
    <section
      data-drop-status={status}
      style={{
        flex: 1,
        minWidth: '240px',
        border: '1px solid #d1d5db',
        height: '520px',
        backgroundColor: isActiveDrop
          ? '#dbeafe'
          : isDragging
            ? '#f8fafc'
            : '#ffffff',
        boxShadow: isActiveDrop ? 'inset 0 0 0 2px #2563eb' : 'none',
      }}
    >
      <div
        style={{
          padding: '12px',
          borderBottom: '1px solid #d1d5db',
          fontWeight: 600,
        }}
      >
        {status} ({tasks.length})
      </div>
      <div
        style={{
          padding: '12px',
          height: '460px',
          overflowY: 'auto',
        }}
      >
        {tasks.length === 0 ? (
          <div>No tasks</div>
        ) : (
          tasks.map((task) =>
            task.id === dragTaskId ? (
              <div
                key={task.id}
                style={{
                  height: `${dragPlaceholderHeight ?? 148}px`,
                  marginBottom: '12px',
                  border: '1px dashed #94a3b8',
                  backgroundColor: '#f8fafc',
                }}
              />
            ) : (
              <TaskCard
                key={task.id}
                task={task}
                onPointerDown={onTaskPointerDown}
              />
            )
          )
        )}
      </div>
    </section>
  );
};

export default Column;
