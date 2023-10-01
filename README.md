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

