import questionService from '../services/questionService.js';
// import { cacheMethodCalls } from '../util/cacheUtil.js';

// const cachedQuestionService = cacheMethodCalls(questionService, ['create']);

const handleCreate = async ({ request, response, params }) => {
  const courseId = params.courseId;
  const { user_uuid, title, details } = await request.body().value;

  const newQuestion = await questionService.create(
    courseId,
    user_uuid,
    title,
    details
  );

  response.status = 201;
  response.body = newQuestion[0];
};

const handleFindAll = async ({ response }) => {
  const questions = await cachedQuestionService.getQuestions();
  response.status = 200;
  response.body = questions;
  return;
};

const handleFindById = async ({ request, response }) => {
  const id = request.url.searchParams.get('id');
  if (id !== undefined) {
    const question = await questionService.getQuestionById(id);
    response.status = 200;
    response.body = question;
    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

const handleFindByUser = async ({ request, response }) => {
  const created_by = request.url.searchParams.get('created_by');
  if (created_by !== undefined) {
    const question = await questionService.getQuestionsByUser(created_by);
    response.status = 200;
    response.body = question;
    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

const handleFindByCourse = async ({ request, response }) => {
  const course_id = request.url.searchParams.get('course_id');
  if (course_id !== undefined) {
    const questions = await questionService.getQuestionsByCourse(course_id);
    response.status = 200;
    response.body = questions;
    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

const handleFindByCourseOwnedByUser = async ({ request, params, response }) => {
  const courseId = params.courseId;
  const user_uuid = request.url.searchParams.get('user_uuid');
  if (courseId !== undefined && user_uuid !== undefined) {
    const questions = await questionService.getQuestionsByCourseOwnedByUser(
      courseId,
      user_uuid
    );
    response.status = 200;
    response.body = questions;
    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

const questionController = {
  handleFindAll,
  handleFindById,
  handleFindByUser,
  handleCreate,
  handleFindByCourse,
  handleFindByCourseOwnedByUser,
};

export default questionController;
