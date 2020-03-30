import { combineReducers } from 'redux';

import { REQUEST_QUIZ, RECEIVE_SUCCESS, RECEIVE_ERROR } from '../Actions/types';

function quiz(
  state = {
    isFetching: true,
    success: true,
    error: '',
    quiz: [],
  },
  action
) {
  switch (action.type) {
    case REQUEST_QUIZ:
      return { ...state, isFetching: true };

    case RECEIVE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        quiz: action.payload,
      };

    case RECEIVE_ERROR:
      return {
        isFetching: false,
        success: false,
        error: action.payload.toString(),
      };

    default:
      return state;
  }
}

export default combineReducers({ quiz });
