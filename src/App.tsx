import React, { useState } from 'react';
import Navbar from './components/Navbar';
import KanbanView from './views/Kanban/KanbanView';
import ListView from './views/List/ListView';
import TimelineView from './views/Timeline/TimelineView';
import { Status, Task, ViewType } from './types/task';
import { tasks } from './utils/data';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('kanban');
  const [taskItems, setTaskItems] = useState<Task[]>(tasks);

  const handleStatusChange = (taskId: string, status: Status) => {
    setTaskItems((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  return (
    <div>
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      {activeView === 'kanban' && (
        <KanbanView tasks={taskItems} onStatusChange={handleStatusChange} />
      )}
      {activeView === 'list' && (
        <ListView tasks={taskItems} onStatusChange={handleStatusChange} />
      )}
      {activeView === 'timeline' && <TimelineView tasks={taskItems} />}
    </div>
  );
};

export default App;
