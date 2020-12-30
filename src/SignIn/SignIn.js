import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { checkValue } from '../Util/checkValue';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: { value: '', error: '' },
      password: { value: '', error: '' },
      isSubmitted: false,
      success: true,
    };
  }

  onSubmit() {
    if (
      this.state.email.error.length === 0 &&
      this.state.password.error.length === 0
    ) {
      // TODO - Simulate fetch API
      let i = Math.random();
      if (i < 0.5)
        this.setState({ ...this.state, isSubmitted: true, success: true });
      else this.setState({ ...this.state, isSubmitted: true, success: false });
    } else {
      this.setState({ ...this.state, isSubmitted: false });
    }
  }

  onChange(e) {
    const { id, value } = e.target;
    const error = checkValue(id, value);

    this.setState({
      ...this.state,
      isSubmitted: false,
      [id]: { value: value, error: error },
    });
  }

  render() {
    const { email, password, isSubmitted, success } = this.state;

    return (
      <div>
        <Form data-test="sign-in">
          <Form.Group>
            <Form.Label> Email address </Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Enter email"
              onChange={this.onChange.bind(this)}
              onFocus={this.onChange.bind(this)}
              data-test="email-field"
            />
            {email.error.length !== 0 && (
              <Alert variant="danger" data-test="msg-email">
                {email.error}
              </Alert>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Enter password"
              onChange={this.onChange.bind(this)}
              onFocus={this.onChange.bind(this)}
              data-test="password-field"
            />
            {password.error.length !== 0 && (
              <Alert variant="danger" data-test="msg-password">
                {password.error}
              </Alert>
            )}
          </Form.Group>

          <Button data-test="submit-button" onClick={this.onSubmit.bind(this)}>
            Sign In
          </Button>
          {!success && isSubmitted && (
            <Alert variant="danger" data-test="msg-failure">
              Invalid login
            </Alert>
          )}
        </Form>
      </div>
    );
  }
}

export default SignIn;
