import { sql } from '../database/database.js';

const getAnswers = async () => {
  const answers = await sql`SELECT * FROM answers ORDER BY updated DESC;`;
  return answers;
};

const getAnswerById = async (id) => {
  const answer = await sql`SELECT * FROM answers WHERE id=${id};`;

  return answer[0];
};

const getAnswerByQuestionId = async (id, questionId) => {
  const answer =
    await sql`SELECT * FROM answers WHERE id=${id} AND question_id=${questionId}`;

  return answer[0];
};

const getAnswersByUser = async (user_uuid) => {
  const answers =
    await sql`SELECT * FROM answers WHERE user_uuid=${user_uuid} ORDER BY updated DESC;`;

  return answers;
};

const getAnswersByCourse = async (course_id) => {
  const answers =
    await sql`SELECT * FROM answers WHERE course_id=${course_id} ORDER BY updated DESC;`;

  return answers;
};

const getAnswersByQuestion = async (question_id) => {
  const answers =
    await sql`SELECT * FROM answers WHERE question_id=${question_id} ORDER BY updated DESC;`;

  return answers;
};

const getAnswersByCourseByQuestion = async (course_id, question_id) => {
  const answers =
    await sql`SELECT * FROM answers WHERE course_id=${course_id} AND question_id=${question_id} ORDER BY updated DESC;`;

  return answers;
};

const create = async (course_id, question_id, user_uuid, details) => {
  const answer =
    await sql`INSERT INTO answers (course_id, question_id, user_uuid, details) 
  VALUES (${course_id}, ${question_id}, ${user_uuid}, ${details}) returning *;`;

  return answer;
};

const updateVotes = async (id, votes) => {
  return await new Promise(async (resolve, reject) => {
    const updateData = {
      id: id,
      votes: votes,
    };
    const answerToUpdate = await sql`UPDATE answers SET ${sql(
      updateData,
      'votes'
    )} WHERE id=${updateData.id} returning *;`;

    resolve(answerToUpdate);
  });
};

const answerService = {
  getAnswers,
  getAnswerById,
  getAnswersByUser,
  getAnswersByCourse,
  getAnswersByQuestion,
  getAnswersByCourseByQuestion,
  create,
  getAnswerByQuestionId,
  updateVotes
};

export default answerService;
