<!-- <script>
  import { onMount, onDestroy } from 'svelte';

  import { marked } from 'marked';

  import {
    answersByCourseByQuestion,
    answerId,
    courseId,
    questionId,
    questionById,
    answers,
  } from '../stores/stores';

  import answerService from '../services/answerService';

  import questionService from '../services/questionService';

  let isLoading = true;

  let currentAnswersByCourseByQuestion;

  let currentAnswerId;

  let currentAnswers;

  let currentQuestionById

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

      if (allAnswers !== undefined) {
        isLoading = false;
        clearInterval(interval);
        //console.clear();
      }
    }, 1000);
    return () => clearInterval(interval);
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
</script>

<div>
  <h3 class="text-lg font-bold dark:text-white mb-2">Answers</h3>
  {#each $answersByCourseByQuestion as answer}
    <div class="mb-3">
      <div class="mt-2 code">
        {@html marked(answer?.details)}
      </div>
      <button
        type="button"
        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        on:click={() => answerId.update((val) => parseInt(answer?.id))}
        >View answer</button
      >
    </div>
  {/each}
</div>
 -->