import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isSubmitted: false,
      success: true,
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
    const { email, password, isSubmitted, success } = this.state;

    return (
      <Form data-test="sign-in">
        <Form.Group>
          <Form.Label> Email address </Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="Enter email"
            onChange={this.onChange.bind(this)}
            data-test="email-field"
          />
          {email.length === 0 && isSubmitted && (
            <p data-test="msg-email">Email is mandatory</p>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Enter password"
            onChange={this.onChange.bind(this)}
            data-test="password-field"
          />
          {password.length === 0 && isSubmitted && (
            <p data-test="msg-password">Password is mandatory</p>
          )}
        </Form.Group>

        <Button data-test="submit-button" onClick={this.onSubmit.bind(this)}>
          Sign In
        </Button>
        {!success && isSubmitted && (
          <span data-test="msg-failure">Invalid login</span>
        )}
      </Form>
    );
  }
}

export default SignIn;
