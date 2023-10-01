import { Application } from "./deps.js";

import { router } from "./routes.js";

const app = new Application();

const port = 7777;

app.use(router.routes());

app.use(router.allowedMethods());

app.listen({ port });

console.log(`Server is running on port ${port}`);




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
