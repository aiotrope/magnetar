<!-- <script>
  import { onMount, onDestroy } from 'svelte';
  import { questionId, questionById } from '../stores/stores';

  import questionService from '../services/questionService';

  let currentQuestionById

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const question = await questionService.findById($questionId);

      questionById.set(question);

      if (question !== null) {
        isLoading = false;
        clearInterval(interval);
        console.clear();
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  questionById.subscribe((currentValue) => {
    localStorage.setItem('questionById', JSON.stringify(currentValue));
  });

  const unsubscribeQuestionById = questionById.subscribe((currentValue) => {
    currentQuestionById = currentValue;
  });

  onDestroy(unsubscribeQuestionById);

  $: console.log($questionById)
</script>

<section>
  <h3>{questionById?.title}</h3>
</section>
 -->