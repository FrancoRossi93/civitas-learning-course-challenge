import axios from 'axios';
import { ICourse } from '../../db';

interface ICourseList {
    courses: ICourse[];
    onCourseDeleted: () => void;
  }

const CourseList = ({ courses, onCourseDeleted }:ICourseList) => {

  const handleDelete = async (id:number) => {
    await axios.delete(`/api/courses/${id}`);
    onCourseDeleted();
  };

  return (
    <ul className="space-y-2">
      {courses.map((course) => (
        <li key={course.id} className="flex justify-between items-center bg-gray-100 p-4 rounded shadow" >
        <div>
            <span className="font-semibold">
            {course.subject} {course.courseNumber}: {course.description}
            </span>
        </div>
        <button onClick={() => handleDelete(course.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" >Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default CourseList
