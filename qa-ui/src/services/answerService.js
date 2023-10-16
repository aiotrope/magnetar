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

  const url = `/api/answers/${courseId}?question_id=${questionId}`; //* check route

  const response = await fetch(url, options);

  return await response.json();
};

const getAll = async () => {
  const response = await fetch('/api/answers');

  const jsonData = await response.json();

  if (jsonData.length || jsonData !== undefined) {
    localStorage.setItem('answers', JSON.stringify(jsonData));
  }
  return jsonData;
};

const answerService = {
  create,
  getAll,
 
};

export default answerService;
