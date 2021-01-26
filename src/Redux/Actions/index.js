import * as types from '../types-actions';
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
  type: types.REQUEST_QUIZ,
});

export const requestSuccess = payload => {
  return {
    type: types.REQUEST_QUIZ_SUCCESS,
    payload,
  };
};

export const requestError = payload => ({
  type: types.REQUEST_QUIZ_ERROR,
  payload,
});

export const saveAnswer = payload => ({
  type: types.SAVE_ANSWER,
  payload,
});

export function postResults(email, subject, score, tokenId) {
  return dispatch => {
    dispatch(sendResults());

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/results`,
        {
          subject,
          email,
          score,
        },
        { headers: { Authorization: `Bearer ${tokenId}` } }
      )
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
  type: types.SEND_RESULTS,
});

export const sendSuccess = payload => ({
  type: types.SEND_RESULTS_SUCCESS,
  payload,
});

export const sendError = payload => ({
  type: types.SEND_RESULTS_ERROR,
  payload,
});

export function userCreation(email, password, displayName) {
  return async dispatch => {
    try {
      dispatch(signUp());
      const res = await auth.createUserWithEmailAndPassword(email, password);
      // Signed in too

      // Update user data
      res.user.updateProfile({ displayName: displayName });

      await axios.get(`${process.env.REACT_APP_API_URL}/role${res.user.uid}`);

      // User create successfully
      dispatch(signUpSuccess());
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export const signUp = payload => ({
  type: types.SIGNUP_USER,
  payload,
});

export const signUpSuccess = payload => ({
  type: types.SIGNUP_USER_SUCCESS,
  payload,
});

export const signUpError = payload => ({
  type: types.SIGNUP_USER_ERROR,
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
  type: types.REQUEST_USER_TOKEN_SUCCESS,
  payload,
});

export const requestUserTokenError = payload => ({
  type: types.REQUEST_USER_TOKEN_ERROR,
  payload,
});

export function login(email, password) {
  return async dispatch => {
    try {
      dispatch(signIn());
      const res = await auth.signInWithEmailAndPassword(email, password);
      // Signed in

      // Get token
      dispatch(requestUserToken(res.user));

      // User signed successfully
      dispatch(
        signInSuccess({
          email: res.user.email,
          displayName: res.user.displayName,
        })
      );
    } catch (error) {
      dispatch(signInError(error.message));
    }
  };
}

export const signIn = payload => ({
  type: types.SIGNIN_USER,
  payload,
});

export const signInSuccess = payload => ({
  type: types.SIGNIN_USER_SUCCESS,
  payload,
});

export const signInError = payload => ({
  type: types.SIGNIN_USER_ERROR,
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
  type: types.SIGNOUT_USER_SUCCESS,
  payload,
});

export const signOutError = payload => ({
  type: types.SIGNOUT_USER_ERROR,
  payload,
});

export function resetPassword(email) {
  return async dispatch => {
    try {
      await auth.sendPasswordResetEmail(email);

      // Reset email was sent
      dispatch(resetPasswordSuccess());
    } catch (error) {
      dispatch(resetPasswordError(error.message));
    }
  };
}

export const resetPasswordSuccess = payload => ({
  type: types.RESET_PASSWORD_SUCCESS,
  payload,
});

export const resetPasswordError = payload => ({
  type: types.RESET_PASSWORD_ERROR,
  payload,
});
