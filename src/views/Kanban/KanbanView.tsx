import React from 'react';
import { Status, Task } from '../../types/task';
import Column from './Column';
import TaskCard from './TaskCard';

interface KanbanViewProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: Status) => void;
}

interface DragState {
  task: Task;
  pointerX: number;
  pointerY: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  overStatus: Status | null;
}

const columns: Status[] = ['To Do', 'In Progress', 'In Review', 'Done'];

const KanbanView: React.FC<KanbanViewProps> = ({ tasks, onStatusChange }) => {
  const [dragState, setDragState] = React.useState<DragState | null>(null);

  const handleTaskPointerDown = (
    event: React.PointerEvent<HTMLElement>,
    task: Task
  ) => {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    event.preventDefault();

    setDragState({
      task,
      pointerX: event.clientX,
      pointerY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      width: rect.width,
      height: rect.height,
      overStatus: null,
    });
  };

  React.useEffect(() => {
    if (!dragState) {
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const target = document.elementFromPoint(event.clientX, event.clientY);
      const dropColumn = target?.closest('[data-drop-status]');
      const overStatus = dropColumn?.getAttribute('data-drop-status') as Status | null;

      setDragState((currentState) =>
        currentState
          ? {
              ...currentState,
              pointerX: event.clientX,
              pointerY: event.clientY,
              overStatus,
            }
          : null
      );
    };

    const handlePointerUp = () => {
      if (dragState.overStatus) {
        onStatusChange(dragState.task.id, dragState.overStatus);
      }

      setDragState(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [dragState, onStatusChange]);

  return (
    <div style={{ position: 'relative' }}>
      <h1>Kanban</h1>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
          overflowX: 'auto',
        }}
      >
        {columns.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            dragTaskId={dragState?.task.id ?? null}
            dragPlaceholderHeight={dragState?.height ?? null}
            activeDropStatus={dragState?.overStatus ?? null}
            onTaskPointerDown={handleTaskPointerDown}
          />
        ))}
      </div>
      {dragState && (
        <div
          style={{
            position: 'fixed',
            left: `${dragState.pointerX - dragState.offsetX}px`,
            top: `${dragState.pointerY - dragState.offsetY}px`,
            width: `${dragState.width}px`,
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
          <TaskCard task={dragState.task} dragging />
        </div>
      )}
    </div>
  );
};

export default KanbanView;
