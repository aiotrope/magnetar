import { writable } from 'svelte/store';
let user = JSON.parse(localStorage.getItem('userUuid'));
let courseList = JSON.parse(localStorage.getItem('courses'));
let questionList = JSON.parse(localStorage.getItem('questions'));
let questionsByCourseList = JSON.parse(
  localStorage.getItem('questionsByCourse')
);

let questionByIdObj = JSON.parse(localStorage.getItem('questionById'))

const userUuid = writable(user);

const courses = writable(courseList);

let questions = writable(questionList);

let questionsByCourse = writable(questionsByCourseList);

let questionById = writable(questionByIdObj);

let courseId = writable(0);

let questionId = writable(0);

export {
  userUuid,
  courses,
  questions,
  courseId,
  questionsByCourse,
  questionId,
  questionById
};
