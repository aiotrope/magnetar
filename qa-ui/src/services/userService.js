const getUser = async () => {
  const userQuestions = await fetch('/api/questions');

  const uuid = await fetch('/api/user/uuid');

  const jsonQuestions = await userQuestions.json();

  const jsonUuid = await uuid.json();

  let user;
  if (jsonQuestions.length > 0 && jsonQuestions !== undefined) {
    const userOnDb = jsonQuestions[0]?.user_uuid;

    user = userOnDb;
  } else {
    user = jsonUuid?.uuid;
  }

  localStorage.setItem('userUuid', JSON.stringify(user));

  return user;
};

const userService = {
  getUser,
};

export default userService;
