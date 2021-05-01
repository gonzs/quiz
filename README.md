# QUIZ GAME

This application is designed to evaluate subjects through quiz. https://quiz-gonzs.netlify.app/

## Frontend

The app has a menu bar with differents subjects. Each subject route will show 10 questions retrieved from an API, and the user will answer each one. Each answer will be saved and finally a the results will be showed.

UI -> `CSS flex` & `react-bootstrap`.

HTTP client -> `axios` to hadle rest API

State management -> `redux` & `redux thunk` to handle asynchronism.

Routing -> `react router`. Two sub-routes per subject, one for the question and other for results. e.g. /history/4 , /math/results

Testing -> `jest` & `enzyme`.

Authentication -> `Firebase Auth` to sign up, sign in, sign out and get token ID functionalities.

CI -> It's used `Husky` in order to execute unit tests and apply the linter before each commit

Documentation -> `React Styleguidist` for documenting components

**Note: React hooks approach is being used**

#### Backend

A rest API was built with `Firebase` Cloud Functions [(follow this repo)](https://github.com/gonzs/quiz-firebase-api)

_Dont forget to create a .env.local file with a API url. REACT_APP_FB\* are retrieved from firebase project configuration. Format:_

```shell
REACT_APP_API_URL = http://localhost:8080
REACT_APP_FB_API_KEY = xxxxxxxxxxxxxxxxxxxxx
REACT_APP_FB_AUTH_DOMAIN = xxxxxxxxxxxxxxxxxxxxx
REACT_APP_FB_DB_URL = xxxxxxxxxxxxxxxxxxxxx
REACT_APP_FB_PROJ_ID = xxxxxxxxxxxxxxxxxxxxx
REACT_APP_FB_STORAGE_BUCKET = xxxxxxxxxxxxxxxxxxxxx
REACT_APP_FB_MESSAGING_SENDER_ID = xxxxxxxxxxxxxxxxxxxxx
REACT_APP_FB_APP_ID = xxxxxxxxxxxxxxxxxxxxx
```

This project was bootstrapped with CRA and [template](https://github.com/gonzs/react-template)

