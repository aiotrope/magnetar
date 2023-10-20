const qa_url = 'http://127.0.0.1:7800/api';

const llm_url = 'http://127.0.0.1:7800/llm/';

const create = async (course_id, user_uuid, title, details) => {
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
        const url = `${qa_url}/questions/${course_id}`;

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

const getAll = async () => {
  const response = await fetch(`${qa_url}/questions`);

  const jsonData = await response.json();

  if (jsonData.length || jsonData !== undefined) {
    localStorage.setItem('questions', JSON.stringify(jsonData));
  }
  return jsonData;
};

const postLLM = async (question) => {
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
        const url = '/llm/';

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

const updatedAutomatedAnswer = async (questionId, withautomatedanswer) => {
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

  const url = `${qa_url}/question/${questionId}`;

  const response = await fetch(url, options);

  return await response.json();
};

const updateVote = async (questionId, votes) => {
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

  const url = `${qa_url}/question/votes/${questionId}`;

  const response = await fetch(url, options);

  return await response.json();
};

const questionService = {
  create,
  getAll,
  postLLM,
  updatedAutomatedAnswer,
  updateVote,
};

export default questionService;
