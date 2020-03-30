import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Trivia from '../Trivia';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getQuiz } from '../Actions';

const Admger = () => {
  const { id } = useParams();
  const isFetching = useSelector(state => state.quiz.isFetching);
  const data = useSelector(state => state.quiz.quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuiz());
  }, []);

  return (
    <div>
      {isFetching ? (
        <Spinner className="main" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Trivia id={id} questions={data} />
      )}
    </div>
  );
};

export default Admger;
