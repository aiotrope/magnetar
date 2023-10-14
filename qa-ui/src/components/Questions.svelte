<script>
  import { onMount, onDestroy } from 'svelte';

  import { marked } from 'marked';

  import {
    userUuid,
    // questionId,
    questionsByCourse,
    questions,
  } from '../stores/stores.js';
  import courseService from '../services/courseService.js';
  import questionService from '../services/questionService.js';

  import Loader from './Loader.svelte';
  // import Questions from './Questions.svelte';
  // import Question from './Question1.svelte';

  let isLoading = true;

  let inputQuestionData = { title: '', details: '' };

  let currentQuestionId, currentQuestionsByCourse, currentQuestions;

  export let courseId, title;

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const allQuestionsByCourse = await questionService.getByCourse(courseId);

      const allQuestions = await questionService.getAll();

      questionsByCourse.set(allQuestionsByCourse);

      questions.set(allQuestions);

      if (
        allQuestionsByCourse !== undefined ||
        allQuestionsByCourse?.length ||
        allQuestions?.length
      ) {
        isLoading = false;
        clearInterval(interval);
        // console.clear();
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  const onSubmit = async () => {
    const createQuestion = await questionService.create(
      courseId,
      $userUuid,
      inputQuestionData.title,
      inputQuestionData.details
    );

    $questionsByCourse = [createQuestion, ...$questionsByCourse];

    $questions = [createQuestion, ...$questions];
  };

  /*  questionId.subscribe((currentValue) => {
    currentQuestionId = currentValue;
  });
 */
  questionsByCourse.subscribe((currentValue) => {
    localStorage.setItem('questionsByCourse', JSON.stringify(currentValue));
  });

  questions.subscribe((currentValue) => {
    localStorage.setItem('questions', JSON.stringify(currentValue));
  });

  /* const unsubscribeQuestionId = questionId.subscribe((currentValue) => {
    currentQuestionId = currentValue;
  }); */

  const unsubscribeQuestionsByCourse = questionsByCourse.subscribe(
    (currentValue) => {
      currentQuestionsByCourse = currentValue;
    }
  );

  const unsubscribeQuestions = questions.subscribe((currentValue) => {
    currentQuestions = currentValue;
  });

  onDestroy(unsubscribeQuestionsByCourse);

  // onDestroy(unsubscribeQuestionId);

  onDestroy(unsubscribeQuestions);

  // $: questionIndex = $questionsByCourse?.map((e) => e?.id).indexOf($questionId);

  // $: console.log('Index', questionIndex);

  // $: questionIndex = $questions.map((e) => e.id).indexOf(parseInt(questionId));

  $: filterQuestions = $questions.filter((e) => e.course_id === courseId)

  $: console.log('FILTER QUESTION', filterQuestions)
</script>

<div class="container">
  <div class="grid">
    <div class="mb-3">
      <form on:submit|preventDefault={onSubmit}>
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
            >Your question related to {title}</label
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
          ADD QUESTION {title}
        </button>
      </form>
    </div>
  </div>
  {#if filterQuestions?.length > 0}
    <div class="grid">
      {#each filterQuestions as question}
        <div class="mb-3">
          <p class="text-md font-bold">
            Question: <a href={`/questions/${question?.id}`} class="text-indigo-500 text-bold">{question?.title}</a
            >
          </p>
          <small>Question by: {question?.user_uuid}</small><br />
          <small>Asked: {question?.updated}</small><br />
          <div
            class="code bg-zinc-50 p-3 my-2 border-l-4 border-l-indigo-500 text-slate-500"
          >
            {@html marked(question?.details)}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
