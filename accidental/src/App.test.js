import { render, screen } from '@testing-library/react';
import App from './App';

test('displays app name', () => {
  render(<App />);
  const linkElement = screen.getByText(/Accidental/i);
  expect(linkElement).toBeInTheDocument();
});
