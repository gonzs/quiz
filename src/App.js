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

function App() {
  return (
    <div id="App">
      <Store>
        <h1>Quiz</h1>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path={HOME} component={Home} exact />
            <Route path={`${ADMGER}/:id`} component={Trivia} />
            <Route path={`${ADMGER}`} component={Admger} />
            <Route path={`${IA}/:id`} component={Trivia} />
            <Route path={IA} component={Intart} exact />
            <Redirect from="" to={HOME} />
          </Switch>
        </BrowserRouter>
      </Store>
    </div>
  );
}

export default App;
