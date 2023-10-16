const getUser = async () => {
  const userQuestions = await fetch('/api/questions'); 

  const userAnswers = await fetch('/api/answers'); 

  const questionVotes = await fetch('/api/votes/question'); 

  const answerVotes = await fetch('/api/votes/answer'); 

  const uuid = await fetch('/api/user/uuid'); 

  const jsonQuestions = await userQuestions.json();

  const jsonAnswers = await userAnswers.json();

  const jsonQuestionVotes = await questionVotes.json();

  const jsonAnswerVotes = await answerVotes.json();

  const jsonUuid = await uuid.json();

  let user;
  if (jsonQuestions?.length > 0 && jsonQuestions !== undefined) {
    const userOnDbQ = jsonQuestions[0]?.user_uuid;
    user = userOnDbQ;
  } else if (jsonAnswers?.length > 0 && jsonAnswers !== undefined) {
    const userOnDbA = jsonAnswers[0]?.user_uuid;
    user = userOnDbA;
  } else if (jsonQuestionVotes?.length > 0 && jsonQuestionVotes !== undefined) {
    const userOnDbQV = jsonQuestionVotes[0]?.user_uuid;
    user = userOnDbQV;
  } else if (jsonAnswerVotes?.length > 0 && jsonAnswerVotes !== undefined) {
    const userOnDbAV = jsonAnswerVotes[0]?.user_uuid;
    user = userOnDbAV;
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
