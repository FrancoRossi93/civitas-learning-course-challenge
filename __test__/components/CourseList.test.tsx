import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CourseList from '../../src/components/CourseList';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
    } as Response)
  );

const mockCourses = [
  { id: 1, subject: 'BIO', courseNumber: '101', description: 'Introduction to Biology' },
  { id: 2, subject: 'MAT', courseNumber: '045', description: 'Business Statistics' }
];

describe('CourseList Component', () => {
  it('renders a list of courses', () => {
    render(<CourseList courses={mockCourses} onCourseDeleted={jest.fn()} />);
    
    expect(screen.getByText('BIO 101: Introduction to Biology')).toBeInTheDocument();
    expect(screen.getByText('MAT 045: Business Statistics')).toBeInTheDocument();
  });

  it('calls delete function when delete button is clicked', async () => {

    const mock = new MockAdapter(axios);

    mock.onDelete('/api/courses/1').reply(200, { message: 'Course deleted' });
    
    const mockOnCourseDeleted = jest.fn();
    render(<CourseList courses={mockCourses} onCourseDeleted={mockOnCourseDeleted} />);
    
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
        expect(mock.history.delete[0].url).toBe('/api/courses/1');
        expect(mock.history.delete[0].method).toBe('delete');
    });

    expect(mockOnCourseDeleted).toHaveBeenCalled();
  });
});
