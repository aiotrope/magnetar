const qa_url = 'http://127.0.0.1:7800/api';

const getAll = async () => {
  const response = await fetch(`${qa_url}/courses`);

  const jsonData = await response.json();

  if (jsonData.length > 0 || jsonData !== undefined) {
    localStorage.setItem('courses', JSON.stringify(jsonData));
  }
  return jsonData;
};

const formatTimestamp = (dateData) => {
  const today = new Date(dateData);
  const formatted = new Intl.DateTimeFormat('fi').format(today);
  return formatted;
};

const courseService = {
  getAll,
  formatTimestamp,
  qa_url,
};

export default courseService;
