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

  export let slug

  let currentCourses, currentUserUuid, currentCourseId;

  let isLoading = true

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

  onDestroy(unsubscribeCourseId)

  $: slug = $courses[courseIndex]?.slug

  $: courseIndex = $courses?.map((e) => e?.id).indexOf($courseId);

  // $: console.log('Slug', slug)
</script>

<div class="container">
  {#if isLoading}
    <Loader />
  {:else if $courseId}
   <h2>{$courses[courseIndex]?.id}</h2>
   <h2>{$courses[courseIndex]?.title}</h2>
   <h2>{$courses[courseIndex]?.details}</h2>
   <h2>SLUG: {slug}</h2>
  {:else}
    <Courses />
  {/if}
</div>

<div class="container">
  <nav>
    <ul>
      <li><a href="/fortran-cs-5758">Fortran</a></li>
      <li><a href="/java-cs-3456">Java</a></li>
      <li><a href="/go-cs-9012">Go</a></li>
    </ul>
  </nav>
</div>





