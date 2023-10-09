<script>
  import { onMount, onDestroy } from 'svelte';
  import { questions, questionId } from '../stores/stores';
  
  const questionById = $questions.find((q) => q?.id === $questionId);

  let currentQuestionId;

  const unsubscribeQuestionId = questionId.subscribe((currentValue) => {
    currentQuestionId = currentValue;
  });

  onDestroy(unsubscribeQuestionId);

  $: console.log('QUESTION By ID', $questionId);
</script>

<section>
  <h3>{questionById?.title}</h3>
</section>
