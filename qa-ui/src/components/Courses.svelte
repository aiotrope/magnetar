<script>
  import { userUuid, courses, courseID } from '../stores/stores';
</script>

<h1 class="text-2xl font-bold leading-7 text-gray-700 mb-2">Courses</h1>
<p class="text-slate-300">User: {$userUuid}</p>
<div class="flex flex-wrap gap-4 my-2">
  {#each $courses as course}
    <div class="mb-1">
      <img
        class="object-cover shadow-lg"
        src={course.img}
        alt={`Image for course ${course.title}`}
      />
      <button
        class="text-sky-500 mt-2 text-sm"
        on:click={() => courseID.update((currentValue) => parseInt(course.id))}
        >Link to {course.title}</button
      >
    </div>
  {/each}
</div>
