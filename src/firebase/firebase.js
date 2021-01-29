import { firebaseConfig } from './firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const createUser = async (email, password) => {
  //Create user
  const res = await auth.createUserWithEmailAndPassword(email, password);

  return res.user;
};

const updateDisplayName = async (user, displayName) => {
  // Update user data
  await user.updateProfile({ displayName: displayName });
};

const loginUser = async (email, password) => {
  //Login user
  await auth.signInWithEmailAndPassword(email, password);
};

const logoutUser = async () => {
  //Logout user
  await auth.signOut();
};

const resetPassword = async email => {
  await auth.sendPasswordResetEmail(email);
};

export {
  auth,
  createUser,
  loginUser,
  logoutUser,
  updateDisplayName,
  resetPassword,
};
