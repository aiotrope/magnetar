<script>
  import { onMount, onDestroy } from 'svelte';

  import { userUuid, courses, questions, answers } from '../stores/stores.js';

  import courseService from '../services/courseService.js';
  import userService from '../services/userService.js';
  import questionService from '../services/questionService.js';
  import answerService from '../services/answerService.js';

  import Loader from './Loader.svelte';

  let currentCourses, currentUserUuid, currentAnswers, currentQuestions;

  let isLoading = true;

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const allCourses = await courseService.getAll();

      const setUserId = await userService.getUser();

      const allQuestions = await questionService.getAll();

      const allAnswers = await answerService.getAll();

      courses.set(allCourses);

      userUuid.set(setUserId);

      questions.set(allQuestions);

      answers.set(allAnswers);

      if (
        allCourses.length &&
        allQuestions?.length &&
        allAnswers.length &&
        setUserId !== null
      ) {
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

  questions.subscribe((currentValue) => {
    localStorage.setItem('questions', JSON.stringify(currentValue));
  });

  answers.subscribe((currentValue) => {
    localStorage.setItem('answers', JSON.stringify(currentValue));
  });

  const unsubscribeCourses = courses.subscribe((currentValue) => {
    currentCourses = currentValue;
  });

  const unsubscribUserUuid = userUuid.subscribe((currentValue) => {
    currentUserUuid = currentValue;
  });

  const unsubscribeAnswers = answers.subscribe((currentValue) => {
    currentAnswers = currentValue;
  });

  const unsubscribeQuestions = questions.subscribe((currentValue) => {
    currentQuestions = currentValue;
  });

  onDestroy(unsubscribeCourses);

  onDestroy(unsubscribUserUuid);

  onDestroy(unsubscribeQuestions);

  onDestroy(unsubscribeAnswers);

</script>

<div class="container mt-3">
  {#if $courses?.length > 0}
    <h1 class="text-2xl font-bold leading-7 text-gray-700 mb-2">Courses</h1>
    <p class="text-slate-200">User: {$userUuid}</p>
    <div class="flex flex-wrap gap-2 my-2">
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
  {:else}
    <Loader />
  {/if}
</div>
