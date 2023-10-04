<script>
  import { onMount } from 'svelte';

  import courseService from '../services/courseService.js';
  import Loader from './Loader.svelte';

  let course = {};

  let isLoading = true;

  let imgUrl;

  export let courseId;

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const courseById = await courseService.findById(courseId);

      course = courseById;
      course = course;

      const img = course?.img;

      imgUrl = img.replace('300x150', '800x90');
      imgUrl = imgUrl;

      if (courseById !== undefined) {
        isLoading = false;
        clearInterval(interval);
        // console.clear()
      }
    }, 1000);
    return () => clearInterval(interval);
  };
</script>

<section>
  {#if isLoading}
    <Loader />
  {:else}
    <section>
      <div class="mb-5">
        <h2 class="text-2xl font-bold leading-7 text-gray-700">Course</h2>
      </div>
      <div class="shadow-lg">
        <a href={`/courses/${course?.id}`}>
          <img
            class="object-cover h-100 w-1000"
            src={imgUrl}
            alt={`Image for course ${course?.title}`}
          />
        </a>
      </div>
    </section>
  {/if}
</section>
