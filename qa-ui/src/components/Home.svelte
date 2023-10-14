<script>
  import { onMount, onDestroy } from 'svelte';

  import {
    userUuid,
    courses,
    questions,
    courseId,
    answerId,
    answers,
    questionsByCourse,
    questionId,
    answersByCourseByQuestion,
    questionById,
  } from '../stores/stores.js';

  import courseService from '../services/courseService.js';
  import userService from '../services/userService.js';
  import questionService from '../services/questionService.js';
  import answerService from '../services/answerService.js';

  import Courses from './Courses.svelte';
  import Course from './Course.svelte';
  import Loader from './Loader.svelte';

  // export let slug

  let currentCourses, currentUserUuid, currentCourseId;

  let isLoading = true;

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const allCourses = await courseService.getAll();

      const setUserId = await userService.getUser();

      courses.set(allCourses);

      userUuid.set(setUserId);

      if (allCourses.length > 0 && setUserId !== null) {
        clearInterval(interval);
        // console.clear()
        isLoading = false;
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

  const unsubscribeCourses = courses.subscribe((currentValue) => {
    currentCourses = currentValue;
  });

  const unsubscribUserUuid = userUuid.subscribe((currentValue) => {
    currentUserUuid = currentValue;
  });

  const unsubscribeCourseId = courseId.subscribe((currentValue) => {
    currentCourseId = currentValue;
  });

  onDestroy(unsubscribeCourses);

  onDestroy(unsubscribUserUuid);

  onDestroy(unsubscribeCourseId);

  // $: slug = $courses[courseIndex]?.slug

  // $: courseIndex = $courses?.map((e) => e?.id).indexOf($courseId);

  // $: console.log('Slug', slug)
</script>

{#if $courses?.length > 0}
  <div class="container mt-3">
    <h1 class="text-2xl font-bold leading-7 text-gray-700">Courses</h1>
    <p>User: {$userUuid}</p>
    <div class="flex flex-wrap gap-1">
      {#each $courses as course}
        <div>
          <a href={`/${course?.slug}`}>
            <img
              class="object-cover shadow-lg"
              src={course.img}
              alt={`Image for course ${course.title}`}
            />
          </a>
        </div>
      {/each}
    </div>
  </div>
{/if}
