import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigation } from '../Hooks';
import CustomButton from '../Buttons/CustomButton';

const NavButtons = ({ subject, saveAnswer }) => {
  // * Get Navigation data
  const { prevId, nextId, isFirst, isLast } = useNavigation();

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

export default NavButtons;
