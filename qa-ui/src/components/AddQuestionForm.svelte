<script>
  export let inputQuestionData = {};
  export let course;
  export let addQuestion;

  let title = inputQuestionData?.title;
  let details = inputQuestionData?.details;
</script>

<form>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
      Title
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="title"
      type="text"
      placeholder="Title"
      bind:value={title}
    />
  </div>
  <div class="mb-4">
    <label
      for="details"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Your question related to {course.title}</label
    >
  </div>
  <textarea
    id="question"
    name="question"
    bind:value={details}
    rows="4"
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
    placeholder="Write a question here"
  />
  <button
    class="bg-indigo-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    on:click={addQuestion}
  >
    ADD QUESTION {course.title}
  </button>
</form>
