<script>
  import { onMount, onDestroy } from 'svelte';

  import { marked } from 'marked';

  import pLimit from 'p-limit';

  import {
    userUuid,
    courses,
    questions,
    courseId,
    answerId,
    answers,
    questionsByCourse,
    questionId,
    answersByCourseByQuestion,
    questionById,
  } from '../stores/stores.js';

  import courseService from '../services/courseService.js';
  import userService from '../services/userService.js';
  import questionService from '../services/questionService.js';
  import answerService from '../services/answerService.js';

  import Courses from './Courses.svelte.js';
  import Course from './Course.svelte.js';
  import Loader from './Loader.svelte.js';

  let isLoading = true;

  let currentCourseId;

  let currentAnswers;

  let currentQuestionsByCourse;

  let currentQuestionId;

  let currentQuestions;

  let currentQuestionById;

  let currentAnswerId;

  let currentAnswersByCourseByQuestion;

  let currentCourses;

  let inputQuestionData = { title: '', details: '' };

  let inputAnswerData = { details: '' };

  let processQueue = [];

  const limit = pLimit(3);

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const allCourses = await courseService.getAll();

      const setUserId = await userService.getUser();

      const allQuestions = await questionService.getAll();

      const allAnswers = await answerService.getAll();

      const allAnswersByCourseByQuestion =
        await answerService.getAllByCourseByQuestion($courseId, $questionId);

      const allQuestionsByCourse = await questionService.getByCourse($courseId);

      //

      courses.set(allCourses);

      userUuid.set(setUserId);

      questions.set(allQuestions);

      answers.set(allAnswers);

      questionsByCourse.set(allQuestionsByCourse);

      answersByCourseByQuestion.set(allAnswersByCourseByQuestion);

      //

      if (questionIndex !== -1 && $questionsByCourse?.length > 0) {
        const question = await questionService.findById($questionId);
        questionById.set(question);

        if ($questionById !== null) {
           clearInterval(interval);
        }
      }

      if (allCourses.length > 0 && setUserId !== null) {
        // clearInterval(interval);
        isLoading = false;
        // console.clear()
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  const onSubmitQuestion = async (event) => {
    event.preventDefault();
    const createQuestion = await questionService.create(
      $courseId,
      $userUuid,
      inputQuestionData.title,
      inputQuestionData.details
    );

    $questions = [createQuestion, ...$questions];

    $questionsByCourse = [createQuestion, ...$questionsByCourse];
  };

  const onSubmitAnswer = async (event) => {
    event.preventDefault();
    const createAnswer = await answerService.create(
      $courseId,
      $questionId,
      $userUuid,
      inputAnswerData.details
    );

    console.log('CREATED ANSWER', createAnswer);

    $answers = [createAnswer, ...$answers];

    $answersByCourseByQuestion = [createAnswer, ...$answersByCourseByQuestion];
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

  questionsByCourse.subscribe((currentValue) => {
    localStorage.setItem('questionsByCourse', JSON.stringify(currentValue));
  });

  answersByCourseByQuestion.subscribe((currentValue) => {
    localStorage.setItem(
      'answersByCourseByQuestion',
      JSON.stringify(currentValue)
    );
  });

  questionById.subscribe((currentValue) => {
    localStorage.setItem('questionById', JSON.stringify(currentValue));
  });

  const unsubscribeQuestions = questions.subscribe((currentValue) => {
    currentQuestions = currentValue;
  });

  const unsubscribeQuestionId = questionId.subscribe((currentValue) => {
    currentQuestionId = currentValue;
  });

  const unsubscribeCourseId = courseId.subscribe((currentValue) => {
    currentCourseId = currentValue;
  });

  const unsubscribeAnswers = answers.subscribe((currentValue) => {
    currentAnswers = currentValue;
  });

  const unsubscribeQuestionsByCourse = questionsByCourse.subscribe(
    (currentValue) => {
      currentQuestionsByCourse = currentValue;
    }
  );

  const unsubscribeAnswersByCourseByQuestion = answers.subscribe(
    (currentValue) => {
      currentAnswersByCourseByQuestion = currentValue;
    }
  );

  const unsubscribeAnswerId = answerId.subscribe((currentValue) => {
    currentAnswerId = currentValue;
  });

  const unsubscribeQuestionById = questionById.subscribe((currentValue) => {
    currentQuestionById = currentValue;
  });

  const unsubscribeCourses = courses.subscribe((currentValue) => {
    currentCourses = currentValue;
  });

  onDestroy(unsubscribeCourseId);

  onDestroy(unsubscribeCourses);

  onDestroy(unsubscribeAnswers);

  onDestroy(unsubscribeQuestionsByCourse);

  onDestroy(unsubscribeQuestionId);

  onDestroy(unsubscribeQuestions);

  onDestroy(unsubscribeAnswersByCourseByQuestion);

  onDestroy(unsubscribeAnswerId);

  onDestroy(unsubscribeQuestionById);

  $: courseIndex = $courses?.map((e) => e?.id).indexOf($courseId);

  $: questionIndex = $questionsByCourse?.map((e) => e?.id).indexOf($questionId);

  $: answerIndex = $answersByCourseByQuestion
    ?.map((e) => e?.id)
    .indexOf($answerId);
</script>

<div class="container">
  {#if isLoading}
    <Loader />
  {:else if $courseId && questionIndex === -1}
    <!-- Course -->
    <div>
      <div class="mb-2">
        <div class="mb-5">
          <h2 class="text-l font-bold leading-7 text-gray-700">
            {$courses[courseIndex]?.details}
          </h2>
        </div>
        <div class="my-3">
          <img
            class="object-cover shadow-lg"
            src={$courses[courseIndex]?.img}
            alt={`Image for course ${$courses[courseIndex]?.title}`}
          />
        </div>
      </div>
      <div class="mb-3">
        <form on:submit={onSubmitQuestion}>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="title"
              type="text"
              placeholder="Enter a question title"
              bind:value={inputQuestionData.title}
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="details"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your question related to {$courses[courseIndex]?.title}</label
            >
          </div>
          <textarea
            id="details"
            name="details"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
            placeholder="Write a question here"
            bind:value={inputQuestionData.details}
            required
          />
          <button
            class="bg-indigo-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="submit"
          >
            ADD QUESTION {$courses[courseIndex]?.title}
          </button>
        </form>
      </div>
      {#if $questionsByCourse?.length === 0}
        <div>
          <h3 class="text-lg font-bold dark:text-white mb-2">Questions</h3>
          {#each $questionsByCourse as question}
            <div class="mb-3">
              <h3>{question.title}</h3>
              <div class="code">
                {@html marked(question?.details)}
              </div>
              <button
                type="button"
                class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                on:click={() =>
                  questionId.update((val) => parseInt(question?.id))}
                >Answer this question</button
              >
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {:else if questionIndex !== -1 && $questionsByCourse?.length > 0 && answerIndex === -1}
    <div>
      <div class="mb-5">
        <h3 class="text-l font-bold leading-7 text-gray-700">
          Section for answering {$questionsByCourse[questionIndex]?.title}
        </h3>
      </div>
      <div class="my-3">
        <img
          class="object-contain"
          src={$courses[courseIndex]?.img}
          alt={`Image for course ${$courses[courseIndex]?.title}`}
        />
      </div>
      <div class="code">
        {@html marked($questionsByCourse[questionIndex]?.details)}
      </div>
      <div class="mb-3 mt-5">
        <form on:submit={onSubmitAnswer}>
          <div class="mb-4">
            <label
              for="details"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your answer to {$questionsByCourse[questionIndex]?.title}</label
            >
          </div>
          <textarea
            id="details"
            name="details"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
            placeholder="Write a question here"
            bind:value={inputAnswerData.details}
            required
          />
          <button
            class="bg-indigo-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="submit"
          >
            SUBMIT ANSWER
          </button>
        </form>
      </div>
    </div>
  {:else if !$courseId}
    <div>
      <h1 class="text-2xl font-bold leading-7 text-gray-700">Courses</h1>
      <p>User: {$userUuid}</p>
      <div class="flex flex-wrap gap-5 mt-5">
        {#each $courses as course}
          <div>
            <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
              role="button"
              class="object-cover shadow-lg"
              src={course.img}
              alt={`Image for course ${course.title}`}
              on:click={() => courseId.update((val) => parseInt(course.id))}
            />
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
