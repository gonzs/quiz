import {
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  REQUEST_USER_TOKEN_SUCCESS,
  REQUEST_USER_TOKEN_ERROR,
} from '../types-actions';
import { auth } from '../../firebase';
import { storeFactory } from '../../Test/testUtils';
import {
  userCreation,
  signUpSuccess,
  signUpError,
  requestUserToken,
  requestUserTokenSuccess,
  requestUserTokenError,
} from './';

test('returns action creator type `SIGNUP_USER_SUCCESS`', () => {
  const action = signUpSuccess();
  expect(action).toEqual({ type: SIGNUP_USER_SUCCESS });
});

test('returns action creator type `SIGNUP_USER_ERROR`', () => {
  const action = signUpError();
  expect(action).toEqual({ type: SIGNUP_USER_ERROR });
});

test('returns action creator type `REQUEST_USER_TOKEN_SUCCESS`', () => {
  const action = requestUserTokenSuccess();
  expect(action).toEqual({ type: REQUEST_USER_TOKEN_SUCCESS });
});

test('returns action creator type `REQUEST_USER_TOKEN_ERROR`', () => {
  const action = requestUserTokenError();
  expect(action).toEqual({ type: REQUEST_USER_TOKEN_ERROR });
});

describe(' userCreation action creator', () => {
  test('adds response user created succesfully', () => {
    const store = storeFactory();
    const email = 'gonzs@gonzs.com';
    const password = '12345678';
    const displayName = 'gonzs';
    const response = { user: { updateProfile: null, getIdToken: null } };

    auth.createUserWithEmailAndPassword = jest.fn(
      (email, password, displayName) => Promise.resolve(response)
    );

    response.user.updateProfile = jest.fn(({ displayName: displayName }) =>
      Promise.resolve()
    );

    response.user.getIdToken = jest.fn(() => {
      return Promise.resolve();
    });

    return store
      .dispatch(userCreation(email, password, displayName))
      .then(() => {
        const newState = store.getState();
        expect(newState.user.isLogged).toBe(true);
        expect(newState.user.success).toBe(true);
        expect(newState.user.error).toBe('');
      });
  });

  test('adds response user created non succesfully', () => {
    const store = storeFactory();
    const email = 'gonzs@gonzs.com';
    const password = '12345678';
    const displayName = 'gonzs';
    const error = { code: 401, message: 'Error when user is created' };

    auth.createUserWithEmailAndPassword = jest.fn(
      (email, password, displayName) => {
        return Promise.reject(error);
      }
    );

    return store
      .dispatch(userCreation(email, password, displayName))
      .then(() => {
        const newState = store.getState();
        expect(newState.user.isLogged).toBe(false);
        expect(newState.user.success).toBe(false);
        expect(newState.user.error).toBe(error.message);
      });
  });
});

describe(' requestToken action creator', () => {
  test('adds response token retrieved successfully', () => {
    const store = storeFactory();
    const user = { getIdToken: null };
    const token = 'ABCDEFGH';

    user.getIdToken = jest.fn(() => {
      return Promise.resolve(token);
    });

    return store.dispatch(requestUserToken(user)).then(() => {
      const newState = store.getState();
      expect(newState.user.tokenId).toBe(token);
    });
  });

  test('adds response token retrieved non succesfully', () => {
    const store = storeFactory();
    const user = { getIdToken: null };
    const error = { code: 401, message: 'Error when token is retrieved' };

    user.getIdToken = jest.fn(() => {
      return Promise.reject(error);
    });

    return store.dispatch(requestUserToken(user)).then(() => {
      const newState = store.getState();
      expect(newState.user.error).toBe(error.message);
    });
  });
});
