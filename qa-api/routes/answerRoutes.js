import { Router } from '../deps.js';

import answerController from '../controllers/answerController.js';

const router = new Router();

router.get('/answers', answerController.handleFindAll);
router.post('/answers/:courseId', answerController.handleCreate);
router.get('/answer', answerController.handleFindById);
router.get('/answers/user', answerController.handleFindByUser);
router.get(
  '/answers/:courseId/:questionId',
  answerController.handleFindByCourseByQuestion
);
router.get('/answer/:id', answerController.handleFindAnswerByQuestionId);
// router.patch('/answer/votes/:id', answerController.handleUpdateVotes);



export default router;
