import * as types from '../types-actions';

export default function user(
  state = {
    isLogged: false,
    tokenId: null,
    success: false,
    error: '',
    displayName: undefined,
    email: undefined,
    isFetching: false,
  },
  action
) {
  switch (action.type) {
    case types.SIGNUP_USER:
      return {
        ...state,
        isFetching: true,
      };

    case types.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        success: true,
        error: '',
        isFetching: false,
      };

    case types.SIGNUP_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };

    case types.REQUEST_USER_TOKEN_SUCCESS:
      return { ...state, tokenId: action.payload };

    case types.REQUEST_USER_TOKEN_ERROR:
      return { ...state, error: action.payload };

    case types.SIGNIN_USER:
      return {
        ...state,
        isFetching: true,
      };

    case types.SIGNIN_USER_SUCCESS:
      return {
        ...state,
        isLogged: true,
        email: action.payload.email,
        displayName: action.payload.displayName,
        error: '',
        isFetching: false,
      };

    case types.SIGNIN_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };

    case types.SIGNOUT_USER_SUCCESS:
      return {
        ...state,
        isLogged: false,
        tokenId: null,
        email: undefined,
        displayName: undefined,
        error: '',
        success: false,
      };

    case types.SIGNOUT_USER_ERROR:
      return { ...state, error: action.payload };

    case types.RESET_PASSWORD_SUCCESS:
      return { ...state, success: true };

    case types.RESET_PASSWORD_ERROR:
      return { ...state, success: false, error: action.payload };

    default:
      return state;
  }
}
