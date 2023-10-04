const getAll = async () => {
  const response = await fetch('/api/courses');

  return await response.json();
};

const findById = async (courseId) => {
  const response = await fetch(`/api/course?courseId=${courseId}`);

  return await response.json();
};

const courseService = {
  getAll,
  findById,
};

export default courseService;
