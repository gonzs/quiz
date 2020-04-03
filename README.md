## QUIZ GAME

This application is designed to evaluate for several subjects through questionnaires.

### Frontend

The app has a menu bar with differents subjects. Each subject route will show 10 questions retrieved from an API, and the user will answer each one. Each answer will be saved and finally a the results will be showed.

UI -> `CSS flex` & `react-bootstrap`.

State management -> `redux` & `redux thunk` to handle asynchronism.

Routing -> `react router`. Two sub-routes per subject, one for the question and other for results. e.g. /history/4 , /history/results

**Note: React hooks approach is being used**

### Backend

In initial versions this is using json-server package as a fake api rest.

_Dont forget to create a .env.local file with a API url. Format:_

```shell
REACT_APP_API_URL = http://localhos:8080
```

This project was generated with [template](https://github.com/gonzs/react-template).
