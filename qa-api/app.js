import { Application, oakCors } from './deps.js';

import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import answerRoutes from './routes/answerRoutes.js';

const app = new Application();

// const port = 7777;

app.use(oakCors());

app.use(courseRoutes.routes());
app.use(courseRoutes.allowedMethods());

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

app.use(questionRoutes.routes());
app.use(questionRoutes.allowedMethods());

app.use(answerRoutes.routes());
app.use(answerRoutes.allowedMethods());

const server = await app.listen({ port: 7777 });

const wss = new SocketServer({ server });

// console.log(`Server is running on port ${port}`);

/* const handleRequest = async (request) => {
  const data = await request.json();

  const response = await fetch('http://llm-api:7000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}; */
