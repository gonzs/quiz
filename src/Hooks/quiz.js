import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../Redux/Actions';

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
    subjects: useSelector(state => state.quiz.subjects),
  };
};

export const useSaveAnswer = (retrieved, question, current) => {
  const dispatch = useDispatch();
  return () => {
    if (retrieved.length === 0 || current !== retrieved[0].text) {
      dispatch(actions.saveAnswer({ id: question.id, text: current }));
    }
  };
};

export const useQuiz = (path, tokenId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // * Dispatch getQuiz action
    dispatch(actions.getQuiz(path, tokenId));
  }, [dispatch, path, tokenId]);
};

export const useSubjects = tokenId => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenId !== null) dispatch(actions.getSubjects(tokenId));
  }, [dispatch, tokenId]);
};

export const useSaveQuestion = (quizName, question) => {
  const dispatch = useDispatch();
  const newOptions = question.options.filter(o => o !== '');
  const newQuestion = { ...question, options: newOptions };
  return () => {
    dispatch(actions.saveNewQuestion({ quizName, question: newQuestion }));
  };
};

export const useNewQuizData = () => {
  return {
    isSending: useSelector(state => state.newQuiz.isSending),
    success: useSelector(state => state.newQuiz.success),
    error: useSelector(state => state.newQuiz.error),
    quizName: useSelector(state => state.newQuiz.quizName),
    questions: useSelector(state => state.newQuiz.questions),
  };
};

export const useSaveQuiz = (quizName, questions, tokenId) => {
  const dispatch = useDispatch();
  return () => {
    if (quizName !== '' && questions.length !== 0)
      dispatch(actions.postNewQuiz(quizName, questions, tokenId));
  };
};

export const useClearAllNewQuiz = () => {
  const dispatch = useDispatch();
  return () => dispatch(actions.clearAllNewQuiz());
};
