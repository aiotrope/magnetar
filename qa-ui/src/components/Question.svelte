<script>
  import { onDestroy } from 'svelte';
  import { marked } from 'marked';
  import pLimit from 'p-limit';

  import {
    questions,
    courses,
    answers,
    userUuid,
    questionVotes,
    answerVotes,
  } from '../stores/stores';

  import answerService from '../services/answerService';
  import questionService from '../services/questionService';
  import courseService from '../services/courseService.js';
  import userService from '../services/userService.js';
  import voteService from '../services/voteService.js';

  export let questionId;

  const limit = pLimit(3);

  let processQueue = [];

  let currentAnswers,
    currentQuestions,
    currentUserUuid,
    currentQuestionVotes,
    currentAnswerVotes;

  let inputAnswerData = { details: '' };

  $: questionIndex = $questions.map((e) => e.id).indexOf(parseInt(questionId));

  $: courseFinder = $courses.find(
    (e) => e?.id === $questions[questionIndex]?.course_id
  );

  $: filterAnswers = $answers?.filter(
    (e) => e?.question_id === parseInt(questionId)
  );

  $: autoAnswer = filterAnswers.filter((e) => e.user_uuid === 'automated');

  $: if ($questions[questionIndex]?.withautomatedanswer === false) {
    (async () => await updateQuestion())();
  }

  $: if (
    $questions[questionIndex]?.withautomatedanswer &&
    autoAnswer?.length < 3
  ) {
    (async () => await startLLM())();
  }

  const updateQuestion = async () => {
    const updated = await questionService.updatedAutomatedAnswer(
      $questions[questionIndex]?.id,
      true
    );

    const allQuestions = await questionService.getAll();

    questions.set(allQuestions);
  };

  const startLLM = async () => {
    const promise1 = await questionService.postLLM(
      $questions[questionIndex]?.details
    );
    const promise2 = await questionService.postLLM(
      $questions[questionIndex]?.details
    );
    const promise3 = await questionService.postLLM(
      $questions[questionIndex]?.details
    );

    processQueue.push(promise1);
    processQueue.push(promise2);
    processQueue.push(promise3);

    let promises = processQueue.map((llm) => {
      return limit(
        async () =>
          await answerService.create(
            $questions[questionIndex]?.course_id,
            questionId,
            'automated',
            llm
          )
      );
    });

    const result = await Promise.allSettled(promises);

    const allAnswers = await answerService.getAll();

    answers.set(allAnswers);

    limit.clearQueue();

    processQueue.length = 0;

    return result;
  };

  const onSubmit = async () => {
    const createAnswer = await answerService.create(
      $questions[questionIndex]?.course_id,
      questionId,
      $userUuid,
      inputAnswerData.details
    );

    console.log('CREATED ANSWER', createAnswer);

    $answers = [createAnswer, ...$answers];

    const setUserId = await userService.getUser();

    userUuid.set(setUserId);
    inputAnswerData.details = '';
  };

  /*  const userVotedQuestion = () => {
    const voted = $questionVotes?.filter(
      (e) => e?.question_id === questionId && e?.user_uuid === $userUuid
    );

    return voted?.length;
  }; */

  $: userVotedQuestion = $questionVotes?.filter(
    (e) => e?.question_id === parseInt(questionId) && e?.user_uuid === $userUuid
  );

  $: userVotedQuestionLen = userVotedQuestion?.length;

  const addQuestionVote = async () => {
    const voted = $questionVotes?.filter(
      (e) =>
        e?.question_id === parseInt(questionId) && e?.user_uuid === $userUuid
    );

    if (voted?.length < 2) {
      const add = await voteService.createQuestionVote(
        parseInt(questionId),
        $userUuid
      );

      /* const update = await questionService.updateVotes(
        parseInt(questionId),
        voted?.length
      ); */
      if (add) {
        const setUserId = await userService.getUser();
        const allQuestionVotes = await voteService.getQuestionVotes();
        const allQuestions = await questionService.getAll();
        userUuid.set(setUserId);
        questionVotes.set(allQuestionVotes);
        questions.set(allQuestions);
      }
    } else {
      alert(`${$userUuid} user voted question`);
    }
  };

  const userVotedAnswer = (obj) => {
    const voted = $answerVotes?.filter(
      (e) => e?.answer_id === parseInt(obj?.id) && e?.user_uuid === $userUuid
    );

    return voted?.length;
  };

  const addAnswerVote = async (obj) => {
    const voted = $answerVotes?.filter(
      (e) => e?.answer_id === obj?.id && e?.user_uuid === $userUuid
    );

    if (voted?.length < 2) {
      const add = await voteService.createAnswerVote(
        parseInt(obj?.id),
        $userUuid
      );

      const votes = $answerVotes?.filter(
        (e) => e.answer_id === parseInt(obj?.id)
      );

     /*  const update = await answerService.updateVotes(
        parseInt(obj?.id),
        votes?.length
      ); */
      const setUserId = await userService.getUser();
      const allAnswerVotes = await voteService.getAnswerVotes();
      const allAnswers = await answerService.getAll();
      userUuid.set(setUserId);
      answerVotes.set(allAnswerVotes);
      answers.set(allAnswers);
    } else {
      alert(`${$userUuid} user voted answer`);
    }
  };

  answers.subscribe((currentValue) => {
    localStorage.setItem('answers', JSON.stringify(currentValue));
  });

  questions.subscribe((currentValue) => {
    localStorage.setItem('questions', JSON.stringify(currentValue));
  });

  userUuid.subscribe((currentValue) => {
    localStorage.setItem('userUuid', JSON.stringify(currentValue));
  });

  questionVotes.subscribe((currentValue) => {
    localStorage.setItem('questionVotes', JSON.stringify(currentValue));
  });

  answerVotes.subscribe((currentValue) => {
    localStorage.setItem('answerVotes', JSON.stringify(currentValue));
  });

  const unsubscribeAnswers = answers.subscribe((currentValue) => {
    currentAnswers = currentValue;
  });

  const unsubscribeQuestions = questions.subscribe((currentValue) => {
    currentQuestions = currentValue;
  });

  const unsubscribeUserUuid = userUuid.subscribe((currentValue) => {
    currentUserUuid = currentValue;
  });

  const unsubscribeQuestionVotes = questionVotes.subscribe((currentValue) => {
    currentQuestionVotes = currentValue;
  });

  const unsubscribeAnswerVotes = answerVotes.subscribe((currentValue) => {
    currentAnswerVotes = currentValue;
  });

  onDestroy(unsubscribeAnswers);

  onDestroy(unsubscribeQuestions);

  onDestroy(unsubscribeUserUuid);

  onDestroy(unsubscribeQuestionVotes);

  onDestroy(unsubscribeAnswerVotes);

  $: console.log('LEN', questionId);
</script>

<div class="container mt-3 mb-10">
  <div class="grid">
    <div class="my-1">
      <a href={`/${courseFinder?.slug}`}>
        <img
          class="object-cover shadow-lg"
          src={courseFinder?.img}
          alt={`Image for course ${courseFinder?.title}`}
        />
      </a>
      <div class="grid grid-cols-2">
        <div class="p-2">
          <button
            type="button"
            class={`${
              userVotedQuestionLen < 2
                ? 'bg-transparent hover:bg-amber-300 text-sky-600 px-3 border border-zinc-100 rounded'
                : 'bg-transparent text-sky-600 px-3 border border-sky-300 rounded opacity-50 cursor-not-allowed'
            }`}
            disabled={userVotedQuestionLen > 2}
            on:click={addQuestionVote}
          >
            <i
              class={`${
                userVotedQuestionLen < 2
                  ? 'fa fa-thumbs-up text-sky-600 hover:text-red-400 text-lg'
                  : 'fa fa-thumbs-up text-lg opacity-50 cursor-not-allowed'
              }`}
            />
            {$questions[questionIndex]?.votes}
          </button>
        </div>
        <div>
          <i class="fa fa-user text-slate-400" />
          <small class="text-indigo-400"
            >{$questions[questionIndex]?.user_uuid}</small
          ><br />
          <i class="fa fa-edit text-slate-400" />
          <small class="text-slate-400"
            >{courseService.formatTimestamp(
              $questions[questionIndex]?.timestamp
            )}</small
          >
        </div>
      </div>
      <div
        class="code bg-zinc-50 p-3 my-1 border-l-4 border-l-slate-500 text-zinc-500"
      >
        {@html marked($questions[questionIndex]?.details)}
      </div>
    </div>
  </div>
  <div class="grid mb-2">
    <small class="text-slate-300">Current user: {$userUuid}</small>
    <form on:submit|preventDefault={onSubmit} class="mt-1">
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
        bind:value={inputAnswerData.details}
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
  {#if filterAnswers?.length > 0}
    <div>
      <h2 class="text-lg font-bold dark:text-white">Answers</h2>
      {#each filterAnswers as answer}
        <div>
          <div class="grid grid-cols-2">
            <div>
              <i class="fa fa-user-circle text-slate-400" />
              <small class="text-emerald-400">{answer?.user_uuid}</small><br />
              <i class="fa fa-edit text-slate-400" />
              <small class="text-slate-400"
                >{courseService.formatTimestamp(answer?.timestamp)}</small
              >
            </div>
            <div class="pl-20 pt-5">
              <button
                class={`${
                  userVotedAnswer(answer) < 2
                    ? 'bg-transparent hover:bg-indigo-400 text-sky-600 px-3 border border-zinc-200 rounded'
                    : 'bg-transparent text-sky-600 px-3 border border-sky-600 rounded opacity-50 cursor-not-allowed'
                }`}
                disabled={userVotedAnswer(answer) > 2}
                on:click={addAnswerVote(answer)}
              >
                <i
                  class={`${
                    userVotedAnswer(answer) < 2
                      ? 'fa fa-thumbs-up text-slate-500 hover:text-red-400 text-lg'
                      : 'fa fa-thumbs-up text-slate-500 text-lg opacity-50 cursor-not-allowed'
                  }`}
                />
                <span
                  class={`${
                    userVotedAnswer(answer) < 2
                      ? 'hover:text-red-400'
                      : 'opacity-50 cursor-not-allowed'
                  }`}>{answer?.votes}</span
                >
              </button>
            </div>
          </div>

          <div
            class="code bg-emerald-50 p-3 my-2 border-l-4 border-l-emerald-600"
          >
            {@html marked(answer?.details)}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
