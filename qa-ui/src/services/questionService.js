const create = async (course_id, user_uuid, title, details) => {
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

const findById = async (questionId) => {
  const response = await fetch(`/api/question?question_id=${questionId}`);

  const jsonData = await response.json();

  if (jsonData !== null) {
    localStorage.setItem('questionById', JSON.stringify(jsonData));
  }
  return jsonData;
};

const questionService = {
  create,
  getAll,
  getByCourse,
  // findById,
};

export default questionService;
