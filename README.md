## QUIZ GAME

This application is designed to evaluate for several subjects through questionnaires.

## Frontend

Te app has a menu bar with differents subjects. Each subject route will show 10 questions retrieved from an API, and the user will answer each one. Each answer will be saved and finally a the results will be showed.

UI -> `CSS flex` & `react-bootstrap`.

HTTP client -> `axios` to hadle rest API

State management -> `redux` & `redux thunk` to handle asynchronism.

Routing -> `react router`. Two sub-routes per subject, one for the question and other for results. e.g. /history/4 , /history/results

Testing -> `jest` & `enzyme`.

CI -> It's used `Husky` in order to execute unit tests and apply the linter before each commit

**Note: React hooks approach is being used**

#### Backend
A rest API was built with `Firebase` Cloud Functions [(follow this repo)](https://github.com/gonzs/quiz-firebase-api)

_Dont forget to create a .env.local file with a API url. Format:_

```shell
REACT_APP_API_URL = http://localhost:8080
```

This project was generated with [template](https://github.com/gonzs/react-template).
