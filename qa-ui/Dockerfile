FROM node:lts-bullseye-slim 
# FROM node:lts-alpine3.17

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY *.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "astro", "dev" ]
