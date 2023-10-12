import pLimit from 'p-limit';

import answerService from './answerService';

const limit = pLimit(6);

/* const create = async (course_id, user_uuid, title, details) => {
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

  const url = `/api/questions/${course_id}`;

  const response = await fetch(url, options);

  return await response.json();
};

const createPromise = async (createSubmission) => {
  return await new Promise((resolve, reject) => {
    setTimeout(async () => {
      const questionSubmission = await create(
        createSubmission?.course_id,
        createSubmission?.user_uuid,
        createSubmission?.title,
        createSubmission?.details
      );
      resolve(questionSubmission);
    }, 2000);
  });
}; */

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
  }, 1000);
};

const findById = async (questionId) => {
  const response = await fetch(`/api/question?question_id=${questionId}`);

  const jsonData = await response.json();

  localStorage.setItem('questionById', JSON.stringify(jsonData));

  const questionHasAnswerResponse = await fetch(
    `/api/answer/${jsonData?.id}?question_id=${questionId}`
  );

  const questionHasAnswerData = await questionHasAnswerResponse.json();

  if (
    !questionHasAnswerData ||
    !questionHasAnswerData?.user_uuid === 'automated'
  ) {
    const llm1 = await postLLM(jsonData?.details);
    const llm2 = await postLLM(jsonData?.details);
    const llm3 = await postLLM(jsonData?.details);

    return await Promise.allSettled([
      limit(() => llm1),
      limit(() => llm2),
      limit(() => llm3),
    ]).then((results) => {
      results.forEach(
        async (result) =>
          await answerService.create(
            jsonData?.course_id,
            questionId,
            'automated',
            result?.value
          )
      );
    });
  }

  return jsonData;
};

const questionService = {
  create,
  getAll,
  getByCourse,
  findById,
};

export default questionService;
