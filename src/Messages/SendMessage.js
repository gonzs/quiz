import React, { useState } from 'react';

import Toast from 'react-bootstrap/Toast';
import { SUCCESS_SEND } from '../constants';

const SendMessage = ({ success, error }) => {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  return (
    <Toast show={show} onClose={toggleShow}>
      <Toast.Header>
        <strong className="mr-auto">Save Results</strong>
        <small>now</small>
      </Toast.Header>
      <Toast.Body>{success ? SUCCESS_SEND : error}</Toast.Body>
    </Toast>
  );
};
export default SendMessage;
