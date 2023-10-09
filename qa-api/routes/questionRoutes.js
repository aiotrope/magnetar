import { Router } from '../deps.js';

import questionController from '../controllers/questionController.js';

const router = new Router();

router.get('/questions', questionController.handleFindAll);
router.post('/questions/:courseId', questionController.handleCreate);
router.get('/question', questionController.handleFindById);
router.get('/questions/user', questionController.handleFindByUser);
router.get('/questions/course', questionController.handleFindByCourse); //questions/course?course_id
router.get(
  '/questions/:courseId',
  questionController.handleFindByCourseOwnedByUser
);

export default router;
