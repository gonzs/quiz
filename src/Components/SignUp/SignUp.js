import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../Redux/Actions';
import { SignUpForm } from './SignUpForm';

/**
 * Component for register user connected
 */
export class SignUpComp extends Component {
  render() {
    return <SignUpForm {...this.props} />;
  }
}

const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
  success: state.user.success,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  createUser: (email, password, displayName) =>
    dispatch(actions.userCreation(email, password, displayName)),
});

export const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpComp);
