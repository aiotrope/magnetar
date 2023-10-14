<script>
  import { userUuid, courses, courseId } from '../stores/stores';

  ///export let slug;
</script>

<div>
  <h1 class="text-2xl font-bold leading-7 text-gray-700">Courses</h1>
  <p>User: {$userUuid}</p>
  <div class="flex flex-wrap gap-5 mt-5">
    {#each $courses as course}
      <div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          class="object-cover shadow-lg"
          src={course.img}
          alt={`Image for course ${course.title}`}
          on:click={() => courseId.update((val) => parseInt(course.id))}
        />
      </div>
    {/each}
  </div>
</div>
