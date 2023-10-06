const create = async (courseId, user_uuid, title, details) => {
  const payload = {
    user_uuid: user_uuid,
    title: title,
    details: details
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  };

  const url = `/api/questions/${courseId}`;

  const response = await fetch(url, options);

  return await response.json();
};


const questionService = {
    create
}

export default questionService