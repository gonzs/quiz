import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveAnswer, getQuiz, postResults } from '../Redux/Actions';

export const useNavigation = () => {
  let { id } = useParams();
  id = parseInt(id);
  const prevId = parseInt(id) - 1;
  const nextId = parseInt(id) + 1;
  const length = useSelector(state => state.quiz.questions.length);
  const isFirst = id === 1 ? true : false;
  const isLast = id === length ? true : false;

  return {
    id,
    prevId,
    nextId,
    isFirst,
    isLast,
  };
};

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

export const useResultsData = () => {
  return {
    isSending: useSelector(state => state.results.isSending),
    success: useSelector(state => state.results.success),
    error: useSelector(state => state.results.error),
  };
};

export const useValidateQuiz = (questions, answers, setResults, subject) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let score = 0;
    const validated = questions.map(question => {
      let i = answers.findIndex(answer => answer.id === question.id);

      if (answers[i].text === question.correct) {
        score += 1;
        return 'Correct';
      } else return 'Incorrect';
    });
    setResults({ validated: validated, score: score });
    if (validated.length !== 0) dispatch(postResults(subject, score));
  }, [dispatch, questions, answers, setResults, subject]);
};
