import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export interface ICourse {
  id: number;
  subject: string;
  courseNumber: string;
  description: string;
}

export async function openDB() {
  if (process.env.NODE_ENV === 'test') {
    // Use in-memory database for testing
    return open({
      filename: ':memory:',
      driver: sqlite3.Database
    });
  }
  
  // Use the default database in other environments
  return open({
    filename: './courses.db',
    driver: sqlite3.Database
  });
}

export async function setupDB() {
  const db = await openDB();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT,
      courseNumber TEXT,
      description TEXT,
      UNIQUE(subject, courseNumber)
    );
  `);

  // Insert default data if not already present
  const defaultCourses: Omit<ICourse, 'id'>[] = [
    { subject: 'BIO', courseNumber: '101', description: 'Introduction to Biology' },
    { subject: 'MAT', courseNumber: '045', description: 'Business Statistics' }
  ];

  for (const course of defaultCourses) {
    try {
      await db.run(
        'INSERT INTO Courses (subject, courseNumber, description) VALUES (?, ?, ?)',
        [course.subject, course.courseNumber, course.description]
      );
    } catch (error:any) {
      // Ignore error if the record already exists
      if (error.message.includes('UNIQUE constraint failed')) {
        continue;
      }
      console.error('Error inserting default data:', error);
    }
  }
}
