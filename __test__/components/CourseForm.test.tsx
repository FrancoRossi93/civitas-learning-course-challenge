import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CourseForm from '../../src/components/CourseForm';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('CourseForm Component', () => {
  it('renders form inputs', () => {
    render(<CourseForm onCourseAdded={jest.fn()} />);
    
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Course Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  });

  it('allows input and form submission and handle onCourseAdded', async () => {

    const mock = new MockAdapter(axios);

    const mockOnCourseAdded = jest.fn();
    render(<CourseForm onCourseAdded={mockOnCourseAdded} />);

    fireEvent.change(screen.getByPlaceholderText('Subject'), { target: { value: 'BIO' } });
    fireEvent.change(screen.getByPlaceholderText('Course Number'), { target: { value: '102' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Introduction to Biology 2' } });

    
    mock.onPost('/api/courses').reply(201, {
        subject: 'BIO',
        courseNumber: '102',
        description: 'Introduction to Biology 2',
    });

    fireEvent.click(screen.getByText('Add Course'));

    await waitFor(() => {
        expect(mock.history.post[0].url).toBe('/api/courses');
        expect(mock.history.post[0].method).toBe('post');
        expect(mock.history.post[0].data).toBe(JSON.stringify({
          subject: 'BIO',
          courseNumber: '102',
          description: 'Introduction to Biology 2',
        }));
    });

    expect(mockOnCourseAdded).toHaveBeenCalled();
  });
});
