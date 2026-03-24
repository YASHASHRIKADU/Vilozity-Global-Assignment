import { Task } from '../types/task';

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

function addDays(base: Date, days: number): Date {
  const next = new Date(base);
  next.setDate(next.getDate() + days);
  return next;
}

const titles = [
  'Design login page',
  'Fix navbar bug',
  'Write unit tests',
  'Update API docs',
  'Refactor auth module',
  'Implement search',
  'Review pull requests',
  'Set up CI pipeline',
  'Optimize bundle size',
  'Fix memory leak',
  'Create onboarding flow',
  'Add analytics events',
  'Write release notes',
  'Audit accessibility',
  'Fix CORS issue',
  'Implement caching layer',
  'Build admin dashboard',
  'Add CSV export',
  'Improve error messages',
  'Add pagination',
  'Write end-to-end tests',
  'Set up monitoring',
  'Fix mobile layout',
  'Add notifications',
  'Implement OAuth flow',
  'Improve SEO tags',
  'Add bulk actions',
  'Fix timezone handling',
  'Create email templates',
  'Update documentation',
];

const assignees = [
  'Alice Martin',
  'Bob Singh',
  'Carol White',
  'David Okonkwo',
  'Eva Chen',
  'Frank Russo',
];

const priorities: Task['priority'][] = ['Critical', 'High', 'Medium', 'Low'];
const statuses: Task['status'][] = ['To Do', 'In Progress', 'In Review', 'Done'];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function generateTasks(count = 500): Task[] {
  const today = new Date();

  return Array.from({ length: count }, (_, index) => {
    const dueOffset = Math.floor(Math.random() * 45) - 12;
    const dueDate = addDays(today, dueOffset);
    const hasStartDate = Math.random() > 0.2;
    const startDate = hasStartDate
      ? addDays(dueDate, -(Math.floor(Math.random() * 10) + 1))
      : null;

    return {
      id: String(index + 1),
      title: `${titles[index % titles.length]} ${index + 1}`,
      assignee: pickRandom(assignees),
      priority: pickRandom(priorities),
      status: pickRandom(statuses),
      startDate: startDate ? toDateString(startDate) : null,
      dueDate: toDateString(dueDate),
    };
  });
}

export const tasks: Task[] = generateTasks(500);
