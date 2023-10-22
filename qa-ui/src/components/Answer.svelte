<script>
  import { answerVotes, userUuid, answerID } from '../stores/stores';
  import apiService from '../services/apiService';
  export let answer;
  export let onCreateAnswerVote
</script>

<div class="grid grid-cols-2">
  <div>
    <i class="fa fa-user-circle text-slate-400" />
    <small class="text-emerald-400">{answer?.user_uuid}</small><br />
    <i class="fa fa-edit text-slate-400" />
    <small class="text-slate-400"
      >{apiService.formatTimestamp(answer?.timestamp)}</small
    >
  </div>
  <form class="pl-20 pt-5">
    <button
      type="submit"
      value={answer?.id}
      class={`${
        $answerVotes.filter(
          (e) => e?.answer_id === answer?.id && e?.user_uuid === $userUuid
        )?.length === 0
          ? 'bg-transparent hover:bg-indigo-400 text-sky-600 px-3 border border-zinc-200 rounded'
          : 'bg-transparent text-sky-600 px-3 border border-sky-600 rounded opacity-50 cursor-not-allowed'
      }`}
      disabled={$answerVotes.filter(
        (e) => e?.answer_id === answer?.id && e?.user_uuid === $userUuid
      )?.length > 0}
     on:click={onCreateAnswerVote}
    >
      <i
        class={`${
          $answerVotes.filter(
            (e) => e?.answer_id === answer?.id && e?.user_uuid === $userUuid
          )?.length === 0
            ? 'fa fa-thumbs-up text-slate-500 hover:text-red-400 text-lg'
            : 'fa fa-thumbs-up text-slate-500 text-lg opacity-50 cursor-not-allowed'
        }`}
      />
      <span
        class={`${
          $answerVotes.filter(
            (e) => e?.answer_id === answer?.id && e?.user_uuid === $userUuid
          )?.length === 0
            ? 'hover:text-red-400'
            : 'opacity-50 cursor-not-allowed'
        }`}
        >{$answerVotes.filter((e) => e?.answer_id === answer?.id)?.length}</span
      >
    </button>
  </form>
</div>

<div class="code bg-emerald-50 p-3 my-2 border-l-4 border-l-emerald-600">
  {answer?.details}
</div>
