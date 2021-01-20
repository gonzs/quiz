import { useSelector, useDispatch } from 'react-redux';
import { login, signOut } from '../Redux/Actions';

export const useUserData = () => {
  return {
    isLogged: useSelector(state => state.user.isLogged),
    tokenId: useSelector(state => state.user.tokenId),
    error: useSelector(state => state.user.error),
    displayName: useSelector(state => state.user.displayName),
    email: useSelector(state => state.user.email),
    isFetching: useSelector(state => state.user.isFetching),
  };
};

export const useSignIn = (email, password) => {
  const dispatch = useDispatch();

  return () => {
    if (email && password) dispatch(login(email, password));
  };
};

export const useSignOut = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(signOut());
  };
};
