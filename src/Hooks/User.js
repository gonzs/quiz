import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, signOut, resetPassword, requestUser } from '../Redux/Actions';

export const useUserData = () => {
  return {
    isLogged: useSelector(state => state.user.isLogged),
    success: useSelector(state => state.user.success),
    tokenId: useSelector(state => state.user.tokenId),
    error: useSelector(state => state.user.error),
    isFetching: useSelector(state => state.user.isFetching),
    displayName: useSelector(state => state.user.displayName),
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

export const useResetPassword = email => {
  const dispatch = useDispatch();

  useEffect(() => {
    // * Dispatch resetPassword action
    dispatch(resetPassword(email));
  }, [dispatch, email]);
};

export const useUserPers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // * Dispatch requestUser action
    dispatch(requestUser());
  }, [dispatch]);
};
