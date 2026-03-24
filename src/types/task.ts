export type Status   = 'To Do' | 'In Progress' | 'In Review' | 'Done';
export type ViewType = 'kanban' | 'list' | 'timeline';
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: Priority;
  status: Status;
  startDate: string | null;
  dueDate: string;
}
