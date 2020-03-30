import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { HomeRoute, AdmgerRoute, IntartRoute } from './routes';
import NavBar from './NavBar';
import Home from './Home';
import Admger from './Admger';
import Intart from './Intart';
import Store from './Store';
import { Provider } from 'react-redux';
import { getQuiz } from './Actions';

function App() {
  useEffect(() => {
    // store.dispatch(getQuiz());
  }, []);

  return (
    <div id="App">
      <Provider store={Store}>
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
      </Provider>
    </div>
  );
}

export default App;
