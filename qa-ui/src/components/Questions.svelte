<script>
  import { onMount, onDestroy } from 'svelte';
  import { questionId, questions } from '../stores/stores';

  import questionService from '../services/questionService';

  import Question from './Question.svelte';

  let isLoading = true;

  let currentQuestionById;

  export let questionsByCourse;

  /* onMount(async () => {
    if ($questionId !== undefined) {
      await fetchers();
    }
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const question = await questionService.findById($questionId);

      questionById.set(question);

      if (question !== null) {
        isLoading = false;
        clearInterval(interval);
        // console.clear()
      }
    }, 1000);
    return () => clearInterval(interval);
  };
 */
  /* questionById.subscribe((currentValue) => {
    localStorage.setItem('questionById', JSON.stringify(currentValue));
  });

  const unsubscribeQuestionById = questionById.subscribe((currentValue) => {
    currentQuestionById = currentValue;
  });

  onDestroy(unsubscribeQuestionById); */

  // const questionById = $questions.find((q) => q.id === $questionId);

   const questionById = $questions.filter((q) => q?.id === $questionId);

   $: console.log('QUESTION By ID', questionById[0]);

</script>

<div>
  <h3>Questions</h3>
  {#each questionsByCourse as question}
    <div class="mb-3">
      <h3>{question.title}</h3>
      <p>{question.details}</p>

      <button
        type="button"
        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        on:click={() => questionId.update((val) => parseInt(question.id))}
        >Answer this question</button
      >
    </div>
  {/each}
</div>
