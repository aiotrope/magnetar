<script>
  import { courses } from '../stores/stores';

  export let courseIndex;
</script>

<div class="mb-1">
  <p class="text-slate-400">Course ID: {$courses[courseIndex].id}</p>
  <a href="/">
    <img
      class="object-cover shadow-lg"
      src={$courses[courseIndex]?.img}
      alt={`Image for course ${$courses[courseIndex]?.title}`}
    />
  </a>
</div>
<div>
  <h2 class="text-l font-bold leading-7 text-gray-700">
    Course: {$courses[courseIndex]?.title}
  </h2>

  <p class="text-slate-400">{$courses[courseIndex]?.details}</p>
</div>
