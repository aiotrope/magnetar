const getAll = async () => {
  const response = await fetch('/api/courses');

  const jsonData = await response.json();

  if (jsonData.length > 0 || jsonData !== undefined) {
    localStorage.setItem('courses', JSON.stringify(jsonData));
  }
  return jsonData;
};

const findById = async (courseId) => {
  const response = await fetch(`/api/course?courseId=${courseId}`);

  return await response.json();
};

const formatTimestamp = (dateData) => {
  const today = new Date(dateData);
  const formatted = new Intl.DateTimeFormat('fi').format(today);
  return formatted;
};

const courseService = {
  getAll,
  findById,
  formatTimestamp,
};

export default courseService;
