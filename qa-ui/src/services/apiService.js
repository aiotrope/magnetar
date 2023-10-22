const createNewQuestion = async (
  baseUrl,
  course_id,
  user_uuid,
  title,
  details
) => {
  return await new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      const payload = {
        user_uuid: user_uuid,
        title: title,
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
      try {
        const url = `${baseUrl}/questions/${course_id}`;

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(
            `${response.status} - ${response.statusText} - Cannot submit question!`
          );
        }

        const jsonData = await response.json();

        resolve(jsonData);
      } catch (error) {
        alert(error);
        reject(error);
      }
    });
  }, 2000);
};

const getUser = async (url) => {
  const userQuestions = await fetch(`${url}/questions`);

  const userAnswers = await fetch(`${url}/answers`);

  const questionVotes = await fetch(`${url}/votes/question`);

  const answerVotes = await fetch(`${url}/votes/answer`);

  const uuid = await fetch(`${url}/user/uuid`);

  const jsonQuestions = await userQuestions.json();

  const jsonAnswers = await userAnswers.json();

  const jsonQuestionVotes = await questionVotes.json();

  const jsonAnswerVotes = await answerVotes.json();

  const jsonUuid = await uuid.json();

  let user;
  if (jsonQuestions?.length > 0 && jsonQuestions !== undefined) {
    const userOnDbQ = jsonQuestions[0]?.user_uuid;
    user = userOnDbQ;
  } else if (jsonAnswers?.length > 0 && jsonAnswers !== undefined) {
    const userOnDbA = jsonAnswers[0]?.user_uuid;
    user = userOnDbA;
  } else if (jsonQuestionVotes?.length > 0 && jsonQuestionVotes !== undefined) {
    const userOnDbQV = jsonQuestionVotes[0]?.user_uuid;
    user = userOnDbQV;
  } else if (jsonAnswerVotes?.length > 0 && jsonAnswerVotes !== undefined) {
    const userOnDbAV = jsonAnswerVotes[0]?.user_uuid;
    user = userOnDbAV;
  } else {
    user = jsonUuid?.uuid;
  }

  localStorage.setItem('userUuid', JSON.stringify(user));

  return user;
};

const formatTimestamp = (dateData) => {
  const today = new Date(dateData);
  const formatted = new Intl.DateTimeFormat('fi').format(today);
  return formatted;
};

const getQuestions = async (url) => {
  const response = await fetch(`${url}/questions`);

  const jsonData = await response.json();

  return jsonData;
};

const createQuestionVote = async (baseUrl, questionId, user_uuid) => {
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

  const url = `${baseUrl}/vote/question?question_id=${questionId}`;

  const response = await fetch(url, options);

  return await response.json();
};

const getQuestionVotes = async (baseUrl) => {
  const response = await fetch(`${baseUrl}/votes/question`);

  const jsonData = await response.json();

  return jsonData;
};

const createAnswerVote = async (baseUrl, answerId, user_uuid) => {
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

  const url = `${baseUrl}/vote/answer?answer_id=${answerId}`;

  const response = await fetch(url, options);

  return await response.json();
};

const getAnswerVotes = async (baseUrl) => {
  const response = await fetch(`${baseUrl}/votes/answer`);

  const jsonData = await response.json();

  return jsonData;
};

const updateQuestionVote = async (baseUrl, questionId, votes) => {
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

  const url = `${baseUrl}/question/votes/${questionId}`;

  const response = await fetch(url, options);

  return await response.json();
};

const postLLM = async (baseUrl, question) => {
  return await new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      const payload = {
        question: question,
      };

      const options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      };
      try {
        const url = baseUrl;

        const response = await fetch(url, options);

        const jsonData = await response.json();

        const result = await jsonData?.generated_text;

        const replaceString = result.replace(question, '');

        resolve(replaceString.trim());

        return result;
      } catch (error) {
        reject(error);
      }
    });
  }, 100);
};

const updatedAutomatedAnswer = async (
  baseUrl,
  questionId,
  withautomatedanswer
) => {
  const payload = {
    withautomatedanswer: withautomatedanswer,
  };

  const options = {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  };

  const url = `${baseUrl}/question/${questionId}`;

  const response = await fetch(url, options);

  return await response.json();
};

const createNewAnswer = async (
  baseUrl,
  courseId,
  questionId,
  user_uuid,
  details
) => {
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

  const url = `${baseUrl}/answers/${courseId}?question_id=${questionId}`;

  const response = await fetch(url, options);

  return await response.json();
};

const getAnswers = async (baseUrl) => {
  const response = await fetch(`${baseUrl}/answers`);

  const jsonData = await response.json();

  return jsonData;
};

const updateAnswerVote = async (baseUrl, answerId, votes) => {
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

  const url = `${baseUrl}/answer/votes/${answerId}`;

  const response = await fetch(url, options);

  return await response.json();
};

const apiService = {
  createNewQuestion,
  getUser,
  formatTimestamp,
  getQuestions,
  createQuestionVote,
  getQuestionVotes,
  getAnswerVotes,
  createAnswerVote,
  updateQuestionVote,
  updatedAutomatedAnswer,
  postLLM,
  createNewAnswer,
  updateAnswerVote,
  getAnswers,
  createAnswerVote,
};

export default apiService;
