import { sql } from '../database.js';

const getAnswers = async () => {
  const answers = await sql`SELECT * FROM answers ORDER BY timestamp DESC;`;
  return answers;
};

const create = async (course_id, question_id, user_uuid, details) => {
  const answer =
    await sql`INSERT INTO answers (course_id, question_id, user_uuid, details) 
  VALUES (${course_id}, ${question_id}, ${user_uuid}, ${details}) returning *;`;

  return answer;
};

const updateVote = async (id, votes) => {
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
  create,
  updateVote,
};

export default answerService;
