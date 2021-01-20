import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userCreation } from '../../Redux/Actions';
import { SignUpForm } from './SignUpForm';

export class UnconnectedSignUp extends Component {
  render() {
    const { isLogged } = this.props;

    return (
      <>{isLogged ? <Redirect to="/" /> : <SignUpForm {...this.props} />}</>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
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
