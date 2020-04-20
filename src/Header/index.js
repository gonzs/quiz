import React from 'react';
import './Header.css';
import logo from '../icons/logo.svg';

const Header = () => {
  return (
    <div className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1 className="title">Quiz</h1>
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
};

export default Header;