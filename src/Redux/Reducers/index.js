import { combineReducers } from 'redux';
import quiz from './Quiz';
import results from './Results';

export default combineReducers({ quiz, results });
