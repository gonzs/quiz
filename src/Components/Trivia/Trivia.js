import React from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ErrorRequestMessage } from '../Message';
import { useQuiz, useQuizData, useUserData } from '../../Hooks';

export const Trivia = props => {
  // * Get quiz data
  const { isFetching, subject, success, error } = useQuizData();

  // * Get TokenId from user data
  const { tokenId } = useUserData();

  // * Get questions
  useQuiz(props.match.path.split('/'), tokenId);

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
