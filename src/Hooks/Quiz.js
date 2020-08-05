import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAnswer, getQuiz } from '../Redux/Actions';

export const useRetrieveAnswer = id => {
  const question = useSelector(state => state.quiz.questions[id - 1]);
  const retrievedAnswer = useSelector(state =>
    state.quiz.answers.filter(answer => answer.id === question.id)
  );

  return {
    retrievedAnswer,
  };
};

export const useQuestion = id => {
  return useSelector(state => state.quiz.questions[id - 1]);
};

export const useQuizData = () => {
  return {
    subject: useSelector(state => state.quiz.subject),
    isFetching: useSelector(state => state.quiz.isFetching),
    success: useSelector(state => state.quiz.success),
    error: useSelector(state => state.quiz.error),
    questions: useSelector(state => state.quiz.questions),
    answers: useSelector(state => state.quiz.answers),
  };
};

export const useSaveAnswer = (retrieved, question, current) => {
  const dispatch = useDispatch();
  return () => {
    if (retrieved.length === 0 || current !== retrieved[0].text) {
      dispatch(saveAnswer({ id: question.id, text: current }));
    }
  };
};

export const useQuiz = _path => {
  const path = _path[1];
  const dispatch = useDispatch();

  useEffect(() => {
    // * Dispatch getQuiz action
    dispatch(getQuiz(path));
  }, [dispatch, path]);
};
