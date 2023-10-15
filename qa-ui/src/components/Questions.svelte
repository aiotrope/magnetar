<script>
  import { onMount, onDestroy } from 'svelte';

  import { marked } from 'marked';

  import { userUuid, questions } from '../stores/stores.js';
  import questionService from '../services/questionService.js';
  import courseService from '../services/courseService.js';
  import userService from '../services/userService.js';

  let isLoading = true;

  let inputQuestionData = { title: '', details: '' };

  let currentQuestions, currentUserUuid;

  export let courseId, title;

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const allQuestions = await questionService.getAll();

      questions.set(allQuestions);

      if (allQuestions?.length) {
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

    $questions = [createQuestion, ...$questions];

    const setUserId = await userService.getUser();

    userUuid.set(setUserId);
  };

  questions.subscribe((currentValue) => {
    localStorage.setItem('questions', JSON.stringify(currentValue));
  });

  const unsubscribeQuestions = questions.subscribe((currentValue) => {
    currentQuestions = currentValue;
  });

   const unsubscribUserUuid = userUuid.subscribe((currentValue) => {
    currentUserUuid = currentValue;
  });

  onDestroy(unsubscribeQuestions);

  onDestroy(unsubscribUserUuid);

  $: filterQuestions = $questions.filter((e) => e.course_id === courseId);

  // $: console.log('FILTER QUESTION', filterQuestions);
</script>

<div class="container mb-10">
  <div class="grid">
    <div class="mb-4">
      <form on:submit|preventDefault={onSubmit}>
        <div class="mb-2">
          <label class="block text-gray-700 text-sm font-bold" for="title">
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
        <div class="mb-1">
          <label
            for="details"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Your question related to {title}</label
          >
        </div>
        <textarea
          id="details"
          name="details"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
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
        <div class="mb-1">
          <p class="text-md font-bold">
            Question: <a
              href={`/questions/${question?.id}`}
              class="text-sky-500 hover:text-sky-600 text-bold"
              >{question?.title}</a
            >
          </p>
          <small>Asked by: <span class="text-indigo-300">{question?.user_uuid}</span></small><br />
          <small>Asked: <span class="text-slate-300">{courseService.formatTimestamp(question?.updated)}</span></small><br />
          <div
            class="code bg-zinc-50 p-3 my-1 border-l-4 border-l-indigo-500 text-slate-500"
          >
            {@html marked(question?.details)}
          </div>
        </div>
      {/each}
    </div>
 
  {/if}
</div>
