const create = async (course_id, user_uuid, title, details) => {
  const payload = {
    course_id: course_id,
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

  const url = `/api/questions`;

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

const questionService = {
  create,
  getAll,
};

export default questionService;
