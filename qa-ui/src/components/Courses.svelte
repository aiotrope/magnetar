<script>
  export let courses;
</script>

<section>
  {#each courses as course}
    <h2><a href={`/courses/${course.id}`}>{course.title}</a></h2>
    <p>{course?.details}</p>
    <button
      class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    >
      {course.id}
    </button>
  {/each}
</section>
