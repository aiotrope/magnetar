import { writable } from 'svelte/store';
let user = JSON.parse(localStorage.getItem('userUuid'));
let courseList = JSON.parse(localStorage.getItem('courses'));
let questionList = JSON.parse(localStorage.getItem('questions'));
let questionsByCourseList = JSON.parse(
  localStorage.getItem('questionsByCourse')
);

// let questionByIdObj = JSON.parse(localStorage.getItem('questionById'))

let answerList = JSON.parse(localStorage.getItem('answers'));

let answersByCourseByQuestionList = JSON.parse(
  localStorage.getItem('answersByCourseByQuestion')
);

const userUuid = writable(user);

const courses = writable(courseList);

let questions = writable(questionList);

let answers = writable(answerList);

let questionsByCourse = writable(questionsByCourseList);

// let questionById = writable(questionByIdObj);

let answersByCourseByQuestion = writable(answersByCourseByQuestionList)

let courseId = writable(0);

let questionId = writable(0);

export {
  userUuid,
  courses,
  questions,
  courseId,
  questionsByCourse,
  questionId,
  // questionById,
  answers,
  answersByCourseByQuestion,
};
