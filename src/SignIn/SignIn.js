import React, { Component } from 'react';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isSubmitted: false,
      isLogin: false,
    };
  }

  onSubmit() {
    this.setState({ ...this.state, isSubmitted: true });
  }
  onChange(e) {
    this.setState({
      ...this.state,
      isSubmitted: false,
      [e.target.id]: e.target.value,
    });
  }

  render() {
    const { email, password, isSubmitted, isLogin } = this.state;

    return (
      <div data-test="sign-in">
        <input
          id="email"
          type="email"
          onChange={this.onChange.bind(this)}
          data-test="email-field"
        ></input>
        {email.length === 0 && isSubmitted && (
          <p data-test="msg-email">Email is mandatory</p>
        )}
        <br />
        <input
          id="password"
          type="password"
          onChange={this.onChange.bind(this)}
          data-test="password-field"
        ></input>
        {password.length === 0 && isSubmitted && (
          <p data-test="msg-password">Password is mandatory</p>
        )}
        <br />
        <button data-test="submit-button" onClick={this.onSubmit.bind(this)}>
          Sign In
        </button>
        {!isLogin && isSubmitted && (
          <p data-test="msg-failure">Invalid login</p>
        )}
      </div>
    );
  }
}

export default SignIn;
