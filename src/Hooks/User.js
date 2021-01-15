import { useSelector } from 'react-redux';
export const useUserData = () => {
  return {
    isLogged: useSelector(state => state.user.isLogged),
    tokenId: useSelector(state => state.user.tokenId),
    success: useSelector(state => state.user.success),
    error: useSelector(state => state.user.error),
  };
};
