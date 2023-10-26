<script>
  import apiService from '../services/apiService';
  import { userUuid, questionVotes, questionID } from '../stores/stores';
  export let question;
  export let onCreateQuestionVote;
  // console.log('VOTES', $questionVotes)
</script>

<div class="mb-1">
  <button
    class="text-sky-500 hover:text-sky-600 text-lg font-bold"
    title={question.title}
    on:click={() => questionID.update((currentValue) => parseInt(question.id))}
    >{question?.title}</button
  >
  <div class="grid grid-cols-2">
    <form class="p-2">
      <button
        type="submit"
        value={question?.id}
        class={`${
          $questionVotes.filter(
            (e) => e?.question_id === question?.id && e?.user_uuid === $userUuid
          )?.length < 1
            ? 'bg-transparent hover:bg-amber-300 text-sky-600 px-3 border border-zinc-100 rounded'
            : 'bg-transparent text-sky-600 px-3 border border-sky-600 rounded opacity-50 cursor-not-allowed'
        }`}
        disabled={$questionVotes.filter(
          (e) => e?.question_id === question?.id && e?.user_uuid === $userUuid
        )?.length > 0}
        on:click={onCreateQuestionVote}
      >
        <i
          class={`${
            $questionVotes.filter(
              (e) =>
                e?.question_id === question?.id && e?.user_uuid === $userUuid
            )?.length < 1
              ? 'fa fa-thumbs-up text-sky-600 hover:text-red-400 text-lg'
              : 'fa fa-thumbs-up text-sky-600 opacity-50 cursor-not-allowed text-lg'
          } `}
        />
        <span
          class={`${
            $questionVotes.filter(
              (e) =>
                e?.question_id === question?.id && e?.user_uuid === $userUuid
            )?.length < 1
              ? 'hover:text-red-400'
              : 'opacity-50 cursor-not-allowed'
          }`}
          >{$questionVotes.filter((e) => e?.question_id === question?.id)
            ?.length}</span
        >
      </button>
    </form>
    <div>
      <i class="fa fa-user text-slate-400" />
      <small class="text-indigo-400">{question?.user_uuid}</small><br />
      <i class="fa fa-edit text-slate-400" />
      <small class="text-slate-400"
        >{apiService.formatTimestamp(question?.timestamp)}</small
      >
    </div>
  </div>
  <div
    class="code bg-zinc-50 p-3 my-1 border-l-4 border-l-indigo-500 text-slate-500"
  >
    {question?.details}
  </div>
</div>
