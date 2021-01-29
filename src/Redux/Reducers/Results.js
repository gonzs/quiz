import * as types from '../types-actions';

export default function results(
  state = { isSending: false, success: true },
  action
) {
  switch (action.type) {
    case types.SEND_RESULTS:
      return { ...state, isSending: true };

    case types.SEND_RESULTS_SUCCESS:
      return { ...state, isSending: false, success: true };

    case types.SEND_RESULTS_ERROR:
      return {
        ...state,
        isSending: false,
        success: false,
      };

    default:
      return state;
  }
}
