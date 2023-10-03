import { Router } from '../deps.js';

import userController from '../controllers/userController.js';

const router = new Router();

router.get('/users', userController.handleFindAll);
router.post('/users', userController.handleCreate);
router.get('/user', userController.handleFindByUuid);
router.get('/user/:id', userController.handleFindById);

export default router;
