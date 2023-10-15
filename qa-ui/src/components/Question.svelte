<script>
  import { onDestroy } from 'svelte';
  import { marked } from 'marked';
  import pLimit from 'p-limit';

  import { questions, courses, answers, userUuid } from '../stores/stores';

  import answerService from '../services/answerService';
  import questionService from '../services/questionService';
  import courseService from '../services/courseService.js';

  export let questionId;

  const limit = pLimit(3);

  let processQueue = [];

  let currentAnswers, currentQuestions;

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
  };

  answers.subscribe((currentValue) => {
    localStorage.setItem('answers', JSON.stringify(currentValue));
  });

  questions.subscribe((currentValue) => {
    localStorage.setItem('questions', JSON.stringify(currentValue));
  });

  const unsubscribeAnswers = answers.subscribe((currentValue) => {
    currentAnswers = currentValue;
  });

  const unsubscribeQuestions = questions.subscribe((currentValue) => {
    currentQuestions = currentValue;
  });

  onDestroy(unsubscribeAnswers);

  onDestroy(unsubscribeQuestions);

  $: console.log('LLM RESULTS', $questions[questionIndex]?.withautomatedanswer);
</script>

<div class="container mt-3 mb-20">
  <div class="grid">
    <div class="my-1">
      <a href={`/${courseFinder?.slug}`}>
        <img
          class="object-cover shadow-lg"
          src={courseFinder?.img}
          alt={`Image for course ${courseFinder?.title}`}
        />
      </a>

      <small>Asked by: {$questions[questionIndex]?.user_uuid}</small><br />
      <small>Asked: {$questions[questionIndex]?.updated}</small><br />
      <div
        class="code bg-zinc-50 p-3 my-1 border-l-4 border-l-slate-500 text-zinc-500"
      >
        {@html marked($questions[questionIndex]?.details)}
      </div>
    </div>
  </div>
  <div class="grid mb-2">
    <form on:submit|preventDefault={onSubmit}>
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
          <small>Answered by: {answer?.user_uuid}</small><br />
          <small>Answered: {courseService.formatTimestamp(answer?.updated)}</small><br />
          <div class="code bg-emerald-50 p-3 my-2 border-l-4 border-l-emerald-600">
            {@html marked(answer?.details)}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
