import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Render clib cms web', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Claims Management System/i);
  expect(linkElement).toBeInTheDocument();
});
