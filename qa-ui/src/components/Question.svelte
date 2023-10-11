<script>
  import { onMount, onDestroy } from 'svelte';

  import { marked } from 'marked';

  import {
    questionsByCourse,
    courseId,
    userUuid,
    questionId,
    answers,
    answersByCourseByQuestion,
    answerId,
  } from '../stores/stores';

  import answerService from '../services/answerService.js';

  import Answers from './Answers.svelte';

  import Answer from './Answer.svelte';

  export let questionIndex;

  export let course;

  export let imgUrl;

  let isLoading = true;

  let currentAnswersByCourseByQuestion;

  let currentAnswerId;

  let inputAnswerData = { details: '' };

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const allAnswers = await answerService.getAllByCourseByQuestion(
        $courseId,
        $questionId
      );

      answersByCourseByQuestion.set(allAnswers);

      if (allAnswers !== undefined) {
        isLoading = false;
        clearInterval(interval);
        //console.clear();
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  const onSubmit = async (event) => {
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

  answersByCourseByQuestion.subscribe((currentValue) => {
    localStorage.setItem(
      'answersByCourseByQuestion',
      JSON.stringify(currentValue)
    );
  });

  const unsubscribeAnswersByCourseByQuestion = answers.subscribe(
    (currentValue) => {
      currentAnswersByCourseByQuestion = currentValue;
    }
  );

  const unsubscribeAnswerId = answerId.subscribe((currentValue) => {
    currentAnswerId = currentValue;
  });

  onDestroy(unsubscribeAnswersByCourseByQuestion);

  onDestroy(unsubscribeAnswerId);

  $: answerIndex = $answersByCourseByQuestion
    ?.map((e) => e?.id)
    .indexOf($answerId);

  $: console.log('idex', answerIndex);
</script>

<div>
  {#if answerIndex === -1}
    <div class="mb-5">
      <h3 class="text-l font-bold leading-7 text-gray-700">
        Section for answering {$questionsByCourse[questionIndex]?.title}
      </h3>
    </div>
    <div class="my-3">
      <img
        class="object-contain"
        src={imgUrl}
        alt={`Image for course ${course?.title}`}
      />
    </div>
    <div class="code">
      {@html marked($questionsByCourse[questionIndex]?.details)}
    </div>
    <div class="mb-3 mt-5">
      <form on:submit={onSubmit}>
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
  {/if}

  <div class="mb-3 mt-5">
    {#if answerIndex !== -1 && $answersByCourseByQuestion?.length > 0}
      <Answer {answerIndex} {questionIndex} {course} {imgUrl} />
    {:else if answerIndex === -1 && $answersByCourseByQuestion?.length > 0}
      <Answers />
    {/if}
  </div>
</div>
