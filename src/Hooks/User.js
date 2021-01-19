import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../Redux/Actions';

export const useUserData = () => {
  return {
    isLogged: useSelector(state => state.user.isLogged),
    tokenId: useSelector(state => state.user.tokenId),
    success: useSelector(state => state.user.success),
    error: useSelector(state => state.user.error),
    displayName: useSelector(state => state.user.displayName),
  };
};

export const useSignIn = (email, password) => {
  const dispatch = useDispatch();

  return () => {
    if (email && password) dispatch(signIn(email, password));
  };
};

export const useSignOut = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(signOut());
  };
};
