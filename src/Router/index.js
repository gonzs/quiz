import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Home';
import Trivia from '../Trivia/Trivia';
import Question from '../Trivia/Question';
import Results from '../Trivia/Results';
import { HOME, SUB1, SUB2, RESULTS, SIGN_IN } from './routes';
import SignIn from '../SignIn/SignIn';

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

    <Redirect from="" to={HOME} />
  </Switch>
);
export default Router;
