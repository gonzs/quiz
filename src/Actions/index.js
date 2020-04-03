import {
  REQUEST_QUIZ,
  RECEIVE_SUCCESS,
  RECEIVE_ERROR,
  SAVE_ANSWER,
} from './types';
import { URL_SERVER, ERROR_TEXT } from '../constants';

export function getQuiz(subject) {
  return dispatch => {
    dispatch(requestQuiz());

    fetch(`${URL_SERVER}/${subject}`)
      .then(response => {
        if (response.ok !== true) throw new Error(response.status);
        else return response.json();
      })
      .then(data => {
        dispatch(receiveSuccess(data));
      })
      .catch(error => {
        console.error(ERROR_TEXT, error);
        dispatch(receiveError(error));
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
