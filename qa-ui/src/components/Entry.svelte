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
  import Courses from './Courses.svelte';
  import Course from './Course.svelte';
  import Questions from './Questions.svelte';
  import QuestionHead from './QuestionHead.svelte';
  import Answer from './Answer.svelte';
  import Loader from './Loader.svelte';

  export let qa_url, llm_url;
  export let pLimit;

  let currentCourses,
    currentUserUuid,
    currentAnswers,
    currentQuestions,
    currentQuestionVotes,
    currentAnswerVotes,
    currentCourseID,
    currentAnswerID,
    currentQuestionID;

  let inputQuestionData = { title: '', details: '' };

  let inputAnswerDetails = '';

  let targetQuestionId = 0;

  let targetAnswerId = 0;

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

  $: questionsByCourse = $questions.filter((e) => e?.course_id === $courseID);

  $: answersByQuestion = $answers.filter(
    (e) => e?.question_id === $questionID && e?.course_id === $courseID
  );

  $: courseIndex = $courses?.map((e) => e?.id).indexOf($courseID);

  $: questionIndex = $questions.map((e) => e.id).indexOf($questionID);

  $: targetQuestionIndex = $questions
    .map((e) => e.id)
    .indexOf(targetQuestionId);

  $: courseFinder = $courses.find(
    (e) => e?.id === $questions[questionIndex]?.course_id
  );

  $: answerIndex = $answers.map((e) => e.id).indexOf($answerID);

  $: userVotedQuestion = $questionVotes?.filter(
    (e) => e?.question_id === targetQuestionId && e?.user_uuid === $userUuid
  );

  $: userVotedQuestionLen = userVotedQuestion?.length;

  $: userVotedAnswer = $answerVotes?.filter(
    (e) => e?.question_id === targetAnswerId && e?.user_uuid === $userUuid
  );

  $: userVotedAnswerLen = userVotedAnswer?.length;

  $: filterAnswers = $answers?.filter((e) => e?.question_id === $questionID);

  $: autoAnswer = filterAnswers.filter((e) => e.user_uuid === 'automated');

  //* add question
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

  //* create question votes
  const createQuestionVote = async () => {
    await apiService.createQuestionVote(qa_url, targetQuestionId, $userUuid);
  };

  const questionVoteMutation = createMutation({
    mutationFn: createQuestionVote,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['questionVotes'] });

      const allQuestionVotes = await apiService.getQuestionVotes(qa_url);
      questionVotes.set(allQuestionVotes);

      const setUserId = await apiService.getUser(qa_url);
      userUuid.set(setUserId);

      const update = await apiService.updateQuestionVote(
        qa_url,
        targetQuestionId,
        userVotedQuestionLen
      );

      if (update) {
        queryClient.invalidateQueries({ queryKey: ['questions'] });
        const allQuestions = await apiService.getQuestions(qa_url);
        questions.set(allQuestions);
      }
    },
  });

  const onCreateQuestionVote = async (event) => {
    event.preventDefault();
    let btnValue = parseInt(event.currentTarget.value);

    targetQuestionId = btnValue;
    targetQuestionId = targetQuestionId;

    // console.log('BTN VALUE', btnValue);

    await $questionVoteMutation.mutateAsync(targetQuestionId, $userUuid);
  };

  //* LLM
  const updateQuestion = async () => {
    const updated = await apiService.updatedAutomatedAnswer(
      qa_url,
      $questionID,
      true
    );

    const allQuestions = await apiService.getQuestions(qa_url);

    questions.set(allQuestions);
  };

  const startLLM = async () => {
    const promise1 = await apiService.postLLM(
      llm_url,
      $questions[questionIndex]?.details
    );
    const promise2 = await apiService.postLLM(
      llm_url,
      $questions[questionIndex]?.details
    );
    const promise3 = await apiService.postLLM(
      llm_url,
      $questions[questionIndex]?.details
    );

    processQueue.push(promise1);
    processQueue.push(promise2);
    processQueue.push(promise3);

    let promises = processQueue.map((llm) => {
      return limit(
        async () =>
          await apiService.createNewAnswer(
            qa_url,
            $questions[questionIndex]?.course_id,
            $questionID,
            'automated',
            llm
          )
      );
    });

    const result = await Promise.allSettled(promises);

    queryClient.invalidateQueries({ queryKey: ['answers'] });

    const allAnswers = await apiService.getAnswers(qa_url);

    answers.set(allAnswers);

    limit.clearQueue();

    processQueue.length = 0;

    return result;
  };

  //* add answer
  const createNewAnswer = async () => {
    await apiService.createNewAnswer(
      qa_url,
      $courseID,
      $questionID,
      $userUuid,
      inputAnswerDetails
    );
  };

  const answerMutation = createMutation({
    mutationFn: createNewAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['answers'] });
      queryClient.invalidateQueries({ queryKey: ['answerVotes'] });
      queryClient.invalidateQueries({ queryKey: ['questionVotes'] });
    },
  });

  const onCreateAnswer = async () => {
    await $answerMutation.mutateAsync(inputAnswerDetails);

    const getAnswers = await apiService.getAnswers(qa_url);
    answers.set(getAnswers);
    const setUserId = await apiService.getUser(qa_url);
    userUuid.set(setUserId);

    inputAnswerDetails = '';
  };

  //* create answer votes
  const createAnswerVote = async () => {
    await apiService.createAnswerVote(qa_url, targetAnswerId, $userUuid);
  };

  const answerVoteMutation = createMutation({
    mutationFn: createAnswerVote,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['answerVotes'] });

      const allAnswerVotes = await apiService.getAnswerVotes(qa_url);
      answerVotes.set(allAnswerVotes);

      const setUserId = await apiService.getUser(qa_url);
      userUuid.set(setUserId);

      const update = await apiService.updateAnswerVote(
        qa_url,
        targetAnswerId,
        userVotedAnswerLen
      );

      if (update) {
        queryClient.invalidateQueries({ queryKey: ['answers'] });
        const allAnswers = await apiService.getAnswers(qa_url);
        answers.set(allAnswers);
      }
    },
  });

  const onCreateAnswerVote = async (event) => {
    event.preventDefault();
    let btnValue = parseInt(event.currentTarget.value);

    targetAnswerId = btnValue;
    targetAnswerId = targetAnswerId;

    // console.log('BTN VALUE', btnValue);

    await $answerVoteMutation.mutateAsync(targetAnswerId, $userUuid);
  };

  $: if ($queryCourses.isSuccess) courses.set($queryCourses.data);

  $: if ($queryQuestions.isSuccess) questions.set($queryQuestions.data);

  $: if ($queryAnswers.isSuccess) answers.set($queryAnswers.data);

  $: if ($queryQuestionVotes.isSuccess)
    questionVotes.set($queryQuestionVotes.data);

  $: if ($queryAnswerVotes.isSuccess) answerVotes.set($queryAnswerVotes.data);

  $: if ($questions[questionIndex]?.withautomatedanswer === false) {
    (async () => await updateQuestion())();
  }

  $: if (
    $questions[questionIndex]?.withautomatedanswer &&
    autoAnswer?.length < 3
  ) {
    (async () => await startLLM())();
  }

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
  const unsubscribeQuestionID = questionID.subscribe((currentValue) => {
    currentQuestionID = currentValue;
  });
  const unsubscribeAnswerID = answerID.subscribe((currentValue) => {
    currentAnswerID = currentValue;
  });

  onDestroy(unsubscribeCourses);
  onDestroy(unsubscribeUserUuid);
  onDestroy(unsubscribeQuestions);
  onDestroy(unsubscribeAnswers);
  onDestroy(unsubscribeQuestionVotes);
  onDestroy(unsubscribeAnswerVotes);
  onDestroy(unsubscribeCourseID);
  onDestroy(unsubscribeQuestionID);
  onDestroy(unsubscribeAnswerID);

  // $: console.log('question ID', targetQuestionId);
</script>

<div class="container mt-3 mb-10">
  {#if $queryCourses.isPending}
    <Loader />
  {/if}
  {#if $queryCourses.error}
    An error has occurred:
    {$queryCourses.error.message}
  {/if}
  {#if $queryCourses.isSuccess && $courseID === 0}
    <!-- Course list -->
    <div class="grid">
      <h1 class="text-2xl font-bold leading-7 text-gray-700 mb-2">Courses</h1>
      <p class="text-slate-300">User: {$userUuid}</p>
      <div class="flex flex-wrap gap-4 my-2">
        {#each $courses as course}
          <div class="mb-1">
            <Courses {course} />
          </div>
        {/each}
      </div>
    </div>
  {:else if $courseID > 0 && $questionID === 0}
    <!-- Course by courseID -->
    <div class="grid mb-3">
      <Course {courseIndex} />
    </div>

    <!-- Question Form -->
    <div class="grid mb-2">
      <small class="text-slate-300">Current user: {$userUuid}</small>
      <div class="mb-4">
        <form on:submit|preventDefault={onCreateQuestion}>
          <div class="mb-1">
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
      {#if $questions.length > 0 && questionsByCourse.length}
        <!-- Question list -->
        <div class="grid">
          <h4 class="text-xl font-bold leading-7 text-gray-700">Questions</h4>
          {#each questionsByCourse as question}
            <Questions {question} {onCreateQuestionVote} />
          {/each}
        </div>
      {/if}
    </div>
  {:else if $questions[questionIndex]?.id}
    <div class="grid">
      <QuestionHead
        {questionIndex}
        {courseFinder}
        {courseIndex}
        {onCreateQuestionVote}
      />
      <div class="grid mb-2">
        <!-- Answer Form -->
        <small class="text-slate-300">Current user: {$userUuid}</small>
        <form on:submit|preventDefault={onCreateAnswer} class="mt-1">
          <div class="mb-1">
            <label
              for="details"
              class="block text-sm font-medium text-gray-900 dark:text-white"
              >Your answer to {$questions[questionIndex]?.title}</label
            >
          </div>
          <textarea
            id="details"
            name="details"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
            placeholder="Write a question here"
            bind:value={inputAnswerDetails}
            required
          />
          <button
            class="bg-teal-600 hover:bg-teal-400 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-500 rounded"
            type="submit"
          >
            SUBMIT ANSWER
          </button>
        </form>
      </div>
      <!-- Answer list -->
      {#if $answers?.length > 0 && answersByQuestion?.length > 0}
        <div>
          <h2 class="text-lg font-bold dark:text-white">Answers</h2>
          {#each filterAnswers as answer}
            <Answer {answer} {onCreateAnswerVote} />
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>
