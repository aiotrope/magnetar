<script>
  import { onMount, onDestroy } from 'svelte';

  import { marked } from 'marked';

  import answerService from '../services/answerService';

  import {
    answersByCourseByQuestion,
    answerId,
    questionsByCourse,
  } from '../stores/stores';

  export let answerIndex, questionIndex;

  export let imgUrl, course;
</script>

<div>
  <div class="mb-5">
    <h3 class="text-l font-bold leading-7 text-gray-700">Answer section</h3>
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
  <h4>Answer</h4>
  <div class="code">
    {@html marked($answersByCourseByQuestion[answerIndex]?.details)}
  </div>
</div>
