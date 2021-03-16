import * as types from '../types-actions';

export default function user(
  state = {
    isLogged: false,
    success: false,
    error: '',
    isFetching: false,
    tokenId: null,
    displayName: '',
    role: '',
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

    case types.SIGNIN_USER:
      return {
        ...state,
        isFetching: true,
      };

    case types.SIGNIN_USER_SUCCESS:
      return {
        ...state,
        isLogged: true,
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
        error: '',
        displayName: '',
      };

    case types.SIGNOUT_USER_ERROR:
      return { ...state, error: action.payload };

    case types.RESET_PASSWORD_SUCCESS:
      return { ...state, success: true };

    case types.RESET_PASSWORD_ERROR:
      return { ...state, success: false, error: action.payload };

    case types.REQUEST_USER_SUCCESS:
      return {
        ...state,
        isLogged: true,
        tokenId: action.payload.tokenId,
        displayName: action.payload.displayName,
        role: action.payload.role,
      };

    case types.REQUEST_USER_ERROR:
      return { ...state, error: action.payload };

    case types.UPDATE_PROFILE_SUCCESS:
      return { ...state, displayName: action.payload };

    case types.UPDATE_PROFILE_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
