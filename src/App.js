import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { HOME, ADMGER, IA } from './constants/routes';
import NavBar from './NavBar';
import Home from './Home';
import Admger from './Admger';
import Intart from './Intart';
import Store from './Store';
import Trivia from './Trivia';
import logo from './logo.svg';

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
            <Route
              path={`${ADMGER}/:id`}
              render={props => (
                <Trivia key={props.match.params.id || 'empty'} />
              )}
            />
            <Route path={`${ADMGER}`} component={Admger} />
            <Route
              path={`${IA}/:id`}
              render={props => (
                <Trivia key={props.match.params.id || 'empty'} />
              )}
            />
            <Route path={IA} component={Intart} exact />
            <Redirect from="" to={HOME} />
          </Switch>
        </BrowserRouter>
      </Store>
    </div>
  );
}

export default App;
