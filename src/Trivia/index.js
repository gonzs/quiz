import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getQuiz } from '../Actions';

const Trivia = props => {
  const path = props.match.path.split('/');
  const { isFetching, success, error } = useSelector(state => state.quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    // * Dispatch getQuiz action
    dispatch(getQuiz(path[1]));
  }, [dispatch]);

  return (
    <div>
      {isFetching ? (
        <Spinner className="main" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : success ? (
        <Redirect to={`${path[1]}/1`} />
      ) : (
        <Alert variant="danger">{error}</Alert>
      )}
    </div>
  );
};

export default Trivia;
