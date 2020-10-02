import {
  SEND_RESULTS,
  SEND_RESULTS_SUCCESS,
  SEND_RESULTS_ERROR,
} from '../types-actions';

export default (
  state = { isSending: false, success: true, error: '' },
  action
) => {
  switch (action.type) {
    case SEND_RESULTS:
      return { ...state, isSending: true, error: '' };

    case SEND_RESULTS_SUCCESS:
      return { ...state, isSending: false, success: true };

    case SEND_RESULTS_ERROR:
      return {
        ...state,
        isSending: false,
        success: false,
        error: action.payload.toString(),
      };

    default:
      return state;
  }
};
