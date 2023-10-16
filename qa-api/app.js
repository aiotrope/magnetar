import { Application, oakCors } from './deps.js';

import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import answerRoutes from './routes/answerRoutes.js';
import voteRoutes from './routes/voteRoutes.js';

const app = new Application();

app.use(
  oakCors({
    origin: /^.+localhost:(7800|3000)$/,
    optionsSuccessStatus: 200,
  })
);

app.use(courseRoutes.routes());
app.use(courseRoutes.allowedMethods());

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

app.use(questionRoutes.routes());
app.use(questionRoutes.allowedMethods());

app.use(answerRoutes.routes());
app.use(answerRoutes.allowedMethods());

app.use(voteRoutes.routes());
app.use(voteRoutes.allowedMethods());

const server = await app.listen({ port: 7777 });

const wss = new SocketServer({ server });
