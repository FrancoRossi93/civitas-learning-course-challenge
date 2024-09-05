import { useState } from 'react';
import axios from 'axios';

interface ICourseForm {
    onCourseAdded: () => void;
  }

const CourseForm = ({ onCourseAdded } : ICourseForm) => {
    const [subject, setSubject] = useState<string>('');
    const [courseNumber, setCourseNumber] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await axios.post('/api/courses', { subject, courseNumber, description });
        onCourseAdded();
        setSubject('');
        setCourseNumber('');
        setDescription('');
    } catch (error: any) {
        alert(error.response.data.error);
    }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md">
            <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            />
            <input
            type="text"
            placeholder="Course Number"
            value={courseNumber}
            onChange={(e) => setCourseNumber(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            />
            <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" >Add Course</button>
        </form>
    );
}

export default CourseForm;
