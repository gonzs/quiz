import * as types from '../types-actions';
import { auth } from '../../firebase';
import { storeFactory } from '../../Test/testUtils';
import {
  userCreation,
  signUp,
  signUpSuccess,
  signUpError,
  requestUserToken,
  requestUserTokenSuccess,
  requestUserTokenError,
  signIn,
  signInSuccess,
  signInError,
  login,
} from './';
import moxios from 'moxios';

test('returns action creator type `SIGNUP_USER`', () => {
  const action = signUp();
  expect(action).toEqual({ type: types.SIGNUP_USER });
});

test('returns action creator type `SIGNUP_USER_SUCCESS`', () => {
  const action = signUpSuccess();
  expect(action).toEqual({ type: types.SIGNUP_USER_SUCCESS });
});

test('returns action creator type `SIGNUP_USER_ERROR`', () => {
  const action = signUpError();
  expect(action).toEqual({ type: types.SIGNUP_USER_ERROR });
});

test('returns action creator type `REQUEST_USER_TOKEN_SUCCESS`', () => {
  const action = requestUserTokenSuccess();
  expect(action).toEqual({ type: types.REQUEST_USER_TOKEN_SUCCESS });
});

test('returns action creator type `REQUEST_USER_TOKEN_ERROR`', () => {
  const action = requestUserTokenError();
  expect(action).toEqual({ type: types.REQUEST_USER_TOKEN_ERROR });
});

test('returns action creator type `SIGNIN_USER`', () => {
  const action = signIn();
  expect(action).toEqual({ type: types.SIGNIN_USER });
});

test('returns action creator type `SIGNIN_USER_SUCCESS`', () => {
  const action = signInSuccess();
  expect(action).toEqual({ type: types.SIGNIN_USER_SUCCESS });
});

test('returns action creator type `SIGNIN_USER_ERROR`', () => {
  const action = signInError();
  expect(action).toEqual({ type: types.SIGNIN_USER_ERROR });
});

describe(' userCreation action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

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

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: '' });
    });

    return store
      .dispatch(userCreation(email, password, displayName))
      .then(() => {
        const newState = store.getState();
        expect(newState.user.isFetching).toBeFalsy();
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
        expect(newState.user.isFetching).toBeFalsy();
        expect(newState.user.error).not.toBe(' ');
      });
  });
});

describe('requestToken action creator', () => {
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
      expect(newState.user.error).not.toBe(' ');
    });
  });
});

describe('signIn action creator', () => {
  test('adds response signIn successfully', () => {
    const store = storeFactory();
    const email = 'gonzs@gonzs.com';
    const password = '12345678';
    const response = { user: { updateProfile: null, getIdToken: null } };

    auth.signInWithEmailAndPassword = jest.fn((email, password) =>
      Promise.resolve(response)
    );

    response.user.getIdToken = jest.fn(() => {
      return Promise.resolve();
    });

    return store.dispatch(login(email, password)).then(() => {
      const newState = store.getState();
      expect(newState.user.isLogged).toBe(true);
    });
  });

  test('adds response signIn non successfully', () => {
    const store = storeFactory();
    const email = 'gonzs@gonzs.com';
    const password = '12345678';
    const error = { code: 401, message: 'Error when user is logged' };

    auth.signInWithEmailAndPassword = jest.fn((email, password) =>
      Promise.reject(error)
    );

    return store.dispatch(login()).then(() => {
      const newState = store.getState();
      expect(newState.user.isLogged).toBe(false);
      expect(newState.user.error).not.toBe(' ');
    });
  });
});
