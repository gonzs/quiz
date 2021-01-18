import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userCreation } from '../../Redux/Actions';
import {
  checkPasswordConfirmation,
  checkValue,
} from '../../Util/helperCheckFields';

export class UnconnectedSignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: { value: '', error: '' },
      password: { value: '', error: '' },
      confpassword: { value: '', error: '' },
      displayname: { value: '', error: '' },
      age: { value: '', error: '' },
      isSubmitted: false,
    };
  }

  onSubmit() {
    if (
      this.state.email.error.length === 0 &&
      this.state.password.error.length === 0 &&
      this.state.confpassword.error.length === 0 &&
      this.state.displayname.error.length === 0 &&
      this.state.age.error.length === 0
    ) {
      this.props.createUser(
        this.state.email.value,
        this.state.password.value,
        this.state.displayname.value
      );
      this.setState({ ...this.state, isSubmitted: true });
    }
  }

  onChange(e) {
    const { id, value } = e.target;
    let error = checkValue(id, value);

    if (id === 'confpassword' && this.state.password.value !== '')
      error = checkPasswordConfirmation(value, this.state.password.value);

    this.setState({
      ...this.state,
      [id]: { value: value, error: error },
    });
  }

  render() {
    const {
      email,
      password,
      confpassword,
      displayname,
      age,
      isSubmitted,
    } = this.state;

    const { success, error } = this.props;

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
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              id="confpassword"
              type="password"
              placeholder="Confirm password"
              onChange={this.onChange.bind(this)}
              onFocus={this.onChange.bind(this)}
              data-test="confirm-password-field"
            />
            {confpassword.error.length !== 0 && (
              <Alert variant="danger" data-test="msg-conf-password">
                {confpassword.error}
              </Alert>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="displayname"
              type="text"
              placeholder="Enter name"
              onChange={this.onChange.bind(this)}
              onFocus={this.onChange.bind(this)}
              data-test="display-name-field"
            />
            {displayname.error.length !== 0 && (
              <Alert variant="danger" data-test="msg-display-name">
                {displayname.error}
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
              {error}
            </Alert>
          )}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.user.success,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  createUser: (email, password, displayName) =>
    dispatch(userCreation(email, password, displayName)),
});

export const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedSignUp);
