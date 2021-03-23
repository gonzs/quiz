import * as types from '../types-actions';

export default function newQuiz(
  state = {
    isSending: false,
    success: false,
    quizName: '',
    questions: [],
  },
  action
) {
  switch (action.type) {
    case types.SAVE_NEW_QUESTION:
      const newQuestions = [...state.questions, action.payload.question];
      return {
        ...state,
        quizName: action.payload.quizName,
        questions: newQuestions,
      };

    case types.SEND_NEW_QUIZ:
      return { ...state, isSending: true };

    case types.SEND_NEW_QUIZ_SUCCESS:
      return {
        ...state,
        isSending: false,
        success: true,
        quizName: '',
        questions: [],
      };

    case types.SEND_NEW_QUIZ_ERROR:
      return {
        ...state,
        isSending: false,
        success: false,
      };

    case types.CLEAR_ALL_NEW_QUIZ:
      return {
        isSending: false,
        success: false,
        quizName: '',
        questions: [],
      };

    default:
      return state;
  }
}
