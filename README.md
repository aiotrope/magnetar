# magnetar

The online Q&A platform is intended for coursework-related queries and responses. The site allows you to choose a course, ask questions about it, and provide replies. There is also the option to upvote the questions and replies. Anyone can publish questions and answers, and anyone can upvote them, allowing for anonymous involvement. The platform uses big language models to generate replies to inquiries in order to deliver further answers.

## Running the app

Please refer to the RUNNING.md file on how to run the app in debug and production mode as well as how to run the e2e test and K6 performance test.

## Phasing

- Branch stage1 - tage8: stage 8, the last dev branch before starting developing the app in Kubernetes

- stage9: start K8s app development

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

# PROD MODE
# buid docker images based on docker-compose on production mode; running on port 7800
# remove app-cache from previous debug mode before proceeding
cd magnetar && docker compose -f docker-compose.prod.yml up -d --build
# to restart on prod mode; running on port 7800
docker compose -f docker-compose.prod.yml up -d

# DEV MODE
# buid/rebuild docker images based on docker-compose on debug mode; running on port 7800
# remove app-cache/ && production-database-data/ from previous production mode before proceeding
cd magnetar && docker compose up --build
# to restart on debug mode on port 7800
cd magnetar && docker compose up
# on detach mode
docker compose -f docker-compose.dev.yml up -d

# stop running app all modes
$ docker compose down # dev
$ docker compose -f docker-compose.prod.yml down # prod

# stop running container
$ docker stop <container_id>

# run individual image after build
$ docker run -p <port:port> image_name

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

## CLI Commands Kubernetes

```bash
# after installing minikube & kubectl
# start a cluster
$ minikube start
# start a new terminal, and leave this running
$ minikube dashboard
# stop cluster but no deletion
$ minikube stop

# enable metric server
$ minikube addons enable metrics-server

# instally pg operator
$ kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.19/releases/cnpg-1.19.1.yaml

# deploying database cluster
$ kubectl apply -f kubernetes/qa-api-database-cluster.yaml

# list all clusters
$ kubectl get cluster

# describe the DB secrets created automatically
$ kubectl describe secret qa-api-database-cluster
# describe the secret for automatic username default "app"
$ kubectl describe secret qa-api-database-cluster-app

# init database migrations and secrets/environment container injection
$ cd flyway/ && minikube image build -t qa-api-database-migrations -f ./Dockerfile.k8s .

# list images for database migrations
$ minikube image list

# start DB migrations
$ kubectl apply -f kubernetes/qa-api-database-migration-job.yaml 

# build the app images
$ cd qa-api/ && minikube image build -t qa-api -f ./Dockerfile.k8s .
$ cd qa-ui/ && minikube image build -t qa-ui -f ./Dockerfile.k8s .
$ cd llm-api/ && minikube image build -t llm-api -f ./Dockerfile.k8s .
$ cd reverse-proxy/ && minikube image build -t reverse-proxy -f ./Dockerfile.k8s .

# deploying apps
kubectl apply -f kubernetes/qa-api-deployment.yaml
kubectl apply -f kubernetes/qa-ui-deployment.yaml
kubectl apply -f kubernetes/llm-api-deployment.yaml
kubectl apply -f kubernetes/reverse-proxy-deployment.yaml

# check current deployment
$ kubectl get deployments

# list the pods
$ kubectl get pods

# check logs
$ kubectl logs <pod_name>
# e.g kubectl logs qa-ui-deployment-7d76756d9b-qxlxc

# deploy the services and exposing the apps
$ kubectl apply -f kubernetes/qa-api-service.yaml
$ kubectl apply -f kubernetes/llm-api-service.yaml
$ kubectl apply -f kubernetes/qa-ui-service.yaml
$ kubectl apply -f kubernetes/reverse-proxy-service.yaml

# list services
$ kubectl get services

# access app 
$ minikube service qa-api-service --url # e.g.

# delete and cleanup
$ kubectl delete -f kubernetes/qa-api-service.yaml
$ kubectl delete -f kubernetes/qa-ui-service.yaml
$ kubectl delete -f kubernetes/llm-api-service.yaml
$ kubectl delete -f kubernetes/qa-api-deployment.yaml
$ kubectl delete -f kubernetes/llm-api-deployment.yaml
$ kubectl delete -f kubernetes/qa-ui-deployment.yaml

# delete all pods 
$ kubectl delete pods --all -A
$ kubectl delete deploy --all -A
$ kubectl delete all --all -A # all resources

# check resources request
$ kubectl top pod

# check add ons
$ minikube addons list

# list cnpg-system
$ kubectl get all -n cnpg-system

# adding horizontal scale congiguration
$ kubectl apply -f kubernetes/qa-api-deployment-hpa.yaml 
$ kubectl apply -f kubernetes/llm-api-deployment-hpa.yaml 
$ kubectl apply -f kubernetes/qa-ui-deployment-hpa.yaml 

# check horizonal scaling
$ kubectl get hpa

# rebuild and reaapply changes to qa-api after migrations
$ cd qa-api/ && minikube image build -t qa-api -f ./Dockerfile.k8s .
$ kubectl apply -f kubernetes/qa-api-deployment.yaml
$ kubectl get pods
$ minikube service qa-api-service --url
# e.g generated url http://127.0.0.1:52953
$ minikube service qa-ui-service --url
# e.g generated url http://127.0.0.1:52953

```
## Kubernetes Secrets
```bash
# Store the string 'redisurl' in the file 'redisurl.txt'
echo -n 'your-redis-lab-url-string' > ./kubernetes/redisurl.txt

# create secret with redisurl as key
kubectl create secret generic redis-credentials --from-file=redisurl=./kubernetes/redisurl.txt
# output: secret/redis-credentials created

# verify secrets
kubectl get secrets

# describe secrets app-credentials
kubectl describe secret redis-credentials

# deleting specific secret
kubectl delete secret redis-credentials

# secret usage as environment variable
# create a pod definition manifest


```
