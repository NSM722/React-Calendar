import React from 'react';
import { render, screen } from '@testing-library/react';
import Weekday from '../components/Weekday/Weekday';

/*Tests whether Mon is displayed on the 
screen when the Weekday component is rendered 
*/
test('renders the first day of the week(Mon) div without crashing', () => {
  render(<Weekday />);
  const divElement = screen.getByText(/Mon/i);
  expect(divElement).toBeInTheDocument()
});
