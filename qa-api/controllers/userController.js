import userService from '../services/userService.js';
import { cacheMethodCalls } from '../util/cacheUtil.js';

const cachedUserService = cacheMethodCalls(userService, ['create']);

const handleFindByUuid = async ({ request, response }) => {
  const userUuid = request.url.searchParams.get('user_uuid');
  if (userUuid !== undefined) {
    const user = await cachedUserService.getUserByUuid(userUuid);
    response.status = 200;
    response.body = user;
    return;
  } else {
    response.status = 404;
    // response.body = 'Not defined'
    return;
  }
};

const handleGenerateUuid = async ({ response }) => {
  const generate = crypto.randomUUID();
  const uuid = generate;
  response.body = { uuid: uuid };
  return;
};

const userController = {
  handleFindAll,
  handleFindById,
  handleFindByUuid,
  handleCreate,
  handleGenerateUuid,
};

export default userController;
