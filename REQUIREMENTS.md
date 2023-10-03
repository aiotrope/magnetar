# Requirements

The main screen (seen when you launch the application) shows various courses and allows you to select one, which takes you to the course page.
The functionality for creating new questions, displaying questions, upvoting questions, and selecting questions (which opens the question page) is shown on the course page.

The question page displays the question as well as capabilities for answering it, listing answers, and upvoting replies.
Each user can only upvote each question and answer once.
Question and answer sorting and limiting
The questions and answers are sorted and displayed based on recency, which takes into account both the posting time and the most recent upvote time. The most recent queries are listed first.

On the course and question pages, a maximum of twenty questions and answers are displayed.

Using a broad language model to generate replies

When a question is created, the program generates three replies using the supplied big language model API. The solutions are displayed with other answers on the question page.
The answers are generated asynchronously in the background, so the user does not have to wait for them to be generated before seeing the question. This enables the program to be changed to use a more powerful big language model without compromising the user experience.

Authentication

Users can access the Q&A platform without registering, like with the first course project, and are identifiable by a random user token created when the application is opened for the first time. The user token is saved locally and will be used to identify the user in the future.

Configurations

Docker Compose settings for development and production have been written for the project. The configurations are reasonable and effective.


Playwright has been used to create at least five (meaningful) end-to-end tests. Refer to the Web Software Development course's Starting with Playwright chapter for a reminder. The end-to-end tests are located in the tests folder under the e2e-playwright folder.
In the k6 folder, there are at least five (relevant) performance tests written with k6.

A single user (as indicated by their uuid) can only post one question and answer every minute. If a user with the same user uuid posts another question or response within a minute, the question or answer is refused and the user is informed to wait.

When scrolling down the course page (which lists questions) or the question page (which lists answers), the application retrieves more content, twenty at a time (i.e. the application has endless scrolling functionality).

When new questions or answers are added, the content displayed to the user is automatically updated, eliminating the need to reload the page. Do not implement automatic voting updates.

New questions are added to the top of the question list if the user is on the course page.
New responses to the question are added to the top of the answer list if the user is on the question page.

Configurations for Kubernetes

The project includes a set of Kubernetes configuration files with automated scaling that can be used to deploy the application to Kubernetes in addition to the Docker Compose-based development and production configurations.
A collection of configuration files for monitoring the application with Prometheus and Grafana is also included in the Kubernetes configuration files. See Grafana Labs' blog post on the subject as a starting point.
The instructions for using the files are given in the RUNNING.md file (which details the procedures required to execute the application). Put the Kubernetes configuration files in the kubernetes folder. Test the Kubernetes configuration files before submitting the project by deploying the application to Minikube (or anything similar) and ensuring that it runs as anticipated.