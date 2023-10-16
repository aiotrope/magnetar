import answerService from '../services/answerService.js';
import { cacheMethodCalls } from '../util/cacheUtil.js';

const cachedAnswerService = cacheMethodCalls(answerService, [
  'create',
  'updateVote'
]);

const handleCreate = async ({ request, response, params }) => {
  const courseId = params.courseId;
  const questionId = request.url.searchParams.get('question_id');
  const { user_uuid, details } = await request.body().value;

  if (request.url.searchParams.has('question_id') && courseId !== undefined) {
    const newAnswer = await cachedAnswerService.create(
      courseId,
      questionId,
      user_uuid,
      details
    );

    response.status = 201;
    response.body = newAnswer[0];
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

const handleFindAll = async ({ response }) => {
  const answers = await cachedAnswerService.getAnswers();
  response.status = 200;
  response.body = answers;
  return;
};

const handleFindById = async ({ request, response }) => {
  const id = request.url.searchParams.get('id');
  if (request.url.searchParams.has('id')) {
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

const handleFindByCourseByQuestion = async ({ request, params, response }) => {
  const courseId = params.courseId;
  const questionId = params.questionId;
  if (courseId !== undefined && questionId !== undefined) {
    const answers = await cachedAnswerService.getAnswersByCourseByQuestion(
      courseId,
      questionId
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

const handleFindAnswerByQuestionId = async ({ request, response, params }) => {
  const id = params.id;
  const questionId = request.url.searchParams.get('question_id');

  if (request.url.searchParams.has('question_id') && id !== undefined) {
    const answer = await cachedAnswerService.getAnswerByQuestionId(
      id,
      questionId
    );
    response.status = 200;
    response.body = answer;
    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

/* const handleUpdateVotes = async ({ request, params, response }) => {
  const id = params.id;
  const { votes } = await request.body().value;

  if (id !== undefined) {
    const updatedAnswer = await cachedAnswerService.updateVote(
      id,
      parseInt(votes)
    );

    response.status = 200;
    response.body = updatedAnswer;
    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
}; */
const answerController = {
  handleFindAll,
  handleFindById,
  handleFindByUser,
  handleCreate,
  handleFindByCourse,
  handleFindByCourseByQuestion,
  handleFindAnswerByQuestionId,
  // handleUpdateVotes,
};

export default answerController;
