import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: { value: '', error: '' },
      password: { value: '', error: '' },
      name: { value: '', error: '' },
      age: { value: '', error: '' },
      isSubmitted: false,
      success: true,
    };
  }

  onSubmit() {
    if (
      this.state.email.error.length !== 0 &&
      this.state.password.error.length !== 0
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

  checkValue(type, value) {
    let emailRegex = /\S+@\S+\.\S+/;
    let passwordRegex = /(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[.!@#$%^&*])[\w.!@#$%^&*]{8,}/g;
    let nameRegex = /\S{5,}/;
    switch (type) {
      case 'email':
        return emailRegex.test(value);

      case 'password':
        return passwordRegex.test(value);

      case 'name':
        return nameRegex.test(value);

      case 'age':
        return parseInt(value) >= 18;

      default:
        return true;
    }
  }

  onChange(e) {
    let error = '';
    if (e.target.value.length === 0) {
      error = `${e.target.id} is mandatory`;
    } else if (!this.checkValue(e.target.id, e.target.value)) {
      if (e.target.id === 'age') error = 'You must be 18 years old';
      else error = `${e.target.id} with invalid format`;
    }

    this.setState({
      ...this.state,
      isSubmitted: false,
      [e.target.id]: { value: e.target.value, error: error },
    });
  }

  render() {
    const { email, password, name, age, isSubmitted, success } = this.state;

    return (
      <div>
        <Form data-test="sign-up">
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
            <Form.Text className="text-muted">
              Passwords must contains at least 8 characters long, one lowercase
              letter, one capital letter, one number and one .!@#$%^&*
            </Form.Text>
            {password.error.length !== 0 && (
              <Alert variant="danger" data-test="msg-password">
                {password.error}
              </Alert>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="Enter name"
              onChange={this.onChange.bind(this)}
              onFocus={this.onChange.bind(this)}
              data-test="name-field"
            />
            {name.error.length !== 0 && (
              <Alert variant="danger" data-test="msg-name">
                {name.error}
              </Alert>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              id="age"
              type="number"
              placeholder="Enter age"
              onChange={this.onChange.bind(this)}
              onFocus={this.onChange.bind(this)}
              data-test="age-field"
            />
            {age.error.length !== 0 && (
              <Alert variant="danger" data-test="msg-age">
                {age.error}
              </Alert>
            )}
          </Form.Group>

          <Button data-test="submit-button" onClick={this.onSubmit.bind(this)}>
            Register
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

export default SignUp;
