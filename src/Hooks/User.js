import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../Redux/Actions';

export const useUserData = () => {
  return {
    isLogged: useSelector(state => state.user.isLogged),
    tokenId: useSelector(state => state.user.tokenId),
    success: useSelector(state => state.user.success),
    error: useSelector(state => state.user.error),
  };
};

export const useSignIn = (email, password) => {
  const dispatch = useDispatch();

  return () => {
    if (email && password) dispatch(signIn(email, password));
  };
};
