import { writable } from 'svelte/store';

// let user = localStorage.getItem('userUuid');
// let courseList = JSON.parse(localStorage.getItem('courses'));

/* if (!user) {
  user = crypto.randomUUID().toString();
  localStorage.setItem('userUuid', user);
}

const userUuid = writable(user); */

let courseList = []

const courses = writable(courseList);

export {
  // userUuid,
  courses
}
