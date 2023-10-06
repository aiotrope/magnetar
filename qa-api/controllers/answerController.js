import answerService from '../services/answerService.js';
import { cacheMethodCalls } from '../util/cacheUtil.js';

const cachedAnswerService = cacheMethodCalls(answerService, ['create']);

const handleCreate = async ({ request, response }) => {
  const { course_id, question_id, created_by, details } = await request.body()
    .value;

  const newAnswer = await cachedAnswerService.create(
    course_id,
    question_id,
    created_by,
    details
  );

  response.status = 201;
  response.body = newAnswer[0];
};

const handleFindAll = async ({ response }) => {
  const answers = await cachedAnswerService.getAnswers();
  response.status = 200;
  response.body = answers;
  return;
};

const handleFindById = async ({ request, response }) => {
  const id = request.url.searchParams.get('id');
  if (id !== undefined) {
    const answer = await cachedAnswerService.getAnswerById(id);
    response.status = 200;
    response.body = answer;
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
    const answer = await cachedAnswerService.getAnswersByUser(created_by);
    response.status = 200;
    response.body = answer;
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
    const answers = await cachedAnswerService.getAnswersByCourse(course_id);
    response.status = 200;
    response.body = answers;
    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

const handleFindByCourseByQuestionOwnedByUser = async ({
  request,
  params,
  response,
}) => {
  const courseId = params.courseId;
  const questionId = params.questionId;
  const created_by = request.url.searchParams.get('created_by');
  if (
    courseId !== undefined &&
    questionId !== undefined &&
    created_by !== undefined
  ) {
    const answers =
      await cachedAnswerService.getAnswersByCourseByQuestionOwnedByUser(
        courseId,
        questionId,
        created_by
      );
    response.status = 200;
    response.body = answers;
    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

const handleLLM = async ({ request, response }) => {
  const { question } = await request.body().value;

  const data = { question };

  //const data = await request.json();

 const responseData = await fetch('http://localhost:7800/llm/', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(data),
 });


  // response.status = 201;
  // return responseData
};

const answerController = {
  handleFindAll,
  handleFindById,
  handleFindByUser,
  handleCreate,
  handleFindByCourse,
  handleFindByCourseByQuestionOwnedByUser,
  handleLLM,
};

export default answerController;
