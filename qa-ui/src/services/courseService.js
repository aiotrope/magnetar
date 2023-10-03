const getAll = async () => {
  const response = await fetch('/api/courses');

  return await response.json();
};

const courseService = {
  getAll,
};

export default courseService;
