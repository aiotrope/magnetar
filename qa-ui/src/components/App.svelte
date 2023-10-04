<script>
  import { onMount } from 'svelte';

  import courseService from '../services/courseService.js';
  import Courses from './Courses.svelte';
  import Loader from './Loader.svelte';

  let courses = [];

  let isLoading = true;

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const allCourses = await courseService.getAll();

      courses = [...allCourses];
      courses = courses;

      if (allCourses.length > 0) {
        clearInterval(interval);
        isLoading = false;
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
    <Courses {courses} />
  {/if}
</section>
