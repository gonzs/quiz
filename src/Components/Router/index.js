import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from './routes';
import { Home } from '../Home';
import { Quiz } from '../Quiz';
import { Question } from '../Question';
import { Results } from '../Results';
import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';
import { SignOut } from '../SignOut';
import { ResetPassword } from '../ResetPassword';

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

    <Redirect from="" to={routes.HOME} />
  </Switch>
);

export default Router;
