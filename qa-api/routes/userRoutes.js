import { Router } from '../deps.js';

import userController from '../controllers/userController.js';

const router = new Router();

router.get('/user/uuid', userController.handleGenerateUuid);

export default router;
