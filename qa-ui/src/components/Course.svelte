<script>
  import { onMount, onDestroy } from 'svelte';

  import {
    userUuid,
    courseId,
    questionId,
    questions,
    questionsByCourse,
    questionById,
  } from '../stores/stores.js';
  import courseService from '../services/courseService.js';
  import questionService from '../services/questionService.js';

  import Loader from './Loader.svelte';
  import Questions from './Questions.svelte';
  import Question from './Question.svelte';

  let course = {};

  let imgUrl;

  let isLoading = true;

  let inputQuestionData = { title: '', details: '' };

  let currentQuestionId;

  let currentQuestions;

  let currentQuestionsByCourse;

  let currentQuestionById;

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const courseById = await courseService.findById($courseId);

      course = courseById;
      course = course;

      const img = course?.img;

      imgUrl = img.replace('500x150', '800x150');
      imgUrl = imgUrl;

      const questions = await questionService.getByCourse($courseId);

      questionsByCourse.set(questions);

      // const question = await questionService.findById($questionId);

      // questionById.set(question);

      if (courseById !== undefined) {
        isLoading = false;
        clearInterval(interval);
        //console.clear();
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const createQuestion = await questionService.create(
      $courseId,
      $userUuid,
      inputQuestionData.title,
      inputQuestionData.details
    );

    console.log(createQuestion);

    $questions = [createQuestion, ...$questions];

    $questionsByCourse = [createQuestion, ...$questionsByCourse];
  };

  questionId.subscribe((currentValue) => {
    currentQuestionId = currentValue;
  });

  questions.subscribe((currentValue) => {
    localStorage.setItem('questions', JSON.stringify(currentValue));
  });

  questionsByCourse.subscribe((currentValue) => {
    localStorage.setItem('questionsByCourse', JSON.stringify(currentValue));
  });

  questionById.subscribe((currentValue) => {
    localStorage.setItem('questionById', JSON.stringify(currentValue));
  });

  const unsubscribeQuestionId = questionId.subscribe((currentValue) => {
    currentQuestionId = currentValue;
  });

  const unsubscribeQuestions = questions.subscribe((currentValue) => {
    currentQuestions = currentValue;
  });

  const unsubscribeQuestionsByCourse = courseId.subscribe((currentValue) => {
    currentQuestionsByCourse = currentValue;
  });

  const unsubscribeQuestionById = questionById.subscribe((currentValue) => {
    currentQuestionById = currentValue;
  });

  onDestroy(unsubscribeQuestionsByCourse);

  onDestroy(unsubscribeQuestionId);

  onDestroy(unsubscribeQuestions);

  onDestroy(unsubscribeQuestionById);

   $: console.log($questionById)
</script>

<section>
  {#if isLoading}
    <Loader />
  {:else}
    <section class="mb-2">
      <div class="mb-5">
        <h2 class="text-l font-bold leading-7 text-gray-700">
          {course?.details}
        </h2>
      </div>
      <div class="shadow-lg">
        <img
          class="object-cover h-150 w-800"
          src={imgUrl}
          alt={`Image for course ${course?.title}`}
        />
      </div>
    </section>
    <section class="mb-3">
      <form on:submit={onSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
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
            >Your question related to {course.title}</label
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
          ADD QUESTION {course.title}
        </button>
      </form>
    </section>
  {/if}
</section>
{#if $questionsByCourse?.length > 0}
  {#each $questionsByCourse as question}
    <div class="mb-3">
      <h3>{question.title}</h3>
      <p>{question.details}</p>

      <button
        type="button"
        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        on:click={() => questionId.update((val) => parseInt(question.id))}
        >Answer this question</button
      >
    </div>
  {/each}
{:else if $questionById?.id}
 <h3>{$questionById?.title}</h3>
{/if}

<section />
