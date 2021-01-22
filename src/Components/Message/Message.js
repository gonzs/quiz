import React, { useState } from 'react';
import danger from '../../Icons/danger.svg';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import { ERROR_TEXT } from '../../Constants';
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

export const SendMessage = ({ title, success, successMsg, error }) => {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  return (
    <Toast className="toast-2" show={show} onClose={toggleShow}>
      <Toast.Header>
        <strong className="mr-auto">title</strong>
        <small>now</small>
      </Toast.Header>
      <Toast.Body>{success ? successMsg : error}</Toast.Body>
    </Toast>
  );
};
