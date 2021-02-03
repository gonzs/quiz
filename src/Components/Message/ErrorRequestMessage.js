import React from 'react';
import danger from '../../Icons/danger.svg';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import './Message.css';

/**
 * Error message from subject request
 */

const ErrorRequestMessage = ({ text }) => {
  return (
    <Alert className="alert-2" variant="danger">
      <Alert.Heading>Unexpected error has ocurred</Alert.Heading>
      <img src={danger} className="danger" alt="danger" />
      {text}
    </Alert>
  );
};
ErrorRequestMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
export default ErrorRequestMessage;
