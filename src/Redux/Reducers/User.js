import {
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  REQUEST_USER_TOKEN_SUCCESS,
  REQUEST_USER_TOKEN_ERROR,
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
  },
  action
) {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isLogged: true,
        success: true,
        email: action.payload.email,
        displayName: action.payload.displayName,
      };

    case SIGNUP_USER_ERROR:
      return {
        ...state,
        success: false,
        error: action.payload,
      };

    case REQUEST_USER_TOKEN_SUCCESS:
      return { ...state, tokenId: action.payload };

    case REQUEST_USER_TOKEN_ERROR:
      return { ...state, error: action.payload };

    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        isLogged: true,
        success: true,
        email: action.payload.email,
        displayName: action.payload.displayName,
      };

    case SIGNIN_USER_ERROR:
      return {
        ...state,
        success: false,
        error: action.payload,
      };

    case SIGNOUT_USER_SUCCESS:
      return {
        ...state,
        isLogged: false,
        tokenId: null,
        succes: false,
        email: undefined,
        displayName: undefined,
      };

    case SIGNOUT_USER_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
