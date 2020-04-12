import React from 'react';
import './App.css';
import logo from './icons/logo.svg';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { HOME, ADMGER, IA, RESULTS } from './constants/routes';
import NavBar from './NavBar';
import Home from './Home';
import Trivia from './Trivia/Trivia';
import Question from './Trivia/Question';
import Results from './Trivia/Results';
import Store from './Redux/Store';

function App() {
  return (
    <div id="App">
      <Store>
        <h1>
          <img src={logo} className="logo" alt="logo" />
          Quiz
          <img src={logo} className="logo" alt="logo" />
        </h1>

        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path={HOME} component={Home} exact />

            <Route path={ADMGER + RESULTS} component={Results} exact />

            <Route
              path={`${ADMGER}/:id`}
              render={props => (
                <Question key={props.match.params.id || 'empty'} />
              )}
            />

            <Route path={ADMGER} component={Trivia} />

            <Route path={IA + RESULTS} component={Results} exact />

            <Route
              path={`${IA}/:id`}
              render={props => (
                <Question key={props.match.params.id || 'empty'} />
              )}
            />

            <Route path={IA} component={Trivia} />

            <Redirect from="" to={HOME} />
          </Switch>
        </BrowserRouter>
      </Store>
    </div>
  );
}

export default App;
