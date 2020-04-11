import {
  REQUEST_QUIZ,
  REQUEST_QUIZ_SUCCESS,
  REQUEST_QUIZ_ERROR,
  SAVE_ANSWER,
  SEND_RESULTS,
  SEND_RESULTS_SUCCESS,
  SEND_RESULTS_ERROR,
} from '../types';
import { ERROR_TEXT, ERROR_FETCH, ERROR_SEND } from '../../constants';
import axios from 'axios';

export function getQuiz(subject) {
  return dispatch => {
    dispatch(requestQuiz());

    axios
      .get(`${process.env.REACT_APP_API_URL}/${subject}`)
      .then(response => {
        if (response.statusText !== 'OK') throw new Error(response.status);
        else {
          let data = response.data;
          dispatch(requestSuccess({ data, subject }));
        }
      })
      .catch(error => {
        console.error(ERROR_TEXT, error);
        dispatch(requestError(ERROR_FETCH));
      });
  };
}

export const requestQuiz = () => ({
  type: REQUEST_QUIZ,
});

export const requestSuccess = payload => {
  return {
    type: REQUEST_QUIZ_SUCCESS,
    payload,
  };
};

export const requestError = payload => ({
  type: REQUEST_QUIZ_ERROR,
  payload,
});

export const saveAnswer = payload => ({
  type: SAVE_ANSWER,
  payload,
});

export function postResults(subject, score) {
  return dispatch => {
    dispatch(sendResults());

    // TODO: Build API to post the results
    axios
      .post(`${process.env.REACT_APP_API_URL}/results`, { subject, score })
      .then(response => {
        if (response.statusText !== 'OK') throw new Error(response.status);
        else dispatch(sendSuccess());
      })
      .catch(error => {
        console.error(ERROR_TEXT, error);
        dispatch(sendError(ERROR_SEND));
      });
  };
}

export const sendResults = () => ({
  type: SEND_RESULTS,
});

export const sendSuccess = payload => ({
  type: SEND_RESULTS_SUCCESS,
  payload,
});

export const sendError = payload => ({
  type: SEND_RESULTS_ERROR,
  payload,
});
