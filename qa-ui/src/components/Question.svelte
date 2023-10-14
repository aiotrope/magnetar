<script>
  // import { onMount, onDestroy } from 'svelte';
  import { marked } from 'marked';
  import { questions, courses } from '../stores/stores';

  export let questionId;

  $: questionIndex = $questions.map((e) => e.id).indexOf(parseInt(questionId));

  $: courseFinder = $courses.find(
    (e) => e?.id === $questions[questionIndex].course_id
  );
</script>

<div class="container mt-3">
  <div class="grid">
    <div class="my-3">
      <a href={`/${courseFinder?.slug}`}>
        <img
          class="object-cover shadow-lg"
          src={courseFinder?.img}
          alt={`Image for course ${courseFinder?.title}`}
        />
      </a>

      <small>Question by: {$questions[questionIndex]?.user_uuid}</small><br />
      <small>Asked: {$questions[questionIndex]?.updated}</small><br />
      <div
        class="code bg-zinc-50 p-3 my-2 border-l-4 border-l-slate-500 text-slate-500"
      >
        {@html marked($questions[questionIndex]?.details)}
      </div>
    </div>
  </div>
</div>
