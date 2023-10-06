import { sql } from '../database/database.js';

const getQuestions = async () => {
  const questions =
    await sql`SELECT * FROM questions ORDER BY created_on DESC;`;
  return questions;
};

const getQuestionById = async (id) => {
  const question = await sql`SELECT * FROM questions WHERE id=${id};`;

  return question[0];
};

const getQuestionsByUser = async (user_uuid) => {
  const questions =
    await sql`SELECT * FROM questions WHERE user_uuid=${user_uuid} ORDER BY created_on DESC;`;

  return questions;
};

const getQuestionsByCourse = async (course_id) => {
  const questions =
    await sql`SELECT * FROM questions WHERE course_id=${course_id} ORDER BY created_on DESC;`;

  return questions;
};

const getQuestionsByCourseOwnedByUser = async (course_id, user_uuid) => {
  const questions =
    await sql`SELECT * FROM questions WHERE course_id=${course_id} AND user_uuid=${user_uuid} ORDER BY created_on DESC;`;

  return questions;
};

const create = async (course_id, user_uuid, title, details) => {
  const question =
    await sql`INSERT INTO questions (course_id, user_uuid, title, details) 
  VALUES (${course_id}, ${user_uuid}, ${title}, ${details}) returning *;`;

  return question;
};

const questionService = {
  getQuestions,
  getQuestionById,
  getQuestionsByUser,
  getQuestionsByCourse,
  getQuestionsByCourseOwnedByUser,
  create,
};

export default questionService;
