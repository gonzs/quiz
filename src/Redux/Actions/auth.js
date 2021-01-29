import * as types from '../types-actions';
import axios from 'axios';
import {
  auth,
  createUser,
  loginUser,
  logoutUser,
  updateDisplayName,
} from '../../firebase/firebase';

export function userCreation(email, password, displayName) {
  return async dispatch => {
    try {
      dispatch(signUp());
      // Firebase user creation
      const user = await createUser(email, password);

      await dispatch(updateProfile(user, displayName));

      // User create successfully
      dispatch(signUpSuccess());

      // Update role
      await axios.get(`${process.env.REACT_APP_API_URL}/role${user.uid}`);

      // NOTE: HACK: SignOut to generate a new token
      dispatch(signOut());
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

export function updateProfile(user, displayName) {
  return async dispatch => {
    try {
      await updateDisplayName(user, displayName);
      dispatch(updateProfileSuccess(displayName));
    } catch (error) {
      dispatch(updateProfileError());
    }
  };
}

export const updateProfileSuccess = payload => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  payload,
});

export const updateProfileError = payload => ({
  type: types.UPDATE_PROFILE_ERROR,
  payload,
});

export function login(email, password) {
  return async dispatch => {
    try {
      dispatch(signIn());
      await loginUser(email, password);

      // User signed successfully
      dispatch(signInSuccess());
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
      await logoutUser();
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
      await resetPassword(email);

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

export function requestUser() {
  return dispatch => {
    try {
      auth.onAuthStateChanged(async user => {
        if (user !== null) {
          const token = await user.getIdToken();
          dispatch(
            requestUserSuccess({
              displayName: user.displayName,
              tokenId: token,
            })
          );
        }
      });
    } catch (error) {
      dispatch(requestUserError());
    }
  };
}

export const requestUserSuccess = payload => ({
  type: types.REQUEST_USER_SUCCESS,
  payload,
});

export const requestUserError = payload => ({
  types: types.REQUEST_USER_ERROR,
  payload,
});
