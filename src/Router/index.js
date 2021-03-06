import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from './routes';
import { Home } from '../Components/Home';
import { Quiz } from '../Components/Quiz';
import { Question } from '../Components/Question';
import { Results } from '../Components/Results';
import { SignIn } from '../Components/SignIn';
import { SignUp } from '../Components/SignUp';
import { SignOut } from '../Components/SignOut';
import { ResetPassword } from '../Components/ResetPassword';
import { NewQuiz } from '../Components/NewQuiz';

const Router = () => (
  <Switch>
    <Route path={routes.HOME} component={Home} exact />

    <Route path={`/subj/:subject${routes.RESULTS}`} component={Results} />

    <Route
      path={`/subj/:subject/:id`}
      render={props => (
        <Question
          key={props.match.params.subject + props.match.params.id || 'empty'}
        />
      )}
    />

    <Route path={`/subj/:subject`} component={Quiz} />

    <Route path={routes.SIGN_IN} component={SignIn} />
    <Route path={routes.SIGN_UP} component={SignUp} />
    <Route path={routes.SIGN_OUT} component={SignOut} />

    <Route path={`${routes.RESET_PASSWORD}/:email`} component={ResetPassword} />

    <Route path={routes.NEW_QUIZ} component={NewQuiz} />

    <Redirect from="" to={routes.HOME} />
  </Switch>
);

export default Router;
