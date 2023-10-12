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
        const url = `/api/questions/${course_id}`;

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
  const response = await fetch('/api/questions');

  const jsonData = await response.json();

  if (jsonData.length || jsonData !== undefined) {
    localStorage.setItem('questions', JSON.stringify(jsonData));
  }
  return jsonData;
};

const getByCourse = async (courseId) => {
  const response = await fetch(`/api/questions/course?course_id=${courseId}`);

  const jsonData = await response.json();

  if (jsonData.length || jsonData !== undefined) {
    localStorage.setItem('questionsByCourse', JSON.stringify(jsonData));
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

const findById = async (questionId) => {
  const response = await fetch(`/api/question?question_id=${questionId}`);

  const jsonData = await response.json();

  if (jsonData !== null) {
    localStorage.setItem('questionById', JSON.stringify(jsonData));
  }

  return jsonData;
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

  const url = `/api/question/${questionId}`;

  const response = await fetch(url, options);

  return await response.json();
};

const questionService = {
  create,
  getAll,
  getByCourse,
  findById,
  postLLM,
  updatedAutomatedAnswer,
};

export default questionService;

