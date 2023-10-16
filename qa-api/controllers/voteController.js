import voteService from '../services/voteService.js';
import { cacheMethodCalls } from '../util/cacheUtil.js';

const cachedVoteService = cacheMethodCalls(voteService, [
  'createQuestionVote',
  'createAnswerVote',
]);

const handleCreateQuestionVote = async ({ request, response }) => {
  const questionId = request.url.searchParams.get('question_id');

  const { user_uuid } = await request.body().value;

  if (request.url.searchParams.has('question_id')) {
    const newVote = await cachedVoteService.createQuestionVote(
      questionId,
      user_uuid
    );

    response.status = 201;
    response.body = newVote[0];

    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

const handleCreateAnswerVote = async ({ request, response }) => {
  const answerId = request.url.searchParams.get('answer_id');

  const { user_uuid } = await request.body().value;

  const voted = await cachedVoteService.userVotedAnswer(answerId, user_uuid);

  if (request.url.searchParams.has('answer_id') && !voted) {
    const newVote = await cachedVoteService.createAnswerVote(
      answerId,
      user_uuid
    );

    response.status = 201;
    response.body = newVote[0];

    return;
  } else {
    response.status = 422;
    response.body = 'Cannot process';
    return;
  }
};

const handleFindQuestionVotes = async ({ response }) => {
  const votes = await cachedVoteService.getQuestionVotes();
  response.status = 200;
  response.body = votes;
  return;
};

const handleFindAnswerVotes = async ({ response }) => {
  const votes = await cachedVoteService.getAnswerVotes();
  response.status = 200;
  response.body = votes;
  return;
};

const voteController = {
  handleCreateQuestionVote,
  handleCreateAnswerVote,
  handleFindQuestionVotes,
  handleFindAnswerVotes,
};

export default voteController;
