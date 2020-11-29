import React from 'react';
import danger from '../Icons/danger.svg';
import Alert from 'react-bootstrap/Alert';
import { ERROR_TEXT } from '../Constants/';

const ErrorRequestMessage = ({ text }) => {
  return (
    <Alert className="alert-2" variant="danger">
      <Alert.Heading>{ERROR_TEXT}</Alert.Heading>
      <img src={danger} className="danger" alt="danger" />
      {text}
    </Alert>
  );
};
export default ErrorRequestMessage;
