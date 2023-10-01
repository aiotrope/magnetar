import { Router } from './deps.js';
import courseController from './controllers/courseController.js';
import userController from './controllers/userController.js';

const router = new Router();

router
  .get('/courses', courseController.handleFindAll)
  .get('/course', courseController.handleFindOne)
  .get('/users', userController.handleFindAll)
  .get('/user', userController.handleFindByUuid)
  .get('/user/:id', userController.handleFindById);

export { router };
