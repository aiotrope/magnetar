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
  } from '../stores/stores.js';

  import apiService from '../services/apiService.js';

  import Loader from './Loader.svelte';

  let currentCourses,
    currentUserUuid,
    currentAnswers,
    currentQuestions,
    currentQuestionVotes,
    currentAnswerVotes,
    currentCourseID;

  let title,
    details = '';

  export let qa_url;

  const queryClient = useQueryClient();

  const queryCourses = createQuery({
    queryKey: ['courses'],
    queryFn: async () => await fetch(`${qa_url}/courses`).then((r) => r.json()),
  });

  const getUser = createQuery({
    queryKey: ['user'],
    queryFn: async () =>
      await fetch(`${qa_url}/user/uuid`).then((r) => r.json()),
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

  const createNewQuestion = async () => {
    await apiService.createNewQuestion(
      qa_url,
      $courseID,
      $userUuid,
      title,
      details
    );
  };

  const questionMutation = createMutation({
    mutationFn: createNewQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['answers'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const onCreateQuestion = async () => {
    await $questionMutation.mutateAsync(title, details);

    /*  $questions = [createQuestion, ...$questions];

    const setUserId = await userService.getUser();

    userUuid.set(setUserId);
    inputQuestionData.title = '';
    inputQuestionData.details = ''; */
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

  $: if ($queryCourses.isSuccess) courses.set($queryCourses?.data);

  $: if ($getUser.isSuccess) userUuid.set($getUser.data.uuid);

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

  $: courseIndex = $courses?.map((e) => e?.id).indexOf($courseID);

  $: console.log('COURSE ID', courseIndex);
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
        <img
          class="object-cover shadow-lg"
          src={$courses[courseIndex]?.img}
          alt={`Image for course ${$courses[courseIndex]?.title}`}
        />
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
              bind:value={title}
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
            bind:value={details}
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
      <!-- Question ist -->
      {#if $questions.length > 0}
        {#each $questions as question}
          <h3>{question.title}</h3>
        {/each}
      {/if}
    </div>
  {/if}
</div>
