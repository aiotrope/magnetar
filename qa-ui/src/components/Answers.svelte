<script>
  import { marked } from 'marked';
  import { answersByCourseByQuestion } from '../stores/stores';
</script>

<div>
  <h3 class="text-lg font-bold dark:text-white mb-2">Answers</h3>
  {#each $answersByCourseByQuestion as answer}
    <div class="mb-3">
      <div class="mt-2 code">
        {@html marked(answer?.details)}
      </div>
      <!-- <button
        type="button"
        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        on:click={() => questionId.update((val) => parseInt(question?.id))}
        >Answer this question</button
      > -->
    </div>
  {/each}
  </div>