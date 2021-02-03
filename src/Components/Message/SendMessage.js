import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';
import './Message.css';
/**
 * Message after post results
 */

const SendMessage = ({ title, text }) => {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  return (
    <Toast className="toast-2" show={show} onClose={toggleShow}>
      <Toast.Header>
        <strong className="mr-auto">{title}</strong>
        <small>now</small>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
};
SendMessage.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default SendMessage;
