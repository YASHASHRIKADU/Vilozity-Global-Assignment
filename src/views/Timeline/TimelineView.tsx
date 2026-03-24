import React from 'react';
import { Priority, Task } from '../../types/task';

interface TimelineViewProps {
  tasks: Task[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ tasks }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const dayCount = monthEnd.getDate();
  const cellWidth = 36;
  const labelWidth = 220;

  const priorityColors: Record<Priority, string> = {
    Critical: '#dc2626',
    High: '#ea580c',
    Medium: '#ca8a04',
    Low: '#16a34a',
  };

  const getDayNumber = (value: string): number => {
    const date = new Date(value);
    return date.getDate();
  };

  const bars = tasks.map((task) => {
    const dueDate = new Date(task.dueDate);
    const startDate = task.startDate ? new Date(task.startDate) : null;

    if (!startDate && (dueDate < monthStart || dueDate > monthEnd)) {
      return {
        task,
        visible: false,
        left: 0,
        width: 0,
        marker: false,
      };
    }

    if (!startDate) {
      const left = (getDayNumber(task.dueDate) - 1) * cellWidth + cellWidth / 2 - 6;

      return {
        task,
        visible: true,
        left,
        width: 12,
        marker: true,
      };
    }

    if (dueDate < monthStart || startDate > monthEnd) {
      return {
        task,
        visible: false,
        left: 0,
        width: 0,
        marker: false,
      };
    }

    const clampedStart = startDate < monthStart ? 1 : startDate.getDate();
    const clampedEnd = dueDate > monthEnd ? dayCount : dueDate.getDate();

    return {
      task,
      visible: true,
      left: (clampedStart - 1) * cellWidth,
      width: (clampedEnd - clampedStart + 1) * cellWidth,
      marker: false,
    };
  });

  return (
    <div>
      <h1>Timeline</h1>
      <div
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingBottom: '8px',
          scrollBehavior: 'smooth',
        }}
      >
        <div
          style={{
            position: 'relative',
            minWidth: `${labelWidth + dayCount * cellWidth}px`,
          }}
        >
          <div style={{ display: 'flex', marginLeft: `${labelWidth}px` }}>
            {Array.from({ length: dayCount }, (_, index) => (
              <div
                key={index + 1}
                style={{
                  width: `${cellWidth}px`,
                  textAlign: 'center',
                  borderBottom: '1px solid #d1d5db',
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>

          <div
            style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: `${labelWidth + (today.getDate() - 1) * cellWidth + cellWidth / 2}px`,
              borderLeft: '2px solid #dc2626',
            }}
          />

          {bars.map(({ task, visible, left, width, marker }) => (
            <div
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '44px',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <div style={{ width: `${labelWidth}px`, paddingRight: '12px' }}>
                {task.title}
              </div>
              <div
                style={{
                  position: 'relative',
                  width: `${dayCount * cellWidth}px`,
                  height: '24px',
                }}
              >
                {visible && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${left}px`,
                      width: `${width}px`,
                      height: '16px',
                      top: '4px',
                      backgroundColor: priorityColors[task.priority],
                      borderRadius: marker ? '999px' : '4px',
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
