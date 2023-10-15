import { writable } from 'svelte/store';
let user = JSON.parse(localStorage.getItem('userUuid'));
let courseList = JSON.parse(localStorage.getItem('courses'));
let questionList = JSON.parse(localStorage.getItem('questions'));
let answerList = JSON.parse(localStorage.getItem('answers'));
let answersByCourseByQuestionList = JSON.parse(
  localStorage.getItem('answersByCourseByQuestion')
);

const userUuid = writable(user);

const courses = writable(courseList);

let questions = writable(questionList);

let answers = writable(answerList);

let answersByCourseByQuestion = writable(answersByCourseByQuestionList);

let answerId = writable(0);

export {
  userUuid,
  courses,
  questions,
  answers,
  answersByCourseByQuestion,
  answerId,
};
