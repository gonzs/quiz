import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Trivia from '../Trivia';
import { Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getQuiz } from '../Actions';

const Admger = () => {
  const { id } = useParams();
  const { isFetching, success, error, quiz } = useSelector(state => state.quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuiz());
  }, [dispatch]);

  return (
    <div>
      {isFetching ? (
        <Spinner className="main" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : success ? (
        <Trivia id={id} questions={quiz} />
      ) : (
        <Alert variant="danger">{error}</Alert>
      )}
    </div>
  );
};

export default Admger;
