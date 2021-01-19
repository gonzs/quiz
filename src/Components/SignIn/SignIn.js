import React from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useSignIn, useUserData, useRouter } from '../../Hooks/';
import { checkValue } from '../../Util/helperCheckFields';

export const SignIn = () => {
  const [state, setState] = React.useState({
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    isSubmitted: false,
  });

  const { success, error } = useUserData();
  const router = useRouter();
  const signInUser = useSignIn(state.email.value, state.password.value);

  const onSubmit = () => {
    const shouldSubmit =
      state.email.error.length === 0 && state.password.error.length === 0;

    if (shouldSubmit) {
      signInUser();
      setState({ ...state, isSubmitted: true });
      router.push('/');
    }
  };

  const onChange = e => {
    const { id, value } = e.target;
    const error = checkValue(id, value);

    setState({
      ...state,
      [id]: { value: value, error: error },
    });
  };

  return (
    <div>
      <Form data-test="sign-in">
        <Form.Group>
          <Form.Label> Email address </Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="Enter email"
            onChange={e => onChange(e)}
            onFocus={e => onChange(e)}
            data-test="email-field"
          />
          {state.email.error.length !== 0 && (
            <Alert variant="danger" data-test="msg-email">
              {state.email.error}
            </Alert>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Enter password"
            onChange={onChange}
            onFocus={onChange}
            data-test="password-field"
          />
          {state.password.error.length !== 0 && (
            <Alert variant="danger" data-test="msg-password">
              {state.password.error}
            </Alert>
          )}
        </Form.Group>

        <Button data-test="submit-button" onClick={onSubmit}>
          Sign In
        </Button>
        {!success && state.isSubmitted && (
          <Alert variant="danger" data-test="msg-failure">
            {error}
          </Alert>
        )}
      </Form>
    </div>
  );
};
