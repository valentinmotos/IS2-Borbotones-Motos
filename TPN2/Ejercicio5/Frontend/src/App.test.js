import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => {
  const axiosInstance = {
    interceptors: { request: { use: jest.fn() } },
    get: jest.fn().mockResolvedValue({ data: [] }),
  };

  return {
    __esModule: true,
    default: {
      create: jest.fn(() => axiosInstance),
      post: jest.fn(),
    },
  };
});

test('renders the login page', () => {
  window.history.pushState({}, 'Login page', '/login');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
});
