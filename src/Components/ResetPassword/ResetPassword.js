import React from 'react';
import { Alert } from 'react-bootstrap';
import { useRouter } from '../../Hooks';
import { useResetPassword, useUserData } from '../../Hooks/User';

export const ResetPassword = props => {
  const { query } = useRouter();
  const { success, error } = useUserData();

  // * Reset Password
  useResetPassword(query.email);

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
