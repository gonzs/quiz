import {
  REQUEST_QUIZ,
  REQUEST_QUIZ_SUCCESS,
  REQUEST_QUIZ_ERROR,
  SAVE_ANSWER,
  SEND_RESULTS,
  SEND_RESULTS_SUCCESS,
  SEND_RESULTS_ERROR,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
} from '../types-actions';
import { ERROR_TEXT, ERROR_FETCH, ERROR_SEND } from '../../Constants';
import axios from 'axios';
import { auth } from '../../firebase/firebase';

export function getQuiz(subject, tokenId) {
  return dispatch => {
    dispatch(requestQuiz());

    axios
      .get(`${process.env.REACT_APP_API_URL}/${subject}`, {
        headers: { Authorization: `Bearer ${tokenId}` },
      })
      .then(response => {
        if (response.status !== 200)
          throw new Error(`${response.status} - ${response.statusText}`);
        else {
          let data = response.data;
          if (data.length === 0)
            throw new Error(`${response.status} - NO DATA`);
          else dispatch(requestSuccess({ data, subject }));
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

    axios
      .post(`${process.env.REACT_APP_API_URL}/results`, { subject, score })
      .then(response => {
        if (response.status !== 200)
          throw new Error(response.status + response.statusText);
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

export function userCreation(email, password, displayName) {
  return dispatch => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        // Signed in

        res.user
          // Update user data
          .updateProfile({
            displayName: displayName,
          })
          .then(() => {
            // Get token
            res.user.getIdToken().then(idToken => {
              dispatch(
                createUserSuccess({
                  displayName: res.user.displayName,
                  tokenId: idToken,
                })
              );
            });
          });
      })
      .catch(error => {
        dispatch(createUserError(error.message));
      });
  };
}

export const createUserSuccess = payload => ({
  type: CREATE_USER_SUCCESS,
  payload,
});

export const createUserError = payload => ({
  type: CREATE_USER_ERROR,
  payload,
});
