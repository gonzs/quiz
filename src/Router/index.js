import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HOME, SUB1, SUB2, RESULTS, SIGN_IN, SIGN_UP } from './routes';
import { Home } from '../Components/Home';
import { Trivia } from '../Components/Trivia/';
import { Question } from '../Components/Question';
import { Results } from '../Components/Results';
import { SignIn } from '../Components/SignIn';
import { SignUp } from '../Components/SignUp';

const Router = () => (
  <Switch>
    <Route path={HOME} component={Home} exact />

    <Route path={SUB1 + RESULTS} component={Results} exact />

    <Route
      path={`${SUB1}/:id`}
      render={props => <Question key={props.match.params.id || 'empty'} />}
    />

    <Route path={SUB1} component={Trivia} />

    <Route path={SUB2 + RESULTS} component={Results} exact />

    <Route
      path={`${SUB2}/:id`}
      render={props => <Question key={props.match.params.id || 'empty'} />}
    />

    <Route path={SUB2} component={Trivia} />

    <Route path={SIGN_IN} component={SignIn} />
    <Route path={SIGN_UP} component={SignUp} />

    <Redirect from="" to={HOME} />
  </Switch>
);
export default Router;
