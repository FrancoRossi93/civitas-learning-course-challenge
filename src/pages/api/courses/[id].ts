import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDB();
  const { id } = req.query;

  if (req.method === 'DELETE') {
    // Delete a course by ID
    try {
      const result = await db.run('DELETE FROM Courses WHERE id = ?', id);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Course not found' });
      }
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete the course.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
