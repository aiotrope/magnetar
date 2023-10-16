import questionService from '../services/questionService.js';
import { cacheMethodCalls } from '../util/cacheUtil.js';

const cachedQuestionService = cacheMethodCalls(questionService, [
  'create',
  'updateAutomatedAnswer',
  'updateVote',
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

const handleUpdateVotes = async ({ request, params, response }) => {
  const id = params.id;
  const { votes } = await request.body().value;

  if (id !== undefined) {
    const updatedQuestion = await cachedQuestionService.updateVote(
      id,
      parseInt(votes)
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
  handleCreate,
  handleUpdateAutomatedAnswer,
  handleUpdateVotes,
};

export default questionController;
