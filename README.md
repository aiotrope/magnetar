# magnetar

The online Q&A platform is intended for coursework-related queries and responses. The site allows you to choose a course, ask questions about it, and provide replies. There is also the option to upvote the questions and replies. Anyone can publish questions and answers, and anyone can upvote them, allowing for anonymous involvement. The platform uses big language models to generate replies to inquiries in order to deliver further answers.

## Running the app

Please refer to the RUNNING.md file on how to run the app in debug and production mode as well as how to run the e2e test and K6 performance test.

## Features

### Required

| Feautures                                        | Status |
| :----------------------------------------------- | :----- |
| `*Basic Q&A functionality`                       | `done` |
| `Generating answers with a large language model` | `done` |
| `Authentication`                                 | `done` |
| `Development and Production Configuration`       | `done` |
| `Database, schema and indexes`                   | `done` |
| `E2E Testing`                                    | `done` |
| `Documentation`                                  | `done` |

## API Reference and Examples

```bash
# get courses
GET http://localhost:7800/api/courses HTTP/1.1

# get questions
GET http://localhost:7800/api/questions HTTP/1.1

# get answers
GET http://localhost:7800/api/answers HTTP/1.1

# get all questions votes
GET http://localhost:7800/api/votes/question HTTP/1.1

# get all answers votes
GET http://localhost:7800/api/votes/answer HTTP/1.1

# get/generate user uuid
GET http://localhost:7800/api/user/uuid HTTP/1.1

# post new question with courseId params
POST http://localhost:7800/api/questions/3 HTTP/1.1
Content-Type: application/json

{
    "user_uuid": "c6fdc5f4-afda-4cf4-b9e9-95b7f2951e42",
    "title": "Sample Question Fortran",
    "details": "Sample details fortran"
}

# post new answer with courseId params and question_id search params
POST http://localhost:7800/api/answers/2?question_id=1 HTTP/1.1
Content-Type: application/json

{
    "user_uuid": "c6fdc5f4-afda-4cf4-b9e9-95b7f2951e42",
    "details": "Sample details fortran"
}

# add new question vote
POST http://localhost:7800/api/vote/question?question_id=1 HTTP/1.1
Content-Type: application/json

{
    "user_uuid": "c6fdc5f4-afda-4cf4-b9e9-95b7f2951e42"
}

# add new answer vote
POST http://localhost:7800/api/vote/answer?answer_id=1 HTTP/1.1
Content-Type: application/json

{
    "user_uuid": "c6fdc5f4-afda-4cf4-b9e9-95b7f2951e42"
}

# generate LLM answers
POST http://localhost:7800/llm/ HTTP/1.1
Content-Type: application/json

{
    "question": "How to write Hello, world! in Fortran?"
}

# update question withautomatedanswer with questionId param
PATCH http://localhost:7800/api/question/2 HTTP/1.1
Content-Type: application/json

{
    "withautomatedanswer": true

}

# update question vote with questionId params
PATCH http://localhost:7800/api/question/votes/2 HTTP/1.1
Content-Type: application/json

{
    "votes": 3

}

# update answer vote with answerId params
PATCH http://localhost:7800/api/answer/votes/2 HTTP/1.1
Content-Type: application/json

{
    "votes": 2

}

```

### CLI Commands

#### Docker compose

```bash
# build images individually per Dockerfile
$ cd llm-api && docker build -t llm-api .
$ cd qa-api && docker build -t qa-api .
$ cd qa-ui && docker build -t qa-ui .
$ cd e2e-playwright && docker build -t e2e-playwright .

# running sing image on detach mode
$ docker run -p port_num:port_num <docker_hub_username/image_name>

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
docker compose -f docker-compose.yml up -d

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

## CLI Command for K8s config

Postgres and Redis provided by cloud providers.

```bash
# build the app images and ennsure the the app runs on dockerize mode before running K8s
# qa-api
$ cd qa-api/ && docker build -t aiotrope/qa-api -f ./Dockerfile .
$ docker tag aiotrope/qa-api aiotrope/qa-api
$ docker push aiotrope/qa-api
# check the if it run on docker container
$ docker run -d -p 7777:7777 aiotrope/qa-api:latest
# stop the app
$ docker stop $(docker ps -a -q)

# llm-api
$ cd llm-api/ && docker build -t aiotrope/llm-api -f ./Dockerfile .
$ docker tag aiotrope/llm-api aiotrope/llm-api
$ docker push aiotrope/llm-api

# qa-ui
$ cd qa-ui/ && docker build -t aiotrope/qa-ui -f ./Dockerfile .
$ docker tag aiotrope/qa-ui aiotrope/qa-ui
$ docker push aiotrope/qa-ui

# nginx config; config not yet sufficient to run in K8s
$ cd nginx/ && docker build -t aiotrope/reverse-proxy -f ./Dockerfile .
$ docker tag aiotrope/reverse-proxy aiotrope/reverse-proxy
$ docker push aiotrope/reverse-proxy

# check docker images
$ docker images

# start a cluster
$ minikube start
# start a new terminal, and leave this running
$ minikube dashboard
# stop cluster but no deletion
$ minikube stop

# enable metric server
$ minikube addons enable metrics-server

# create secrets app-credentials with the ff. keys
kubectl create secret generic app-credentials --from-file=redisurl=./kubernetes/redisurl.txt --from-file=pghost=./kubernetes/pghost.txt --from-file=pguser=./kubernetes/pguser.txt --from-file=pgpassword=./kubernetes/pgpassword.txt --from-file=pgdatabase=./kubernetes/pgdatabase.txt --from-file=pgport=./kubernetes/pgport.txt
# output: secret/redis-credentials created

# verify secrets
kubectl get secrets

# describe secrets app-credentials
kubectl describe secret app-credentials

# deploy, activate service in K8s and port forward to port
$ kubectl apply -f kubernetes/qa-api-deployment.yaml
$ kubectl apply -f kubernetes/qa-api-service.yaml
$ kubectl apply -f kubernetes/qa-api-deployment-hpa.yaml
$ kubectl get services
$ minikube service qa-api-service
$ kubectl port-forward svc/qa-api-service 7777:7777 # port forwarding

$ kubectl apply -f kubernetes/llm-api-deployment.yaml
$ kubectl apply -f kubernetes/llm-api-service.yaml
$ kubectl apply -f kubernetes/llm-api-deployment-hpa.yaml
$ kubectl port-forward svc/llm-api-service 7001:7001

$ kubectl apply -f kubernetes/qa-ui-deployment.yaml
$ kubectl apply -f kubernetes/qa-ui-service.yaml
$ kubectl apply -f kubernetes/qa-ui-deployment-hpa.yaml
$ kubectl port-forward svc/qa-ui-service 3000:3000

$ kubectl apply -f kubernetes/reverse-proxy-deployment.yaml
$ kubectl apply -f kubernetes/reverse-proxy-service.yaml
$ kubectl port-forward svc/reverse-proxy-service 7800:7800

# check current deployment
$ kubectl get deployments

# check services
$ kubectl get services

# list the pods
$ kubectl get pods

# check horizonal scaling
$ kubectl get hpa

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
$ minikube delete

```
