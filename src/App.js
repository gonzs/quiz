import React from 'react';
import { data3 } from './data';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { HomeRoute, AdmgerRoute, IntartRoute } from './routes';
import NavBar from './NavBar';
import Home from './Home';
import Admger from './Admger';
import Intart from './Intart';

function App() {
  return (
    <div id="App">
      <h1>Quiz</h1>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path={HomeRoute} component={Home} exact />
          <Route path={`${AdmgerRoute}/:id`} component={Admger} />
          <Route path={IntartRoute} component={Intart} exact />
          <Redirect from="" to={HomeRoute} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
