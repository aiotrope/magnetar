const getAll = async () => {
  const response = await fetch('/api/courses'); //* check route

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
};

export default courseService;
