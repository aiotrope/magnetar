import { sql } from '../database/database.js';

const getAnswers = async () => {
  const answers = await sql`SELECT * FROM answers;`;
  return answers;
};

const getAnswerById = async (id) => {
  const answer = await sql`SELECT * FROM answers WHERE id=${id};`;

  return answer[0];
};

const getAnswersByUser = async (created_by) => {
  const answers =
    await sql`SELECT * FROM answers WHERE created_by=${created_by} ORDER BY created_on DESC;`;

  return answers;
};

const getAnswersByCourse = async (course_id) => {
  const answers =
    await sql`SELECT * FROM answers WHERE course_id=${course_id} ORDER BY created_on DESC;`;

  return answers;
};

const getAnswersByQuestion = async (question_id) => {
  const answers =
    await sql`SELECT * FROM answers WHERE question_id=${question_id} ORDER BY created_on DESC;`;

  return answers;
};

const getAnswersByCourseByQuestionOwnedByUser = async (
  course_id,
  question_id,
  created_by
) => {
  const answers =
    await sql`SELECT * FROM answers WHERE course_id=${course_id} AND question_id=${question_id} AND created_by=${created_by} ORDER BY created_on DESC;`;

  return answers;
};

const create = async (course_id, question_id, created_by, details) => {
  const answer =
    await sql`INSERT INTO answers (course_id, question_id, created_by, details) 
  VALUES (${course_id}, ${question_id}, ${created_by}, ${details}) returning *;`;

  return answer;
};

const answerService = {
  getAnswers,
  getAnswerById,
  getAnswersByUser,
  getAnswersByCourse,
  getAnswersByQuestion,
  getAnswersByCourseByQuestionOwnedByUser,
  create,
};

export default answerService;
