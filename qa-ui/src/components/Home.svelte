<script>
  import { onMount, onDestroy } from 'svelte';

  import {
    userUuid,
    courses,
    questions,
    answers,
    questionVotes,
    answerVotes,
  } from '../stores/stores.js';

  /* import courseService from '../services/courseService.js';
  import userService from '../services/userService.js';
  import questionService from '../services/questionService.js';
  import answerService from '../services/answerService.js';
  import voteService from '../services/voteService.js'; */

  import Loader from './Loader.svelte';

  export let qa_url;

  let currentCourses,
    currentUserUuid,
    currentAnswers,
    currentQuestions,
    currentQuestionVotes,
    currentAnswerVotes;

  let isLoading = true;

  //* ########################################################################################################################################################################
  const getAllCourses = async () => {
  const response = await fetch(`${qa_url}/courses`);

  const jsonData = await response.json();

  if (jsonData.length > 0 || jsonData !== undefined) {
    localStorage.setItem('courses', JSON.stringify(jsonData));
  }
  return jsonData;
};

const getUser = async () => {
  const userQuestions = await fetch(`${qa_url}/questions`);

  const userAnswers = await fetch(`${qa_url}/answers`);

  const questionVotes = await fetch(`${qa_url}/votes/question`);

  const answerVotes = await fetch(`${qa_url}/votes/answer`);

  const uuid = await fetch(`${qa_url}/user/uuid`);

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

const getAllQuestions = async () => {
  const response = await fetch(`${qa_url}/questions`);

  const jsonData = await response.json();

  if (jsonData.length || jsonData !== undefined) {
    localStorage.setItem('questions', JSON.stringify(jsonData));
  }
  return jsonData;
};

const getAllAnswers = async () => {
  const response = await fetch(`${qa_url}/answers`);

  const jsonData = await response.json();

  if (jsonData.length || jsonData !== undefined) {
    localStorage.setItem('answers', JSON.stringify(jsonData));
  }
  return jsonData;
};

const getQuestionVotes = async () => {
  const response = await fetch(`${qa_url}/votes/question`); 

  const jsonData = await response.json();

  if (jsonData.length || jsonData !== undefined) {
    localStorage.setItem('questionVotes', JSON.stringify(jsonData));
  }
  return jsonData;
};

const getAnswerVotes = async () => {
  const response = await fetch(`${qa_url}/votes/answer`); 

  const jsonData = await response.json();

  if (jsonData.length || jsonData !== undefined) {
    localStorage.setItem('answerVotes', JSON.stringify(jsonData));
  }
  return jsonData;
};



  //* ########################################################################################################################################################################

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const allCourses = await  getAllCourses();

      const setUserId = await getUser();

      const allQuestions = await getAllQuestions();

      const allAnswers = await getAllAnswers();

      const allQuestionVotes = await getQuestionVotes();

      const allAnswerVotes = await getAnswerVotes();

      courses.set(allCourses);

      userUuid.set(setUserId);

      questions.set(allQuestions);

      answers.set(allAnswers);

      questionVotes.set(allQuestionVotes);

      answerVotes.set(allAnswerVotes);

      if (
        allCourses?.length &&
        allQuestions?.length &&
        allAnswers?.length &&
        setUserId !== null &&
        allQuestionVotes?.length &&
        allAnswerVotes?.length
      ) {
        clearInterval(interval);
        // console.clear()
        isLoading = false;
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  userUuid.subscribe((currentValue) => {
    localStorage.setItem('userUuid', JSON.stringify(currentValue));
  });

  courses.subscribe((currentValue) => {
    localStorage.setItem('courses', JSON.stringify(currentValue));
  });

  questions.subscribe((currentValue) => {
    localStorage.setItem('questions', JSON.stringify(currentValue));
  });

  answers.subscribe((currentValue) => {
    localStorage.setItem('answers', JSON.stringify(currentValue));
  });

  questionVotes.subscribe((currentValue) => {
    localStorage.setItem('questionVotes', JSON.stringify(currentValue));
  });

  answerVotes.subscribe((currentValue) => {
    localStorage.setItem('answerVotes', JSON.stringify(currentValue));
  });

  const unsubscribeCourses = courses.subscribe((currentValue) => {
    currentCourses = currentValue;
  });

  const unsubscribUserUuid = userUuid.subscribe((currentValue) => {
    currentUserUuid = currentValue;
  });

  const unsubscribeAnswers = answers.subscribe((currentValue) => {
    currentAnswers = currentValue;
  });

  const unsubscribeQuestions = questions.subscribe((currentValue) => {
    currentQuestions = currentValue;
  });

  const unsubscribeQuestionVotes = questionVotes.subscribe((currentValue) => {
    currentQuestionVotes = currentValue;
  });

  const unsubscribeAnswerVotes = answerVotes.subscribe((currentValue) => {
    currentAnswerVotes = currentValue;
  });

  onDestroy(unsubscribeCourses);

  onDestroy(unsubscribUserUuid);

  onDestroy(unsubscribeQuestions);

  onDestroy(unsubscribeAnswers);

  onDestroy(unsubscribeQuestionVotes);

  onDestroy(unsubscribeAnswerVotes);
</script>

<div class="container mt-3">
  {#if $courses?.length > 0}
    <h1 class="text-2xl font-bold leading-7 text-gray-700 mb-2">Courses</h1>
    <p class="text-slate-300">User: {$userUuid}</p>
    <div class="flex flex-wrap gap-2 my-2">
      {#each $courses as course}
        <div>
          <a href={`/${course?.slug}`}>
            <img
              class="object-cover shadow-lg"
              src={course.img}
              alt={`Image for course ${course.title}`}
            />
          </a>
        </div>
      {/each}
    </div>
  {:else}
    <Loader />
  {/if}
</div>
