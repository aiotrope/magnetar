import { sql } from '../database/database.js';

const createQuestionVote = async (question_id, user_uuid) => {
  const vote = await sql`INSERT INTO question_votes (question_id, user_uuid) 
  VALUES (${question_id}, ${user_uuid}) returning *;`;

  return vote;
};

const getQuestionVotes = async () => {
  const votes = await sql`SELECT * FROM question_votes ORDER BY created DESC;`;
  return votes;
};

const createAnswerVote = async (answer_id, user_uuid) => {
  const vote = await sql`INSERT INTO answer_votes (answer_id, user_uuid) 
  VALUES (${answer_id}, ${user_uuid}) returning *;`;

  return vote;
};

const getAnswerVotes = async () => {
  const votes = await sql`SELECT * FROM answer_votes ORDER BY created DESC;`;
  return votes;
};

const userVotedQuestion = async (question_id, user_uuid) => {
  const count =
    await sql`SELECT COUNT(*) FROM question_votes WHERE question_id=${question_id} AND user_uuid=${user_uuid}`;
    return count
};

const userVotedAnswer = async (answer_id, user_uuid) => {
  const count =
    await sql`SELECT COUNT(*) FROM answer_votes WHERE answer_id=${answer_id} AND user_uuid=${user_uuid}`;
    return count
};

const voteService = {
  createQuestionVote,
  createAnswerVote,
  getQuestionVotes,
  getAnswerVotes,
  userVotedQuestion,
  userVotedAnswer
};

export default voteService;
