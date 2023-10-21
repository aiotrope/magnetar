<script>
  import { onDestroy, onMount } from 'svelte';
  import {
    createQuery,
    createMutation,
    useQueryClient,
  } from '@tanstack/svelte-query';

  import {
    userUuid,
    courses,
    questions,
    answers,
    questionVotes,
    answerVotes,
    courseID,
    questionID,
    answerID,
  } from '../stores/stores.js';

  import apiService from '../services/apiService.js';

  import Loader from './Loader.svelte';

  export let qa_url;
  export let marked;
  export let pLimit;

  let currentCourses,
    currentUserUuid,
    currentAnswers,
    currentQuestions,
    currentQuestionVotes,
    currentAnswerVotes,
    currentCourseID;

  let inputQuestionData = { title: '', details: '' };

  const limit = pLimit(3);

  let processQueue = [];

  const queryClient = useQueryClient();

  const queryCourses = createQuery({
    queryKey: ['courses'],
    queryFn: async () => await fetch(`${qa_url}/courses`).then((r) => r.json()),
  });

  const queryQuestions = createQuery({
    queryKey: ['questions'],
    queryFn: async () =>
      await fetch(`${qa_url}/questions`).then((r) => r.json()),
  });
  const queryAnswers = createQuery({
    queryKey: ['answers'],
    queryFn: async () => await fetch(`${qa_url}/answers`).then((r) => r.json()),
  });
  const queryQuestionVotes = createQuery({
    queryKey: ['questionVotes'],
    queryFn: async () =>
      await fetch(`${qa_url}/votes/question`).then((r) => r.json()),
  });
  const queryAnswerVotes = createQuery({
    queryKey: ['answerVotes'],
    queryFn: async () =>
      await fetch(`${qa_url}/votes/answer`).then((r) => r.json()),
  });

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const setUser = await apiService.getUser(qa_url);

      userUuid.set(setUser);

      if (setUser !== null) {
        clearInterval(interval);
        // console.clear();
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  const createNewQuestion = async () => {
    await apiService.createNewQuestion(
      qa_url,
      $courseID,
      $userUuid,
      inputQuestionData.title,
      inputQuestionData.details
    );
  };

  const questionMutation = createMutation({
    mutationFn: createNewQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['answers'] });
    },
  });

  const onCreateQuestion = async () => {
    await $questionMutation.mutateAsync(
      inputQuestionData.title,
      inputQuestionData.details
    );

    const getQuestions = await apiService.getQuestions(qa_url);
    questions.set(getQuestions);
    const setUserId = await apiService.getUser(qa_url);
    userUuid.set(setUserId);

    inputQuestionData.title = '';
    inputQuestionData.details = '';
  };

  /* userUuid.subscribe((currentValue) => {
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
  }); */

  const unsubscribeCourses = courses.subscribe((currentValue) => {
    currentCourses = currentValue;
  });
  const unsubscribeUserUuid = userUuid.subscribe((currentValue) => {
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

  const unsubscribeCourseID = courseID.subscribe((currentValue) => {
    currentCourseID = currentValue;
  });

  $: courseIndex = $courses?.map((e) => e?.id).indexOf($courseID);

  $: questionsByCourse = $questions.filter((e) => e?.course_id === $courseID);

  $: if ($queryCourses.isSuccess) courses.set($queryCourses?.data);

  $: if ($queryQuestions.isSuccess) questions.set($queryQuestions.data);

  $: if ($queryAnswers.isSuccess) answers.set($queryAnswers.data);

  $: if ($queryQuestionVotes.isSuccess) questionVotes.set($queryAnswers.data);

  $: if ($queryAnswerVotes.isSuccess) answerVotes.set($queryAnswers.data);

  onDestroy(unsubscribeCourses);
  onDestroy(unsubscribeUserUuid);
  onDestroy(unsubscribeQuestions);
  onDestroy(unsubscribeAnswers);
  onDestroy(unsubscribeQuestionVotes);
  onDestroy(unsubscribeAnswerVotes);
  onDestroy(unsubscribeCourseID);

  // $: console.log('COURSE ID', $userUuid);
</script>

<div class="container mt-3">
  {#if $queryCourses.isPending}
    <Loader />
  {/if}
  {#if $queryCourses.error}
    An error has occurred:
    {$queryCourses.error.message}
  {/if}
  {#if $queryCourses.isSuccess && $courseID === 0}
    <!-- Course list -->
    <h1 class="text-2xl font-bold leading-7 text-gray-700 mb-2">Courses</h1>
    <p class="text-slate-300">User: {$userUuid}</p>
    <div class="flex flex-wrap gap-4 my-2">
      {#each $courses as course}
        <div class="mb-1">
          <img
            class="object-cover shadow-lg"
            src={course.img}
            alt={`Image for course ${course.title}`}
          />
          <button
            class="text-sky-500 mt-2 text-sm"
            on:click={() =>
              courseID.update((currentValue) => parseInt(course.id))}
            >Link to {course.title}</button
          >
        </div>
      {/each}
    </div>
  {:else if $courseID > 0}
    <!-- Course by courseID -->
    <div class="grid mb-3">
      <div class="mb-1">
        <p class="text-slate-400">Course ID: {$courses[courseIndex].id}</p>
        <a href="/">
          <img
            class="object-cover shadow-lg"
            src={$courses[courseIndex]?.img}
            alt={`Image for course ${$courses[courseIndex]?.title}`}
          />
        </a>
      </div>
      <div>
        <h2 class="text-l font-bold leading-7 text-gray-700">
          Course: {$courses[courseIndex]?.title}
        </h2>

        <p class="text-slate-400">{$courses[courseIndex]?.details}</p>
      </div>
    </div>

    <div class="grid">
      <small class="text-slate-300">Current user: {$userUuid}</small>
      <div class="mb-4 mt-1">
        <form on:submit|preventDefault={onCreateQuestion}>
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
              disabled={$questionMutation.status === 'loading'}
              required
            />
          </div>
          <div class="mb-1">
            <label
              for="details"
              class="block text-sm font-medium text-gray-900 dark:text-white"
              >Your question related to {$courses[courseIndex]?.title}</label
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
            disabled={$questionMutation.status === 'loading'}
          >
            ADD QUESTION {$courses[courseIndex]?.title}
          </button>
        </form>
      </div>
    </div>
    <div>
      <!-- Question list -->
      {#if $questions.length > 0}
        <div class="grid">
          {#each questionsByCourse as question}
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
                          e?.question_id === question?.id &&
                          e?.user_uuid === $userUuid
                      )?.length < 1
                        ? 'bg-transparent hover:bg-amber-300 text-sky-600 px-3 border border-zinc-100 rounded'
                        : 'bg-transparent text-sky-600 px-3 border border-sky-600 rounded opacity-50 cursor-not-allowed'
                    }`}
                    disabled={$questionVotes.filter(
                      (e) =>
                        e?.question_id === question?.id &&
                        e?.user_uuid === $userUuid
                    )?.length > 0}
                    on:click={() => questionID.update((val) => question?.id)}
                  >
                    <i
                      class={`${
                        $questionVotes.filter(
                          (e) =>
                            e?.question_id === question?.id &&
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
                            e?.question_id === question?.id &&
                            e?.user_uuid === $userUuid
                        )?.length < 1
                          ? 'hover:text-red-400'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      >{$questionVotes.filter(
                        (e) => e?.question_id === question?.id
                      )?.length}</span
                    >
                  </button>
                </div>
                <div>
                  <i class="fa fa-user text-slate-400" />
                  <small class="text-indigo-400">{question?.user_uuid}</small
                  ><br />
                  <i class="fa fa-edit text-slate-400" />
                  <small class="text-slate-400"
                    >{apiService.formatTimestamp(question?.timestamp)}</small
                  >
                </div>
              </div>
              <div
                class="code bg-zinc-50 p-3 my-1 border-l-4 border-l-indigo-500 text-slate-500"
              >
                {question?.details}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>
{location.hash}
