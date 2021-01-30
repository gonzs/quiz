import React from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ErrorRequestMessage } from '../Message/Message';
import hooks from '../../Hooks';

export const Quiz = props => {
  // * Get quiz data
  const { isFetching, subject, success, error } = hooks.useQuizData();

  // * Get TokenId from user data
  const { tokenId } = hooks.useUserData();

  // * Get questions
  hooks.useQuiz(props.match.path.split('/'), tokenId);

  // Render loading
  if (isFetching)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  // Render Error message
  if (!success) return <ErrorRequestMessage text={error} />;
  // Render first question
  else return <Redirect to={`${subject}/1`} />;
};
