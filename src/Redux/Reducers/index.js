import { combineReducers } from 'redux';
import quiz from './Quiz';
import results from './Results';
import user from './User';

export default combineReducers({ quiz, results, user });
