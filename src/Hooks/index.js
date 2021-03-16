import { useNavigation, useRouter } from './navigation';
import {
  useRetrieveAnswer,
  useSaveAnswer,
  useQuiz,
  useQuizData,
  useQuestion,
  useSubjects,
  useSaveQuestion,
  useNewQuizData,
  useSaveQuiz,
  useClearAllNewQuiz,
} from './quiz';

import { useResultsData, useValidateQuiz } from './results';

import {
  useUserData,
  useSignIn,
  useSignOut,
  useResetPassword,
  useUserPers,
} from './user';

const hooks = {
  useNavigation,
  useRetrieveAnswer,
  useSaveAnswer,
  useQuiz,
  useQuizData,
  useQuestion,
  useSubjects,
  useSaveQuestion,
  useNewQuizData,
  useSaveQuiz,
  useClearAllNewQuiz,
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
