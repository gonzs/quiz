import { combineReducers } from 'redux';
import {
  REQUEST_QUIZ,
  REQUEST_QUIZ_SUCCESS,
  REQUEST_QUIZ_ERROR,
  SAVE_ANSWER,
  SEND_RESULTS,
  SEND_RESULTS_SUCCESS,
  SEND_RESULTS_ERROR,
} from '../types';

function quiz(
  state = {
    isFetching: true,
    success: true,
    error: '',
    subject: '',
    questions: [],
    answers: [],
  },
  action
) {
  switch (action.type) {
    case REQUEST_QUIZ:
      return { ...state, isFetching: true, answers: [] };

    case REQUEST_QUIZ_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        subject: action.payload.subject,
        questions: action.payload.data,
      };

    case REQUEST_QUIZ_ERROR:
      return {
        ...state,
        isFetching: false,
        success: false,
        error: action.payload.toString(),
      };

    case SAVE_ANSWER:
      let existed_item = state.answers.find(
        item => item.id === action.payload.id
      );

      if (existed_item) {
        let updatedAnswers = state.answers.map(item => {
          if (item.id === action.payload.id) {
            item.text = action.payload.text;
            return item;
          }
          return item;
        });

        return {
          ...state,
          answers: updatedAnswers,
        };
      } else {
        return {
          ...state,
          answers: [...state.answers, action.payload],
        };
      }

    default:
      return state;
  }
}

function results(
  state = { isSending: false, success: true, error: '' },
  action
) {
  switch (action.type) {
    case SEND_RESULTS:
      return { ...state, isSending: true };

    case SEND_RESULTS_SUCCESS:
      return { ...state, isSending: false, success: true };

    case SEND_RESULTS_ERROR:
      return {
        ...state,
        isSending: false,
        success: false,
        error: action.payload.toString(),
      };

    default:
      return state;
  }
}

export default combineReducers({ quiz, results });
