import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Custom button for question navigation bar
 */

export const CustomButton = ({
  variant = 'secondary',
  subject,
  id,
  onClick,
  text,
  disabled,
}) => {
  let defProps;

  if (disabled) {
    defProps = {
      variant,
      disabled,
    };
  } else {
    defProps = {
      variant,
      as: Link,
      to: `/subj/${subject}/${id}`,
      onClick,
    };
  }

  return <Button {...defProps}>{text}</Button>;
};
CustomButton.propTypes = {
  variant: PropTypes.string.isRequired,
  subject: PropTypes.string,
  id: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
