import { firebaseConfig } from './firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const createUser = async (email, password, displayName) => {
  //Create user
  const res = await auth.createUserWithEmailAndPassword(email, password);

  // Update user data
  await res.user.updateProfile({ displayName: displayName });

  return res.user.uid;
};

const loginUser = async (email, password) => {
  //Login user
  const res = await auth.signInWithEmailAndPassword(email, password);

  return res.user;
};

const logoutUser = async () => {
  //Logout user
  await auth.signOut();
};

const resetPassword = async email => {
  await auth.sendPasswordResetEmail(email);
};

export { firebase, createUser, loginUser, logoutUser, resetPassword };
