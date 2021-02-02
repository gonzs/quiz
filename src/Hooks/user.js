import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../Redux/Actions';

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
    if (email && password) dispatch(actions.login(email, password));
  };
};

export const useSignOut = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(actions.signOut());
  };
};

export const useResetPassword = email => {
  const dispatch = useDispatch();

  useEffect(() => {
    // * Dispatch resetPassword action
    dispatch(actions.resetPassword(email));
  }, [dispatch, email]);
};

export const useUserPers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // * Dispatch requestUser action
    dispatch(actions.requestUser());
  }, [dispatch]);
};
