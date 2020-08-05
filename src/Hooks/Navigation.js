import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
