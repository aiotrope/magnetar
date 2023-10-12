import questionService from '../services/questionService.js';
import { cacheMethodCalls } from '../util/cacheUtil.js';

const cachedQuestionService = cacheMethodCalls(questionService, [
  'create',
  'updateAutomatedAnswer',
]);

const handleCreate = async ({ request, response, params }) => {
  const courseId = params.courseId;
  const { user_uuid, title, details } = await request.body().value;

  const newQuestion = await cachedQuestionService.create(
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
  const questionId = request.url.searchParams.get('question_id');
  if (request.url.searchParams.has('question_id')) {
    const question = await cachedQuestionService.getQuestionById(questionId);
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
    const question = await cachedQuestionService.getQuestionsByUser(created_by);
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
    const questions = await cachedQuestionService.getQuestionsByCourse(
      course_id
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

const handleFindByCourseOwnedByUser = async ({ request, params, response }) => {
  const courseId = params.courseId;
  const user_uuid = request.url.searchParams.get('user_uuid');
  if (courseId !== undefined && user_uuid !== undefined) {
    const questions =
      await cachedQuestionService.getQuestionsByCourseOwnedByUser(
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

const handleUpdateAutomatedAnswer = async ({ request, params, response }) => {
  const id = params.id;
  const { withautomatedanswer } = await request.body().value;

  if (id !== undefined) {
    const updatedQuestion = await cachedQuestionService.updateAutomatedAnswer(
      id,
      withautomatedanswer
    );

    response.status = 200;
    response.body = updatedQuestion;
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
  handleUpdateAutomatedAnswer,
};

export default questionController;
