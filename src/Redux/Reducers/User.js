import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  REQUEST_USER_TOKEN_SUCCESS,
  REQUEST_USER_TOKEN_ERROR,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_ERROR,
  SIGNOUT_USER_SUCCESS,
  SIGNOUT_USER_ERROR,
} from '../types-actions';

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
    case SIGNUP_USER:
      return {
        ...state,
        isFetching: true,
      };

    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        success: true,
        error: '',
        isFetching: false,
      };

    case SIGNUP_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };

    case REQUEST_USER_TOKEN_SUCCESS:
      return { ...state, tokenId: action.payload };

    case REQUEST_USER_TOKEN_ERROR:
      return { ...state, error: action.payload };

    case SIGNIN_USER:
      return {
        ...state,
        isFetching: true,
      };

    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        isLogged: true,
        email: action.payload.email,
        displayName: action.payload.displayName,
        error: '',
        isFetching: false,
      };

    case SIGNIN_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };

    case SIGNOUT_USER_SUCCESS:
      return {
        ...state,
        isLogged: false,
        tokenId: null,
        email: undefined,
        displayName: undefined,
        error: '',
        success: false,
      };

    case SIGNOUT_USER_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
