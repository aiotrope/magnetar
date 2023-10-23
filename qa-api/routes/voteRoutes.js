import { Router } from '../deps.js';

import voteController from '../controllers/voteController.js';

const router = new Router();

router.post('/vote/question', voteController.handleCreateQuestionVote);
router.post('/vote/answer', voteController.handleCreateAnswerVote);
router.get('/votes/question', voteController.handleFindQuestionVotes);
router.get('/votes/answer', voteController.handleFindAnswerVotes);

export default router;
