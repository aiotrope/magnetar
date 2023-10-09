const handleGenerateUuid = async ({ response }) => {
  const generate = crypto.randomUUID();
  const uuid = generate;
  response.body = { uuid: uuid };
  return;
};
const userController = {
  handleGenerateUuid,
};

export default userController;
