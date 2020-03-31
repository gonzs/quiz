import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { ADMGER } from '../routes';
import { Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getQuiz } from '../Actions';

// TODO: refactor to a generic component
const Admger = () => {
  const { isFetching, success, error } = useSelector(state => state.quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    // * Dispatch getQuiz action
    dispatch(getQuiz('admger'));
  }, [dispatch]);

  return (
    <div>
      {isFetching ? (
        <Spinner className="main" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : success ? (
        <Redirect to={`${ADMGER}/1`} />
      ) : (
        <Alert variant="danger">{error}</Alert>
      )}
    </div>
  );
};

export default Admger;
