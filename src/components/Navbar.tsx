import React from 'react';
import { ViewType } from '../types/task';

interface NavbarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const views: ViewType[] = ['kanban', 'list', 'timeline'];

const Navbar: React.FC<NavbarProps> = ({ activeView, onViewChange }) => {
  return (
    <nav>
      {views.map((view) => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          disabled={activeView === view}
        >
          {view === 'kanban' && 'Kanban'}
          {view === 'list' && 'List'}
          {view === 'timeline' && 'Timeline'}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
