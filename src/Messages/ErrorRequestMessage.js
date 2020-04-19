import React from 'react';
import danger from '../icons/danger.svg';
import Alert from 'react-bootstrap/Alert';
import { ERROR_TEXT } from '../constants';

const ErrorRequestMessage = ({ text }) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>{ERROR_TEXT}</Alert.Heading>
      <img src={danger} className="danger" alt="danger" />
      {text}
    </Alert>
  );
};
export default ErrorRequestMessage;
