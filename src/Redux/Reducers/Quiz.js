import * as types from '../types-actions';

export default function quiz(
  state = {
    isFetching: false,
    success: false,
    error: '',
    subject: '',
    questions: [],
    answers: [],
  },
  action
) {
  switch (action.type) {
    case types.REQUEST_QUIZ:
      return { ...state, isFetching: true, answers: [] };

    case types.REQUEST_QUIZ_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        subject: action.payload.subject,
        questions: action.payload.data,
      };

    case types.REQUEST_QUIZ_ERROR:
      return {
        ...state,
        isFetching: false,
        success: false,
        error: action.payload.toString(),
      };

    case types.SAVE_ANSWER:
      let existed_item = state.answers.find(
        item => item.id === action.payload.id
      );

      if (existed_item) {
        let updatedAnswers = state.answers.map(item => {
          if (item.id === action.payload.id) {
            item.text = action.payload.text;
            return item;
          }
          return item;
        });

        return {
          ...state,
          answers: updatedAnswers,
        };
      } else {
        return {
          ...state,
          answers: [...state.answers, action.payload],
        };
      }

    case types.SIGNOUT_USER_SUCCESS:
      return {
        ...state,
        success: false,
        subject: '',
        questions: [],
        answers: [],
      };

    default:
      return state;
  }
}
