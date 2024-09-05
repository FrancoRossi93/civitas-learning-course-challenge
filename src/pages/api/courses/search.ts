import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../../../db';

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDB();
  const { q } = req.query;

  if (req.method === 'GET') {
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter q is required and must be a string.' });
    }

    try {
      const courses = await db.all(
        'SELECT * FROM Courses WHERE description LIKE ?',
        [`%${q}%`]
      );
      return res.status(200).json(courses);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while searching for courses.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
