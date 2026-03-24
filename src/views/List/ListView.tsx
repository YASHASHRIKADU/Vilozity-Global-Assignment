import React from 'react';
import { Priority, Status, Task } from '../../types/task';

interface ListViewProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: Status) => void;
}

type SortField = 'title' | 'priority' | 'dueDate';
type SortDirection = 'asc' | 'desc';

const priorityRank: Record<Priority, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

const statuses: Status[] = ['To Do', 'In Progress', 'In Review', 'Done'];
const rowHeight = 48;
const visibleHeight = 480;
const bufferSize = 5;

const ListView: React.FC<ListViewProps> = ({ tasks, onStatusChange }) => {
  const [sortField, setSortField] = React.useState<SortField>('title');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');
  const [scrollTop, setScrollTop] = React.useState(0);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((currentDirection) =>
        currentDirection === 'asc' ? 'desc' : 'asc'
      );
      return;
    }

    setSortField(field);
    setSortDirection('asc');
  };

  const sortedTasks = [...tasks].sort((firstTask, secondTask) => {
    let comparison = 0;

    if (sortField === 'title') {
      comparison = firstTask.title.localeCompare(secondTask.title);
    }

    if (sortField === 'priority') {
      comparison =
        priorityRank[firstTask.priority] - priorityRank[secondTask.priority];
    }

    if (sortField === 'dueDate') {
      comparison = firstTask.dueDate.localeCompare(secondTask.dueDate);
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const renderSortLabel = (field: SortField, label: string) => {
    const active = sortField === field;
    const direction = active
      ? sortDirection === 'asc'
        ? ' (asc)'
        : ' (desc)'
      : '';

    return (
      <button
        type="button"
        onClick={() => handleSort(field)}
        style={{
          border: 'none',
          background: 'none',
          fontWeight: active ? 700 : 400,
          textDecoration: active ? 'underline' : 'none',
          cursor: 'pointer',
          padding: 0,
          color: active ? '#1d4ed8' : '#111827',
        }}
      >
        {label}
        {direction}
      </button>
    );
  };

  const totalHeight = sortedTasks.length * rowHeight;
  const visibleCount = Math.ceil(visibleHeight / rowHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - bufferSize);
  const endIndex = Math.min(
    sortedTasks.length,
    startIndex + visibleCount + bufferSize * 2
  );
  const visibleTasks = sortedTasks.slice(startIndex, endIndex);
  const offsetY = startIndex * rowHeight;

  return (
    <div>
      <h1>List</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th
              style={{
                textAlign: 'left',
                borderBottom: '1px solid #d1d5db',
                backgroundColor: sortField === 'title' ? '#dbeafe' : '#ffffff',
              }}
            >
              {renderSortLabel('title', 'Title')}
            </th>
            <th
              style={{
                textAlign: 'left',
                borderBottom: '1px solid #d1d5db',
                backgroundColor: sortField === 'priority' ? '#dbeafe' : '#ffffff',
              }}
            >
              {renderSortLabel('priority', 'Priority')}
            </th>
            <th
              style={{
                textAlign: 'left',
                borderBottom: '1px solid #d1d5db',
                backgroundColor: sortField === 'dueDate' ? '#dbeafe' : '#ffffff',
              }}
            >
              {renderSortLabel('dueDate', 'Due Date')}
            </th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #d1d5db' }}>
              Status
            </th>
          </tr>
        </thead>
      </table>
      <div
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
        style={{
          height: `${visibleHeight}px`,
          overflowY: 'auto',
          overflowX: 'hidden',
          borderBottom: '1px solid #d1d5db',
        }}
      >
        <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              tableLayout: 'fixed',
              position: 'absolute',
              top: `${offsetY}px`,
              left: 0,
            }}
          >
            <tbody>
              {visibleTasks.map((task) => (
                <tr key={task.id} style={{ height: `${rowHeight}px` }}>
                  <td style={{ padding: '8px 0' }}>{task.title}</td>
                  <td style={{ padding: '8px 0' }}>{task.priority}</td>
                  <td style={{ padding: '8px 0' }}>{task.dueDate}</td>
                  <td style={{ padding: '8px 0' }}>
                    <select
                      value={task.status}
                      onChange={(event) =>
                        onStatusChange(task.id, event.target.value as Status)
                      }
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListView;
