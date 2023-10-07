# magnetar

The online Q&A platform is intended for coursework-related queries and responses. The site allows you to choose a course, ask questions about it, and provide replies. There is also the option to upvote the questions and replies. Anyone can publish questions and answers, and anyone can upvote them, allowing for anonymous involvement. The platform uses big language models to generate replies to inquiries in order to deliver further answers.

## Running the app

Please refer to the RUNNING.md file on how to run the app in debug and production mode as well as how to run the e2e test and K6 performance test.

## API Reference

### Fetch all course

```http
  GET /api/courses
```

### Get course by id

```http
  GET /api/course?courseId=
```

| Query Params | Type     | Description   |
| :----------- | :------- | :------------ |
| `courseId`   | `string` | **Required**. |

### Add submission

```http
  POST /api/assignments/${id}. Id params correspond to the assignment id
```

| Param | Type     | Description   |
| :---- | :------- | :------------ |
| `id`  | `string` | **Required**. |

| Body        | Type     | Description  |
| :---------- | :------- | :----------- |
| `code`      | `string` | **Required** |
| `user_uuid` | `string` | **Required** |

### Grade a submission

```http
  POST /api/assignments/grading/${id}. Id params correspond to the assignment id
```

| Param | Type     | Description   |
| :---- | :------- | :------------ |
| `id`  | `string` | **Required**. |

| Body   | Type     | Description  |
| :----- | :------- | :----------- |
| `code` | `string` | **Required** |

### Update a submission

```http
PATCH /api/assignments/submissions/${id}. Id params correspond to the submission id
```

| Param | Type     | Description   |
| :---- | :------- | :------------ |
| `id`  | `string` | **Required**. |

|       Body        | Type      | Description  |
| :---------------: | :-------- | ------------ |
| `grader_feedback` | `string`  | **Required** |
|     `status`      | `string`  | **Required** |
|     `correct`     | `boolean` | **Required** |

### Fetch all submissions

```http
  GET /api/answers
```

### Fetch all submission by user

```http
GET /assignments/submissions/user/all/${user_uuid}
```

| Param       | Type     | Description   |
| :---------- | :------- | :------------ |
| `user_uuid` | `string` | **Required**. |

### Get submission by id

```http
  GET /api/assignments/submissions/${id}
```

| Param | Type     | Description   |
| :---- | :------- | :------------ |
| `id`  | `string` | **Required**. |

### Get user latest submission

```http
  GET /api/assignments/submissions/latest-submission/${programming_assignment_id}/${user_uuid}
```

| Param                       | Type     | Description   |
| :-------------------------- | :------- | :------------ |
| `programming_assignment_id` | `string` | **Required**. |
| `user_uuid`                 | `string` | **Required**. |

### Check user exists

```http
GET /api/user/${user_uuid}
```

| Param       | Type     | Description   |
| :---------- | :------- | :------------ |
| `user_uuid` | `string` | **Required**. |

### Generate user id

```http
GET/api/assignments/user/uuid
```

### CLI Commands

#### Docker compose 

```bash
# build images individually per Dockerfile
$ cd llm-api && docker build -t llm-api .
$ cd qa-api && docker build -t qa-api .
$ cd qa-ui && docker build -t qa-ui .
$ cd e2e-playwright && docker build -t e2e-playwright .

# buid docker images based on docker-compose on production mode; running on port 7800
# remove app-cache from previous debug mode before proceeding (First build)
cd magnetar && docker compose -f docker-compose.prod.yml up -d --build
# to restart on prod mode; running on port 7800
docker compose -f docker-compose.prod.yml up -d

# buid/rebuild docker images based on docker-compose on debug mode; running on port 7800
# remove app-cache/ && production-database-data/ from previous production mode before proceeding
cd magnetar && docker compose up --build # (first build)
# to restart on debug mode on port 7800
cd escala && docker compose up

# stop running app all modes
$ docker compose down

# clean slate docker hub; some of the containers, images, volume must be remove manually
$ docker system prune -a && docker images prune -a && docker volume prune -a

# run unit test on dev mode
# check the browser if there are errors or make a post request to verify, then repeat the steps before running the test
# passing a test can only produced onces, succeeding test will fail and you need to restart the steps
# steps
$ docker compose down
$ docker compose up # on one terminal; Be sure there is no error on the terminal and all modules are downloaded properly or else the app will not run, repeat step 1
$ docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf # other terminal

```

## CLI Postgres

```bash
# list containers
$ docker container ls 
$ docker ps

# entering psql console
$ docker container ls
$ docker exec -it <container_id> psql -U <dbUsername> <dbName> 

# show all tables
$ \dt+

# clear
$ \! clear

# quit
$ \q

```

```bash
# persistent postgres volume
services:
  postgres:
    image: postgres:latest
    container_name: postgres
    ports:
      - '6500:5432'
    volumes:
      - postgres-data:/var/lib/postgresql/data
    env_file:
      - ./qa-api/.env

volumes:
  postgres-data:


```

