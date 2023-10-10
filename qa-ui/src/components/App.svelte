<script>
  import { onMount, onDestroy } from 'svelte';

  import {
    userUuid,
    courses,
    questions,
    courseId,
    answers,
    questionsByCourse
  } from '../stores/stores.js';

  import courseService from '../services/courseService.js';
  import userService from '../services/userService.js';
  import questionService from '../services/questionService.js';
  import answerService from '../services/answerService.js';

  import Courses from './Courses.svelte';
  import Course from './Course.svelte';
  import Loader from './Loader.svelte';

  let isLoading = true;

  let currentCourseId;

  let currentAnswers;

  let currentQuestionsByCourse

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const allCourses = await courseService.getAll();

      const setUserId = await userService.getUser();

      const allQuestions = await questionService.getAll();

      const allAnswers = await answerService.getAll();

      const allQuestionsByCourse = await questionService.getByCourse($courseId)

      courses.set(allCourses);

      userUuid.set(setUserId);

      questions.set(allQuestions);

      answers.set(allAnswers);

      questionsByCourse.set(allQuestionsByCourse)

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

  answers.subscribe((currentValue) => {
    localStorage.setItem('answers', JSON.stringify(currentValue));
  });

  questionsByCourse.subscribe((currentValue) => {
    localStorage.setItem('questionsByCourse', JSON.stringify(currentValue))
  })

  const unsubscribeCourseId = courseId.subscribe((currentValue) => {
    currentCourseId = currentValue;
  });

  const unsubscribeAnswers = answers.subscribe((currentValue) => {
    currentAnswers = currentValue;
  });

  const unsubscribeQuestionsByCourse = answers.subscribe((currentValue) => {
    currentQuestionsByCourse = currentValue;
  });
 
  onDestroy(unsubscribeCourseId);

  onDestroy(unsubscribeAnswers);

  onDestroy(unsubscribeQuestionsByCourse)
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
