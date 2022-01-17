import { render, screen } from '@testing-library/react';
import React from 'react';

import DateDisplay from '../../components/DateDisplay';

test('renders current date', () => {
  render(<DateDisplay />);
  const timeFormat = screen.getByText(/GMT/i);
  expect(timeFormat).toBeInTheDocument();
});
