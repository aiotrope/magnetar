import courseService from '../services/courseService.js';

import { cacheMethodCalls } from '../util/cacheUtil.js';

const cachedCourseService = cacheMethodCalls(courseService, []);

const handleFindAll = async ({ response }) => {
  const courses = await cachedCourseService.getCourses();
  response.status = 200;
  response.body = courses;
};

const courseController = {
  handleFindAll,
};

export default courseController;
