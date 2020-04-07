import {
  REQUEST_QUIZ,
  RECEIVE_SUCCESS,
  RECEIVE_ERROR,
  SAVE_ANSWER,
} from './types';
import { ERROR_TEXT, ERROR_FETCH } from '../constants';

export function getQuiz(subject) {
  return dispatch => {
    dispatch(requestQuiz());

    fetch(`${process.env.REACT_APP_API_URL}/${subject}`)
      .then(response => {
        if (response.ok !== true) throw new Error(response.status);
        else return response.json();
      })
      .then(data => {
        dispatch(receiveSuccess({ data, subject }));
      })
      .catch(error => {
        console.error(ERROR_TEXT, error);
        dispatch(receiveError(ERROR_FETCH));
      });
  };
}

export const requestQuiz = () => ({
  type: REQUEST_QUIZ,
});

export const receiveSuccess = payload => {
  return {
    type: RECEIVE_SUCCESS,
    payload,
  };
};

export const receiveError = payload => ({
  type: RECEIVE_ERROR,
  payload,
});

export const saveAnswer = payload => ({
  type: SAVE_ANSWER,
  payload,
});
