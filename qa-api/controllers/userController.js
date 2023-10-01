import userService from '../services/userService.js';

const handleFindAll = async ({ response }) => {
  const courses = await userService.getUsers();
  response.status = 200;
  response.body = courses;
  return;
};

const handleFindById = async ({ params, response }) => {
  const id = params.id
  if (id !== undefined) {
    const user = await userService.getUserById(id);
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
    const user = await userService.getUserByUuid(userUuid);
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
};

export default userController;
