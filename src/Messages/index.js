import React from 'react';
import danger from '../icons/danger.svg';
import Alert from 'react-bootstrap/Alert';

export const ErrorMessage = ({ text }) => {
  return (
    <Alert className="message">
      <img src={danger} className="danger" alt="danger" />
      {text}
    </Alert>
  );
};
