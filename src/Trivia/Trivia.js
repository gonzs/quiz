import React from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import ErrorRequestMessage from '../Messages/ErrorRequestMessage';
import { useQuiz, useQuizData } from './CustomHooks';

const Trivia = props => {
  // * Get quiz data
  const { isFetching, subject, success, error } = useQuizData();
  // * Get questions
  useQuiz(props.match.path.split('/'));

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
export default Trivia;
