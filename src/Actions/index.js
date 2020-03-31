import { REQUEST_QUIZ, RECEIVE_SUCCESS, RECEIVE_ERROR } from './types';

export function getQuiz(subject) {
  return dispatch => {
    dispatch(requestQuiz());

    fetch(`http://localhost:3000/${subject}`)
      .then(response => {
        if (response.ok !== true) throw new Error(response.status);
        else return response.json();
      })
      .then(data => {
        dispatch(receiveSuccess(data));
      })
      .catch(error => {
        console.error('An error occurred.', error);
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
