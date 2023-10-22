<script>
  import {
    courses,
    questionVotes,
    userUuid,
    questions,
    courseID,
    questionID,
  } from '../stores/stores';

  import apiService from '../services/apiService';

  export let questionIndex;
  export let courseFinder;
  export let courseIndex;
  export let onCreateQuestionVote;

  const returnToCourseQuestionsPage = (event) => {
    event.preventDefault();
    const courseBtn = parseInt(event.currentTarget.value);
    courseID.update((currentVal) => parseInt(courseBtn));
    questionID.update((currentVal) => 0);
  };
</script>

<div class="my-1">
  <button
    class="text-slate-300 my-2"
    value={$courses[courseIndex].id}
    on:click={returnToCourseQuestionsPage}
    >Go back to {$courses[courseIndex].title}</button
  >
  <img
    class="object-cover shadow-lg"
    src={courseFinder?.img}
    alt={`Image for course ${courseFinder?.title}`}
  />
  <div class="grid grid-cols-2">
    <div class="p-2">
      <button
        type="button"
        value={$questions[questionIndex]?.id}
        class={`${
          $questionVotes.filter(
            (e) =>
              e.question_id === $questions[questionIndex]?.id &&
              e?.user_uuid === $userUuid
          )?.length === 0
            ? 'bg-transparent hover:bg-amber-300 text-sky-600 px-3 border border-zinc-100 rounded'
            : 'bg-transparent text-sky-600 px-3 border border-sky-300 rounded opacity-50 cursor-not-allowed'
        }`}
        disabled={$questionVotes.filter(
          (e) =>
            e.question_id === $questions[questionIndex]?.id &&
            e?.user_uuid === $userUuid
        )?.length > 0}
        on:click={onCreateQuestionVote}
      >
        <i
          class={`${
            $questionVotes.filter(
              (e) =>
                e.question_id === $questions[questionIndex]?.id &&
                e?.user_uuid === $userUuid
            )?.length === 0
              ? 'fa fa-thumbs-up text-sky-600 hover:text-red-400 text-lg'
              : 'fa fa-thumbs-up text-lg opacity-50 cursor-not-allowed'
          }`}
        />

        {$questionVotes.filter(
          (e) => e?.question_id === $questions[questionIndex]?.id
        )?.length}
      </button>
    </div>
    <div>
      <i class="fa fa-user text-slate-400" />
      <small class="text-indigo-400"
        >{$questions[questionIndex]?.user_uuid}</small
      ><br />
      <i class="fa fa-edit text-slate-400" />
      <small class="text-slate-400"
        >{apiService.formatTimestamp(
          $questions[questionIndex]?.timestamp
        )}</small
      >
    </div>
  </div>
  <div
    class="code bg-zinc-50 p-3 my-1 border-l-4 border-l-slate-500 text-zinc-500"
  >
    {$questions[questionIndex]?.details}
  </div>
</div>
