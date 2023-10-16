const createQuestionVote = async (questionId, user_uuid) => {
  const payload = {
    user_uuid: user_uuid,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  };

  const url = `/api/vote/question?question_id=${questionId}`; 

  const response = await fetch(url, options);

  return await response.json();
};

const getQuestionVotes = async () => {
  const response = await fetch('/api/votes/question'); 

  const jsonData = await response.json();

  if (jsonData.length || jsonData !== undefined) {
    localStorage.setItem('questionVotes', JSON.stringify(jsonData));
  }
  return jsonData;
};

const createAnswerVote = async (answerId, user_uuid) => {
  const payload = {
    user_uuid: user_uuid,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  };

  const url = `/api/vote/answer?answer_id=${answerId}`; 

  const response = await fetch(url, options);

  return await response.json();
};

const getAnswerVotes = async () => {
  const response = await fetch('/api/votes/answer'); 

  const jsonData = await response.json();

  if (jsonData.length || jsonData !== undefined) {
    localStorage.setItem('answerVotes', JSON.stringify(jsonData));
  }
  return jsonData;
};

const voteService = {
  createQuestionVote,
  getQuestionVotes,
  createAnswerVote,
  getAnswerVotes,
};

export default voteService;
