import { render, screen } from '@testing-library/react';
import React from 'react';

import HomePage from '../../pages/HomePage';

test('renders hello world message', () => {
  render(<HomePage />);
  const greetings = screen.getByText(/Hello world/i);
  expect(greetings).toBeInTheDocument();
});
