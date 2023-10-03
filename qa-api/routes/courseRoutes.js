import { Router } from '../deps.js';

import courseController from '../controllers/courseController.js';

const router = new Router();

router.get('/courses', courseController.handleFindAll);
router.get('/course', courseController.handleFindOne);

export default router;
