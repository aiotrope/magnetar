import { Router } from '../deps.js';

import answerController from '../controllers/answerController.js';

const router = new Router();

router.get('/answers', answerController.handleFindAll);
router.post('/answers/:courseId', answerController.handleCreate);
router.patch('/answer/votes/:id', answerController.handleUpdateVotes);

export default router;
