import { Router } from '../deps.js';

import answerController from '../controllers/answerController.js';

const router = new Router();

router.get('/answers', answerController.handleFindAll);
router.post('/answers', answerController.handleCreate);
router.get('/answer', answerController.handleFindById);
router.get('/answers/user', answerController.handleFindByUser);
router.get(
  '/answers/course',
  answerController.handleFindByCourseByQuestionOwnedByUser
);
router.get('/answers/:courseId/:questionId', answerController.handleFindByCourseByQuestionOwnedByUser);
router.post('/automated', answerController.handleLLM)

export default router;
