<script>
  import { onMount, onDestroy } from 'svelte';

  import { marked } from 'marked';

  import pLimit from 'p-limit';

  import {
    questionsByCourse,
    courseId,
    userUuid,
    questionId,
    answers,
    answersByCourseByQuestion,
    answerId,
    questionById,
  } from '../stores/stores';

  import questionService from '../services/questionService.js';

  import answerService from '../services/answerService.js';

  import Answers from './Answers.svelte';

  import Answer from './Answer.svelte';

  export let questionIndex;

  export let course;

  export let imgUrl;

  let isLoading = true;

  let currentAnswersByCourseByQuestion;

  let currentAnswerId;

  let currentQuestionById;

  let currentAnswers;

  let inputAnswerData = { details: '' };

  let processQueue = [];

  const limit = pLimit(3);

  const filterAnswers = $answersByCourseByQuestion?.filter(
    (answer) => answer?.user_uuid === 'automated'
  );

  /*  (async () => {
    if (
      $questionById?.withautomatedanswer === false &&
      filterAnswers?.length === 0 &&
      limit.activeCount > 1 &&
      limit.pendingCount > 1
    ) {
      const mult = await startLLM();

      console.log('MULT', mult);
    }
  })(); */

  $: if ($questionById?.withautomatedanswer === false) {
    (async () => await startLLM())();
  }

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const allAnswers = await answerService.getAllByCourseByQuestion(
        $courseId,
        $questionId
      );

      const question = await questionService.findById($questionId);

      answersByCourseByQuestion.set(allAnswers);

      questionById.set(question);

      if (
        allAnswers !== undefined &&
        limit.activeCount < 1 &&
        limit.pendingCount < 1 &&
        $questionById?.withautomatedanswer &&
        filterAnswers?.length > 0
      ) {
        isLoading = false;
        clearInterval(interval);
        //console.clear();
        limit.clearQueue();
        processQueue.length = 0;
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

  const startLLM = async () => {
    const promise1 = await questionService.postLLM(
      $questionsByCourse[questionIndex]?.details
    );
    const promise2 = await questionService.postLLM(
      $questionsByCourse[questionIndex]?.details
    );
    const promise3 = await questionService.postLLM(
      $questionsByCourse[questionIndex]?.details
    );

    processQueue.push(promise1);
    processQueue.push(promise2);
    processQueue.push(promise3);

    const updated = await questionService.updatedAutomatedAnswer(
      $questionsByCourse[questionIndex]?.id,
      true
    );

    const question = await questionService.findById(updated?.id);

    questionById.set(question);

    let promises = processQueue.map((llm) => {
      return limit(
        async () =>
          await answerService.create($courseId, $questionId, 'automated', llm)
      );
    });

    const result = await Promise.allSettled(promises).then((results) =>
      results.forEach((result) => {
        $answers = [result, ...$answers];

        $answersByCourseByQuestion = [result, ...$answersByCourseByQuestion];
      })
    );
    // console.log('LLM RESULTS', result);

    return result;
  };

  answers.subscribe((currentValue) => {
    localStorage.setItem('answers', JSON.stringify(currentValue));
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

  const unsubscribeAnswers = answers.subscribe((currentValue) => {
    currentAnswers = currentValue;
  });

  onDestroy(unsubscribeAnswersByCourseByQuestion);

  onDestroy(unsubscribeAnswerId);

  onDestroy(unsubscribeQuestionById);

  onDestroy(unsubscribeAnswers);

  $: answerIndex = $answersByCourseByQuestion
    ?.map((e) => e?.id)
    .indexOf($answerId);

  $: console.log('FILTER ANSWER', filterAnswers?.length);
  $: console.log('WITH AUTO', $questionById?.withautomatedanswer);
  $: console.log('QUESTION ID', $questionId);
  $: console.log('QUESTION BY ID', $questionById);
  $: console.log('ANSWER BY QUESTION', $answersByCourseByQuestion);
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
