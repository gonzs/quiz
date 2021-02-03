import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import hooks from '../../Hooks';
import { CustomButton } from './CustomButton';
import PropTypes from 'prop-types';

/**
 * Question Navigation Buttons
 */

export const NavButtons = ({ subject, saveAnswer }) => {
  // * Get Navigation data
  const { prevId, nextId, isFirst, isLast } = hooks.useNavigation();

  return (
    <ButtonGroup>
      {!isFirst ? (
        <CustomButton
          subject={subject}
          id={prevId}
          onClick={saveAnswer}
          text="Previous"
        />
      ) : (
        <CustomButton text="Previous" disabled />
      )}

      {isLast ? (
        <CustomButton
          subject={subject}
          id={'results'}
          onClick={saveAnswer}
          text="Submit"
        />
      ) : (
        <CustomButton
          subject={subject}
          id={nextId}
          onClick={saveAnswer}
          text="Next"
        />
      )}
    </ButtonGroup>
  );
};
NavButtons.propTypes = {
  subject: PropTypes.string.isRequired,
  saveAnswer: PropTypes.func.isRequired,
};
