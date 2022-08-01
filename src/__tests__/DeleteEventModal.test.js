import { render, screen } from '@testing-library/react';
import DeleteEventModal from '../components/DeleteEventModal/DeleteEventModal';

/** UNIT TESTS by getByText and getByRole
 * Tests that the mentioned component
 * renders an h2 element with the title
 * as 'Event' & also by the role as a heading
 * 
 */
test('renders h2 element with the title as Event', () => {
  render(<DeleteEventModal title="Event"/>);
  const headerElement= screen.getByText(/event/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders h2 element by role', () => {
  render(<DeleteEventModal title="Event"/>);
  const headerElement= screen.getByRole("heading");
  expect(headerElement).toBeInTheDocument();
});