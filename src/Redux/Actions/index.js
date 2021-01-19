import {
  REQUEST_QUIZ,
  REQUEST_QUIZ_SUCCESS,
  REQUEST_QUIZ_ERROR,
  SAVE_ANSWER,
  SEND_RESULTS,
  SEND_RESULTS_SUCCESS,
  SEND_RESULTS_ERROR,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  REQUEST_USER_TOKEN_SUCCESS,
  REQUEST_USER_TOKEN_ERROR,
  SIGNIN_USER_ERROR,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNOUT_USER_ERROR,
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
  return async dispatch => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      // Signed in too

      // Update user data
      res.user.updateProfile({ displayName: displayName });

      // Get token
      dispatch(requestUserToken(res.user));

      // User create successfully
      dispatch(signUpSuccess(displayName));
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export const signUpSuccess = payload => ({
  type: SIGNUP_USER_SUCCESS,
  payload,
});

export const signUpError = payload => ({
  type: SIGNUP_USER_ERROR,
  payload,
});

export function requestUserToken(user) {
  return async dispatch => {
    try {
      const idToken = await user.getIdToken();

      dispatch(requestUserTokenSuccess(idToken));
    } catch (error) {
      dispatch(requestUserTokenError(error.message));
    }
  };
}

export const requestUserTokenSuccess = payload => ({
  type: REQUEST_USER_TOKEN_SUCCESS,
  payload,
});

export const requestUserTokenError = payload => ({
  type: REQUEST_USER_TOKEN_ERROR,
  payload,
});

export function signIn(email, password) {
  return async dispatch => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      // Signed in

      // Get token
      dispatch(requestUserToken(res.user));

      // User signed successfully
      dispatch(signInSuccess(res.user.displayName));
    } catch (error) {
      dispatch(signInError(error.message));
    }
  };
}

export const signInSuccess = payload => ({
  type: SIGNIN_USER_SUCCESS,
  payload,
});

export const signInError = payload => ({
  type: SIGNIN_USER_ERROR,
  payload,
});

export function signOut() {
  return async dispatch => {
    try {
      await auth.signOut();
      //Sign Out

      // User signed out successfully
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutError(error.message));
    }
  };
}

export const signOutSuccess = payload => ({
  type: SIGNOUT_USER_SUCCESS,
  payload,
});

export const signOutError = payload => ({
  type: SIGNOUT_USER_ERROR,
  payload,
});
