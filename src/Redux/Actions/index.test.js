import { CREATE_USER_SUCCESS, CREATE_USER_ERROR } from '../types-actions';
import { auth } from '../../firebase';
import { storeFactory } from '../../Test/testUtils';
import { userCreation, createUserSuccess, createUserError } from './';

test('returns action creator type `CREATE_USER_SUCCESS`', () => {
  const action = createUserSuccess();
  expect(action).toEqual({ type: CREATE_USER_SUCCESS });
});

test('returns action creator type `CREATE_USER_ERROR`', () => {
  const action = createUserError();
  expect(action).toEqual({ type: CREATE_USER_ERROR });
});

describe(' userCreation action creator', () => {
  // test('adds response user created succesfully', () => {
  //   const store = storeFactory();
  //   const email = 'gonzs@gonzs.com';
  //   const password = '12345678';
  //   const displayName = 'gonzs';

  //   auth.createUserWithEmailAndPassword = jest.fn(
  //     (email, password, displayName) => {
  //       return Promise.resolve({ email, password, displayName });
  //     }
  //   );

  //   auth.currentUser.updateProfile = jest.fn(({displayName:displayName}) => {
  //    return Promise.resolve()
  //   })

  //   return store
  //     .dispatch(userCreation(email, password, displayName))
  //     .then(() => {
  //       const newState = store.getState();
  //       expect(newState.user.isLogged).toBe(true);
  //       expect(newState.user.success).toBe(true);
  //     });
  // });

  test('adds response user created non succesfully', () => {
    const store = storeFactory();
    const email = 'gonzs@gonzs.com';
    const password = '12345678';
    const displayName = 'gonzs';
    const error = { code: 401, message: 'error when user is created' };

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
