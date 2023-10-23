import { writable } from 'svelte/store';

const userUuid = writable('');

const courses = writable([]);

let questions = writable([]);

let answers = writable([]);

let questionVotes = writable([]);

let answerVotes = writable([]);

let answerID = writable(0);

let questionID = writable(0);

let courseID = writable(0);

export {
  userUuid,
  courses,
  questions,
  answers,
  answerID,
  questionVotes,
  answerVotes,
  questionID,
  courseID,
};
