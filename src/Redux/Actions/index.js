import {
  getQuiz,
  saveAnswer,
  postResults,
  getSubjects,
  saveNewQuestion,
  postNewQuiz,
  clearAllNewQuiz,
} from './quiz';

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
  saveNewQuestion,
  postNewQuiz,
  clearAllNewQuiz,
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
