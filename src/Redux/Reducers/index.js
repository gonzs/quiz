import { combineReducers } from 'redux';
import quiz from './Quiz';
import results from './Results';
import user from './User';
import newQuiz from './NewQuiz';

export default combineReducers({ quiz, results, user, newQuiz });
