import { render, screen } from '@testing-library/react';
import App from './App';

test('renders kanban button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'Kanban' })).toBeInTheDocument();
});
