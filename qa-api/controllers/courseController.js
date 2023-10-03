import courseService from '../services/courseService.js';

import { cacheMethodCalls } from '../util/cacheUtil.js';

const cachedCourseService = cacheMethodCalls(courseService, []);

const handleFindAll = async ({ response }) => {
  const courses = await cachedCourseService.getCourses();
  response.status = 200;
  response.body = courses;
};

const handleFindOne = async ({ request, response }) => {
  const courseId = request.url.searchParams.get('courseId');
  if (courseId !== undefined) {
    const course = await cachedCourseService.getCourse(courseId);
    response.status = 200;
    response.body = course;
  } else {
    response.status = 404;
    response.body = 'Not defined';
  }
};

const courseController = {
  handleFindAll,
  handleFindOne,
};

export default courseController;
