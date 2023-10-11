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

const create = async (
  course_id,
  user_uuid,
  title,
  details
) => {
  return await new Promise(async (resolve, reject) => {
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

/* const findById = async (questionId) => {
  const response = await fetch(`/api/question?question_id=${questionId}`);

  const jsonData = await response.json();

  if (jsonData !== null) {
    localStorage.setItem('questionById', JSON.stringify(jsonData));
  }
  return jsonData;
};
 */
const questionService = {
  create,
  getAll,
  getByCourse,
  // findById,
};

export default questionService;
