import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
        <BrowserRouter basename="/">
          <Header />

          <NavBar />

          <Router />
        </BrowserRouter>
      </Store>
    </div>
  );
};
