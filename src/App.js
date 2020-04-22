import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { HOME, SUB1, SUB2, RESULTS } from './constants/routes';
import NavBar from './NavBar';
import Home from './Home';
import Trivia from './Trivia/Trivia';
import Question from './Trivia/Question';
import Results from './Trivia/Results';
import Store from './Redux/Store';
import Header from './Header';

function App() {
  return (
    <div>
      <Store>
        <BrowserRouter>
          <Header />

          <NavBar />
          <Switch>
            <Route path={HOME} component={Home} exact />

            <Route path={SUB1 + RESULTS} component={Results} exact />

            <Route
              path={`${SUB1}/:id`}
              render={props => (
                <Question key={props.match.params.id || 'empty'} />
              )}
            />

            <Route path={SUB1} component={Trivia} />

            <Route path={SUB2 + RESULTS} component={Results} exact />

            <Route
              path={`${SUB2}/:id`}
              render={props => (
                <Question key={props.match.params.id || 'empty'} />
              )}
            />

            <Route path={SUB2} component={Trivia} />

            <Redirect from="" to={HOME} />
          </Switch>
        </BrowserRouter>
      </Store>
    </div>
  );
}

export default App;
