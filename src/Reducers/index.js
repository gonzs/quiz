import { combineReducers } from 'redux';
import {
  REQUEST_QUIZ,
  RECEIVE_SUCCESS,
  RECEIVE_ERROR,
  SAVE_ANSWER,
} from '../Actions/types';

function quiz(
  state = {
    isFetching: true,
    success: true,
    error: '',
    subject: '',
    quiz: [],
    answers: [],
  },
  action
) {
  switch (action.type) {
    case REQUEST_QUIZ:
      return { ...state, isFetching: true, answers: [] };

    case RECEIVE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        subject: action.payload.subject,
        quiz: action.payload.data,
      };

    case RECEIVE_ERROR:
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

export default combineReducers({ quiz });
