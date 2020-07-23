import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Store from './Redux/Store';
import NavBar from './NavBar';
import Header from './Header';
import Router from './Router';

function App() {
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
}

export default App;
