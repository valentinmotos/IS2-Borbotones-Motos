import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn().mockResolvedValue({ data: [] }),
  },
}));

test('renders the football application navigation', () => {
  window.history.pushState({}, 'Unknown route', '/unknown');
  render(<App />);
  expect(screen.getByRole('link', { name: /gestión de futbolistas/i })).toBeInTheDocument();
});
