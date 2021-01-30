import React from 'react';
import { Alert } from 'react-bootstrap';
import hooks from '../../Hooks';

export const ResetPassword = props => {
  const { query } = hooks.useRouter();
  const { success, error } = hooks.useUserData();

  // * Reset Password
  hooks.useResetPassword(query.email);

  return (
    <>
      {success ? (
        <Alert variant="success">
          Please check your email {query.email} in order to reset your password
          successfully.
        </Alert>
      ) : (
        <Alert variant="danger">{error}</Alert>
      )}
    </>
  );
};
