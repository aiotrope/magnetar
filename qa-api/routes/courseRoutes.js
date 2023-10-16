import { Router } from '../deps.js';

import courseController from '../controllers/courseController.js';

const router = new Router();

router.get('/courses', courseController.handleFindAll);

export default router;
