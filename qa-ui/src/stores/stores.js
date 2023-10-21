import { writable } from 'svelte/store';
let user = JSON.parse(localStorage.getItem('userUuid'));
let courseList = JSON.parse(localStorage.getItem('courses'));
let questionList = JSON.parse(localStorage.getItem('questions'));
let answerList = JSON.parse(localStorage.getItem('answers'));

let questionVoteList = JSON.parse(localStorage.getItem('questionVotes'));
let answerVoteList = JSON.parse(localStorage.getItem('answerVotes'));

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
  courseID
};
