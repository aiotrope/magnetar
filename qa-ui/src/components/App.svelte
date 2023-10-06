<script>
  import { onMount } from 'svelte';

  import { userUuid } from '../stores/stores.js';

  import courseService from '../services/courseService.js';
  import userService from '../services/userService.js';
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

      const setUserId = await userService.getUser();

      courses = [...allCourses];
      courses = courses;

      userUuid.set(setUserId);

      if (allCourses.length > 0 && setUserId !== null) {
        clearInterval(interval);
        isLoading = false;
        // console.clear()
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  userUuid.subscribe((currentValue) => {
    localStorage.setItem('userUuid', JSON.stringify(currentValue));
  });
</script>

<section>
  {#if isLoading}
    <Loader />
  {:else}
    <Courses {courses} />
  {/if}
</section>
