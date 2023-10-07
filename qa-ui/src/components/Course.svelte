<script>
  import { onMount } from 'svelte';

  import { userUuid, courseId } from '../stores/stores.js';
  import courseService from '../services/courseService.js';

  import AddQuestionForm from './AddQuestionForm.svelte';
  import Loader from './Loader.svelte';

  let course = {};

  let imgUrl;

  let isLoading = true;

  let inputQuestionData = { title: '', details: '' };

  onMount(async () => {
    await fetchers();
  });

  const fetchers = async () => {
    const interval = setInterval(async () => {
      const courseById = await courseService.findById($courseId);

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

  const addQuestion = async () => {
    const createQuestion = await questionService.create(
      $courseId,
      $userUuid,
      title,
      details
    );

    console.log(createQuestion);
  };
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
        <img
          class="object-cover h-150 w-800"
          src={imgUrl}
          alt={`Image for course ${course?.title}`}
        />
      </div>
    </section>
    <section>
      <AddQuestionForm {inputQuestionData} {course} {addQuestion} />
    </section>
  {/if}
</section>
