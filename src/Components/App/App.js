import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Store from '../../Redux/Store';
import { NavBar } from '../NavBar';
import { Header } from '../Header';
import Router from '../../Router';
import { firebase } from '../../firebase/firebase';

export const App = function App() {
  console.log(firebase);

  return (
    <div>
      <Store>
        <BrowserRouter>
          <Header />

          <NavBar />

          <Router />
        </BrowserRouter>
      </Store>
    </div>
  );
};
