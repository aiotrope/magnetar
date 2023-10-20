import { writable } from 'svelte/store';
let user = JSON.parse(localStorage.getItem('userUuid'));
let courseList = JSON.parse(localStorage.getItem('courses'));
let questionList = JSON.parse(localStorage.getItem('questions'));
let answerList = JSON.parse(localStorage.getItem('answers'));

let questionVoteList = JSON.parse(localStorage.getItem('questionVotes'));
let answerVoteList = JSON.parse(localStorage.getItem('answerVotes'));

const userUuid = writable(user);

const courses = writable(courseList);

let questions = writable(questionList);

let answers = writable(answerList);

let questionVotes = writable(questionVoteList);

let answerVotes = writable(answerVoteList);

let answerID = writable(0);

let questionID = writable(0);

export {
  userUuid,
  courses,
  questions,
  answers,
  answerID,
  questionVotes,
  answerVotes,
  questionID,
};
