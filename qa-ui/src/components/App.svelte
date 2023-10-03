<script>
  import { onMount } from 'svelte';

  import courseService from '../services/courseService.js';
  import Courses from './Courses.svelte';

  let courses = [];

  onMount(async () => {
    await getAllCourses();
  });

  const getAllCourses = async () => {
    const interval = setInterval(async () => {
      const allCourses = await courseService.getAll();

      courses = [...allCourses];
      courses = courses;

      if (allCourses.length > 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  };
</script>

<Courses {courses} />
