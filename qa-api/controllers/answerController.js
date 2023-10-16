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


const handleUpdateVotes = async ({ request, params, response }) => {
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
};

const answerController = {
  handleFindAll,
  handleCreate,
  handleUpdateVotes,
};

export default answerController;
