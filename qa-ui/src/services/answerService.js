// const qa_url = 'http://127.0.0.1:7800/api'

export const qa_url = import.meta.env.QA_URL;

const create = async (courseId, questionId, user_uuid, details) => {
  const payload = {
    user_uuid: user_uuid,
    details: details,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  };

  const url = `${qa_url}/answers/${courseId}?question_id=${questionId}`;

  const response = await fetch(url, options);

  return await response.json();
};

const getAll = async () => {
  const response = await fetch(`${qa_url}/answers`);

  const jsonData = await response.json();

  if (jsonData.length || jsonData !== undefined) {
    localStorage.setItem('answers', JSON.stringify(jsonData));
  }
  return jsonData;
};

const updateVote = async (answerId, votes) => {
  const payload = {
    votes: votes,
  };

  const options = {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  };

  const url = `${qa_url}/answer/votes/${answerId}`;

  const response = await fetch(url, options);

  return await response.json();
};
 
const answerService = {
  create,
  getAll,
  updateVote
 
};

export default answerService;
