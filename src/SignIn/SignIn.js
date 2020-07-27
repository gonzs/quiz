import React, { Component } from 'react';

class SignIn extends Component {
  render() {
    return (
      <div data-test="sign-in">
        <input type="email" data-test="email-field"></input>
        <input type="password" data-test="password-field"></input>
        <button data-test="submit-button">Sign In</button>
      </div>
    );
  }
}

export default SignIn;
