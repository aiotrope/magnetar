# Running the application

Conventional practices followed in the development of this project.

## On development mode

Create the five Docker image services that can be located in each directory, each of which contains a dockerfile to generate the image.
The `Dockerfile` file in each directory will be used to configure the build image on `development` mode.

```bash
# run each commands on the root directory individually
$ cd qa-api && docker build -t qa-api .
$ cd llm-api && docker build -t  llm-api .
$ cd qa-ui && docker build -t qa-ui .
$ cd e2e-playwright && docker build -t e2e-playwright .

# using docker-compose file
# buid/rebuild docker images based on docker-compose on debug mode; running on port 7800
# remove app-cache/ && production-database-data/ from previous production mode before proceeding
docker compose up --build
# to restart on debug mode on port 7800
docker compose up
# on detach mode
docker compose -f docker-compose.yml up -d
```

Create the remaining services as indicated in `docker-compose.yml`. The application will be launched on port 7800.

```bash
# at the root directory; run only on first build
$ docker compose up --build

# othe CLI commands used

# to stop the running app
$ docker compose down

# to restart the app
$ docker compose up
```

### To run the e2e test

```bash
# restart the app when close; restart again if there are error message on the terminal or the downloads are not complete
# an erroneous restart will prevent both the app and the e2e test from running; stop and retry again if necessary
$ docker compose up

# run the test script on the other terminal
$ docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf
```

### To run K6 performance test

Assuming the K6 package was installed on your local device.

```bash
# to test the loading of questions
$ cd k6 && k6 run performance-test-load-questions.js

# to test adding question
$ cd k6 && k6 run performance-test-add-question.js

# to test the loading of answers
$ cd k6 && k6 run performance-test-load-answers.js

# to test adding answer
$ cd k6 && k6 run performance-test-add-answer.js
```

## On production mode

Configure the four Docker image services, each with its own dockerfile for image generation. The `Dockerfile.prod` file in each directory will be employed to set up the production mode settings of the build image.

```bash
# run each commands on the root directory individually
$ cd qa-api && docker build -t qa-api -f Dockerfile.prod .
$ cd llm-api && docker build -t  llm-api -f Dockerfile.prod
$ cd qa-ui && docker build -t qa-ui -f Dockerfile.prod
$ cd e2e-playwright && docker build -t e2e-playwright -f Dockerfile.prod .

# using docker-compose file
# buid docker images based on docker-compose on production mode; running on port 7800
# remove app-cache from previous debug mode before proceeding
docker compose -f docker-compose.prod.yml up -d --build
# to restart on prod mode; running on port 7800
docker compose -f docker-compose.prod.yml up -d
```

Build the remaining services as directed in `docker-compose.prod.yml`. The application will be started on port 7800.

```bash
# at the root directory; run only on first build
$ docker compose -f docker-compose.prod.yml up -d --build

# othe CLI commands used

# to stop the running app
$ docker compose down

# to restart the app
$ docker compose -f docker-compose.prod.yml up -d
```