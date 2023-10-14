<!-- <script>
  import { marked } from 'marked';
  import { questionId, questionsByCourse } from '../stores/stores';
</script>

<div>
  <h3 class="text-lg font-bold dark:text-white mb-2">Questions</h3>
  {#each $questionsByCourse as question}
    <div class="mb-3">
      <h3>{question.title}</h3>
      <div class="code">
        {@html marked(question?.details)}
      </div>
      <button
        type="button"
        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        on:click={() => questionId.update((val) => parseInt(question?.id))}
        >Answer this question</button
      >
    </div>
  {/each}
</div>
 -->