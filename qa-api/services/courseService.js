import { sql } from '../database/database.js';

const getCourses = async () => {
  const courses = await sql`SELECT * FROM courses;`;
  return courses;
};

const getCourse = async (id) => {
  const courses =
    await sql`SELECT * FROM courses WHERE id=${id};`;

  return courses[0];
};

const courseService = {
  getCourses,
  getCourse,
};

export default courseService;
