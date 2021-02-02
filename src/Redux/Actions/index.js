import { getQuiz, saveAnswer, postResults, getSubjects } from './quiz';

import {
  userCreation,
  signUp,
  signUpSuccess,
  signUpError,
  login,
  signIn,
  signInSuccess,
  signInError,
  signOut,
  resetPassword,
  requestUser,
} from './auth';

const actions = {
  getQuiz,
  saveAnswer,
  postResults,
  getSubjects,
  userCreation,
  signUp,
  signUpSuccess,
  signUpError,
  login,
  signIn,
  signInSuccess,
  signInError,
  signOut,
  resetPassword,
  requestUser,
};
export default actions;
