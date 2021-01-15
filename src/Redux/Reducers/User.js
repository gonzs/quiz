import {
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  REQUEST_USER_TOKEN,
  REQUEST_USER_TOKEN_SUCCESS,
  REQUEST_USER_TOKEN_ERROR,
} from '../types-actions';

export default function user(
  state = { isLogged: false, tokenId: null, success: false, error: '' },
  action
) {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLogged: true,
        success: true,
        tokenId: action.payload.tokenId,
        displayName: action.payload.displayName,
      };

    case CREATE_USER_ERROR:
      return {
        ...state,
        isLogged: false,
        success: false,
        error: action.payload,
      };

    case REQUEST_USER_TOKEN:
      return state;

    case REQUEST_USER_TOKEN_SUCCESS:
      return state;

    case REQUEST_USER_TOKEN_ERROR:
      return state;

    default:
      return state;
  }
}
