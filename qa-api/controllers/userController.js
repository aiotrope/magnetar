/* import userService from '../services/userService.js';
import { cacheMethodCalls } from '../util/cacheUtil.js';

const cachedUserService = cacheMethodCalls(userService, ['create']);

const handleCreate = async ({ request, response }) => {
  const { uuid } = await request.body().value;

  const newUser = await cachedUserService.create(uuid);

  response.status = 201;
  response.body = newUser[0];
};

const handleFindAll = async ({ response }) => {
  const users = await cachedUserService.getUsers();
  response.status = 200;
  response.body = users;
  return;
};

const handleFindById = async ({ params, response }) => {
  const id = params.id;
  if (id !== undefined) {
    const user = await cachedUserService.getUserById(id);
    response.status = 200;
    response.body = user;
    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

const handleFindByUuid = async ({ request, response }) => {
  const userUuid = request.url.searchParams.get('userUuid');
  if (userUuid !== undefined) {
    const user = await cachedUserService.getUserByUuid(userUuid);
    response.status = 200;
    response.body = user;
    return;
  } else {
    response.status = 404;
    response.body = 'Not defined';
    return;
  }
};

const userController = {
  handleFindAll,
  handleFindById,
  handleFindByUuid,
  handleCreate,
};

export default userController;
 */