import courseService from '../services/courseService.js';

const handleFindAll = async ({ response }) => {
  const courses = await courseService.getCourses();
  response.status = 200;
  response.body = courses;
  return;
};

const handleFindOne = async ({ request, response }) => {
  const courseId = request.url.searchParams.get('courseId');
  if (courseId !== undefined) {
    const course = await courseService.getCourse(courseId);
    response.status = 200;
    response.body = course;
    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

const courseController = {
  handleFindAll,
  handleFindOne,
};

export default courseController;
