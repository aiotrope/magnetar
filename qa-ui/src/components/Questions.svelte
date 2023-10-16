<script>
  import { onMount, onDestroy } from 'svelte';

  import { marked } from 'marked';

  import {
    userUuid,
    questions,
    questionVotes,
    questionID,
  } from '../stores/stores.js';
  import questionService from '../services/questionService.js';
  import courseService from '../services/courseService.js';
  import userService from '../services/userService.js';
  import voteService from '../services/voteService.js';

  let isLoading = true;

  let inputQuestionData = { title: '', details: '' };

  let currentQuestions,
    currentUserUuid,
    currentQuestionVotes,
    currentQuestionID;

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
    inputQuestionData.title = '';
    inputQuestionData.details = '';
  };

  $: filterQuestions = $questions.filter((e) => e.course_id === courseId);



  $: userVotedQuestion = $questionVotes?.filter(
    (e) => e?.question_id === $questionID && e?.user_uuid === $userUuid
  );

  $: userVotedQuestionLen = userVotedQuestion?.length;

  $: if (
    userVotedQuestionLen === 0 &&
    userVotedQuestionLen !== undefined &&
    $questionID > 0
  ) {
    (async () => {
      const add = await voteService.createQuestionVote($questionID, $userUuid);

      const setUserId = await userService.getUser();
      userUuid.set(setUserId);

      const allQuestionVotes = await voteService.getQuestionVotes();
      questionVotes.set(allQuestionVotes);

      const update = await questionService.updateVote(
        $questionID,
        userVotedQuestionLen
      );
      if (update) {
        const allQuestions = await questionService.getAll();
        questions.set(allQuestions);
      }
    })();
  }

  questions.subscribe((currentValue) => {
    localStorage.setItem('questions', JSON.stringify(currentValue));
  });

  questionVotes.subscribe((currentValue) => {
    localStorage.setItem('questionVotes', JSON.stringify(currentValue));
  });

  const unsubscribeQuestions = questions.subscribe((currentValue) => {
    currentQuestions = currentValue;
  });

  const unsubscribeQuestionVotes = questionVotes.subscribe((currentValue) => {
    currentQuestionVotes = currentValue;
  });

  const unsubscribUserUuid = userUuid.subscribe((currentValue) => {
    currentUserUuid = currentValue;
  });

  const unsubscribeQuestionID = questionID.subscribe((currentValue) => {
    currentQuestionID = currentValue;
  });

  onDestroy(unsubscribeQuestions);

  onDestroy(unsubscribUserUuid);

  onDestroy(unsubscribeQuestionVotes);

  onDestroy(unsubscribeQuestionID);

  // $: console.log('SAMPLE', $questionID);
</script>

<div class="container mb-10">
  <div class="grid">
    <small class="text-slate-300">Current user: {$userUuid}</small>
    <div class="mb-4 mt-1">
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
          <div class="grid grid-cols-2">
            <div class="p-2">
              <button
                type="submit"
                class={`${
                  $questionVotes.filter(
                    (e) =>
                      e.question_id === question?.id &&
                      e?.user_uuid === $userUuid
                  )?.length < 1
                    ? 'bg-transparent hover:bg-amber-300 text-sky-600 px-3 border border-zinc-100 rounded'
                    : 'bg-transparent text-sky-600 px-3 border border-sky-600 rounded opacity-50 cursor-not-allowed'
                }`}
                disabled={$questionVotes.filter(
                  (e) =>
                    e.question_id === question?.id && e?.user_uuid === $userUuid
                )?.length > 0}
                on:click={() =>
                  questionID.update((val) => parseInt(question?.id) + val)}
              >
                <i
                  class={`${
                    $questionVotes.filter(
                      (e) =>
                        e.question_id === question?.id &&
                        e?.user_uuid === $userUuid
                    )?.length < 1
                      ? 'fa fa-thumbs-up text-sky-600 hover:text-red-400 text-lg'
                      : 'fa fa-thumbs-up text-sky-600 opacity-50 cursor-not-allowed text-lg'
                  } `}
                />
                <span
                  class={`${
                    $questionVotes.filter(
                      (e) =>
                        e.question_id === question?.id &&
                        e?.user_uuid === $userUuid
                    )?.length < 1
                      ? 'hover:text-red-400'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  >{$questionVotes.filter((e) => e.question_id === question?.id)
                    ?.length}</span
                >
              </button>
            </div>
            <div>
              <i class="fa fa-user text-slate-400" />
              <small class="text-indigo-400">{question?.user_uuid}</small><br />
              <i class="fa fa-edit text-slate-400" />
              <small class="text-slate-400"
                >{courseService.formatTimestamp(question?.timestamp)}</small
              >
            </div>
          </div>
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
