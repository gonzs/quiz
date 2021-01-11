import React, { useState } from 'react';
import danger from '../../Icons/danger.svg';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import { SUCCESS_SEND, ERROR_TEXT } from '../../Constants';
import './Message.css';

export const ErrorRequestMessage = ({ text }) => {
  return (
    <Alert className="alert-2" variant="danger">
      <Alert.Heading>{ERROR_TEXT}</Alert.Heading>
      <img src={danger} className="danger" alt="danger" />
      {text}
    </Alert>
  );
};

export const SendMessage = ({ success, error }) => {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  return (
    <Toast className="toast-2" show={show} onClose={toggleShow}>
      <Toast.Header>
        <strong className="mr-auto">Save Results</strong>
        <small>now</small>
      </Toast.Header>
      <Toast.Body>{success ? SUCCESS_SEND : error}</Toast.Body>
    </Toast>
  );
};
