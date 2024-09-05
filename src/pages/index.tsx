import { useEffect, useState } from 'react';
import axios from 'axios';
import CourseForm from '../components/CourseForm';
import CourseList from '../components/CourseList';
import { ICourse } from '../../db';

export default function Home() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchCourses = async () => {
    try {
      const response = await axios.get<ICourse[]>('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error(error)
    }
  };

  const searchCourses = async () => {
    const response = await axios.get<ICourse[]>(`/api/courses/search?q=${searchTerm}`);
    setCourses(response.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Course Management</h1>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search by description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={searchCourses}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Search
        </button>
      </div>

      <CourseForm onCourseAdded={fetchCourses} />

      <h2 className="text-xl font-semibold mt-6 mb-2">Course List</h2>
      <CourseList courses={courses} onCourseDeleted={fetchCourses} />
    </div>
  );
}
