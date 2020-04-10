import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getQuiz } from '../Redux/Actions';
import ErrorRequestMessage from '../Messages/ErrorRequestMessage';

const Trivia = props => {
  const path = props.match.path.split('/');
  const { isFetching, subject, success, error } = useSelector(
    state => state.quiz
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // * Dispatch getQuiz action
    dispatch(getQuiz(path[1]));
  }, [dispatch]);

  // Render loading
  if (isFetching)
    return (
      <Spinner className="trivia" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  // Render Error message
  if (!success) return <ErrorRequestMessage text={error} />;
  // Render first question
  else return <Redirect to={`${subject}/1`} />;
};

export default Trivia;
