import http from 'k6/http';

export const options = {
  duration: '10s',
  vus: 99,
  summaryTrendStats: ['avg', 'p(99)'],
};

export default function () {
  //* adding question has 3 request body and a course id request params
  //* performance test the question with course id: 1
  const url = 'http://localhost:7800/api/questions/1';

  const payload = JSON.stringify({
    user_uuid: 'c6fdc5f4-afda-4cf4-b9e9-95b7f2951e42',
    title: 'Sample Question Fortran',
    details: 'Sample details Fortran',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}
