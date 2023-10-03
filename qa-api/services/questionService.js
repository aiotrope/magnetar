import { sql } from '../database/database.js';

const getQuestions = async () => {
  const questions = await sql`SELECT * FROM questions;`;
  return questions;
};

const getQuestionById = async (id) => {
  const question = await sql`SELECT * FROM questions WHERE id=${id};`;

  return question[0];
};

const getQuestionsByUser = async (created_by) => {
  const questions =
    await sql`SELECT * FROM questions WHERE created_by=${created_by} ORDER BY created_on DESC;`;

  return questions;
};

const getQuestionsByCourse = async (course_id) => {
  const questions =
    await sql`SELECT * FROM questions WHERE course_id=${course_id} ORDER BY created_on DESC;`;

  return questions;
};

const getQuestionsByCourseOwnedByUser = async (course_id, created_by) => {
  const questions =
    await sql`SELECT * FROM questions WHERE course_id=${course_id} AND created_by=${created_by} ORDER BY created_on DESC;`;

  return questions;
};

const create = async (course_id, created_by, title, details) => {
  const question =
    await sql`INSERT INTO questions (course_id, created_by, title, details) 
  VALUES (${course_id}, ${created_by}, ${title}, ${details}) returning *;`;

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
