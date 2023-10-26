import http from 'k6/http';

export const options = {
  duration: '10s',
  vus: 99,
  summaryTrendStats: ['avg', 'p(99)'],
};

export default function () {
  //* adding answer has 2 request body, a course id request parameter and question search params
  //* performance test for adding answer with course id: 2 and question id 1
  const url = 'http://localhost:7800/api/answers/2?question_id=1';

  const payload = JSON.stringify({
    user_uuid: 'c6fdc5f4-afda-4cf4-b9e9-95b7f2951e42',
    details: 'Sample details Fortran',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}
