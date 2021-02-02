import { useMemo } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';

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

export const useRouter = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
};
