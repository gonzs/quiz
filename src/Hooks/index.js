import { useNavigation, useRouter } from './Navigation';
import {
  useRetrieveAnswer,
  useSaveAnswer,
  useQuiz,
  useQuizData,
  useQuestion,
} from './Quiz';

import { useResultsData, useValidateQuiz } from './Results';

import {
  useUserData,
  useSignIn,
  useSignOut,
  useResetPassword,
  useUserPers,
} from './User';

const hooks = {
  useNavigation,
  useRetrieveAnswer,
  useSaveAnswer,
  useQuiz,
  useQuizData,
  useQuestion,
  useResultsData,
  useValidateQuiz,
  useUserData,
  useSignIn,
  useSignOut,
  useResetPassword,
  useUserPers,
  useRouter,
};

export default hooks;
