import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

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
      to: `/${subject}/${id}`,
      onClick,
    };
  }

  return <Button {...defProps}>{text}</Button>;
};
