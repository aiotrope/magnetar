import { Router } from '../deps.js';

import questionController from '../controllers/questionController.js';

const router = new Router();

router.get('/questions', questionController.handleFindAll);
router.post('/questions/:courseId', questionController.handleCreate);
router.patch('/question/:id', questionController.handleUpdateAutomatedAnswer);
router.patch('/question/votes/:id', questionController.handleUpdateVotes);

export default router;
