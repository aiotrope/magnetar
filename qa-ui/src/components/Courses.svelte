<script>
  import { courseID } from '../stores/stores';

  export let course;
</script>

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
