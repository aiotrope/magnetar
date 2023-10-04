<script>
  export let courses;
</script>

<h1 class="text-2xl font-bold leading-7 text-gray-700">Courses</h1>
<div class="grid grid-cols-2 gap-3 mt-5">
  {#each courses as course}
    <div class="shadow-lg">
      <a href={`/courses/${course.id}`}>
        <img
          class="object-cover h-150 w-300"
          src={course.img}
          alt={`Image for course ${course.title}`}
        />
      </a>
    </div>
  {/each}
</div>
