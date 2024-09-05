import { NextApiRequest, NextApiResponse } from 'next';
import { ICourse, openDB } from '../../../../db';

export default async function courseHandler(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDB();

  if (req.method === 'GET') {
    // Fetch all courses
    const courses: ICourse[] = await db.all('SELECT * FROM Courses');
    return res.status(200).json(courses);
  } 

  if (req.method === 'POST') {
    // Create a new course
    const { subject, courseNumber, description } = req.body;

    // Validation: courseNumber must be a 3-digit number
    if (!/^\d{3}$/.test(courseNumber)) {
      return res.status(400).json({ error: 'Course number must be a 3-digit number.' });
    }

    try {
      const result = await db.run(
        'INSERT INTO Courses (subject, courseNumber, description) VALUES (?, ?, ?)',
        [subject, courseNumber, description]
      );
      const newCourse = await db.get<ICourse>('SELECT * FROM Courses WHERE id = ?', result.lastID);
      return res.status(201).json(newCourse);
    } catch (error: any) {
      if (error.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Course with this subject and number already exists.' });
      }
      return res.status(500).json({ error: 'An error occurred while adding the course.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
