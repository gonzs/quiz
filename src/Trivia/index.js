import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveAnswer } from '../Redux/Actions';

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
  return {
    subject: useSelector(state => state.quiz.subject),
    question: useSelector(state => state.quiz.questions[id - 1]),
  };
};

export const useSaveAnswer = (retrieved, question, current) => {
  const dispatch = useDispatch();
  return () => {
    if (retrieved.length === 0 || current !== retrieved[0].text) {
      console.log('paso');
      dispatch(saveAnswer({ id: question.id, text: current }));
    }
  };
};
