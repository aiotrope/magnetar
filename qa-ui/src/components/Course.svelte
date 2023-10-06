<script>
  import { onMount } from 'svelte';
  import { userUuid } from '../stores/stores.js';

  import courseService from '../services/courseService.js';
  import questionService from '../services/questionService.js';
  import userService from '../services/userService.js';

  import Loader from './Loader.svelte';
  import AddQuestionForm from './AddQuestionForm.svelte';

  let course = {};

  let isLoading = true;

  let imgUrl;

  let inputQuestionData = { title: '', details: '' };

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

      imgUrl = img.replace('500x150', '800x150');
      imgUrl = imgUrl;

      if (courseById !== undefined) {
        isLoading = false;
        clearInterval(interval);
        // console.clear()
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  /* const addQuestion = async () => {
    const createQuestion = await questionService.create(
      courseId,
      $userUuid,
      title,
      details
    );

    console.log(createQuestion)
  }; */

  console.log(courseId)
</script>

<section>
  {#if isLoading}
    <Loader />
  {:else}
    <section class="mb-2">
      <div class="mb-5">
        <h2 class="text-l font-bold leading-7 text-gray-700">
          {course?.details}
        </h2>
      </div>
      <div class="shadow-lg">
        <a href={`/courses/${course?.id}`}>
          <img
            class="object-cover h-150 w-800"
            src={imgUrl}
            alt={`Image for course ${course?.title}`}
          />
        </a>
      </div>
    </section>
    <section>
      <AddQuestionForm {inputQuestionData} {course} />
    </section>
  {/if}
</section>
