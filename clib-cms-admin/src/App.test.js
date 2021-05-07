import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Render clib cms admin', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Insurance Claims User Management System/i);
  expect(linkElement).toBeInTheDocument();
});
