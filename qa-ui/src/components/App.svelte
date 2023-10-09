<script>
  import { onMount, onDestroy } from 'svelte';

  import {
    userUuid,
    courses,
    questions,
    courseId,
  } from '../stores/stores.js';

  import courseService from '../services/courseService.js';
  import userService from '../services/userService.js';
  import questionService from '../services/questionService.js';

  import Courses from './Courses.svelte';
  import Course from './Course.svelte';
  import Loader from './Loader.svelte';

  let isLoading = true;

  let currentCourseId;

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const allCourses = await courseService.getAll();

      const setUserId = await userService.getUser();

      const allQuestions = await questionService.getAll();

      courses.set(allCourses);

      userUuid.set(setUserId);

      questions.set(allQuestions);

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

  courses.subscribe((currentValue) => {
    localStorage.setItem('courses', JSON.stringify(currentValue));
  });

  questions.subscribe((currentValue) => {
    localStorage.setItem('questions', JSON.stringify(currentValue));
  });

  const unsubscribeCourseId = courseId.subscribe((currentValue) => {
    currentCourseId = currentValue;
  });

  onDestroy(unsubscribeCourseId);

  //$: console.log($courseId);
</script>

<section>
  {#if isLoading}
    <Loader />
  {:else if $courseId}
    <Course />
  {:else}
    <Courses />
  {/if}
</section>
