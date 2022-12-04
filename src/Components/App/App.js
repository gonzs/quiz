import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Store } from '../../Redux/Store';
import { NavBar } from '../NavBar';
import { Header } from '../Header';
import Router from '../../Router';

/**
 * Main Component
 */

export const App = function App() {
  return (
    <div>
      <Store>
        <HashRouter basename="/">
          <Header />

          <NavBar />

          <Router />
        </HashRouter>
      </Store>
    </div>
  );
};
