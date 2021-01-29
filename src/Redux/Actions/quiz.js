import * as types from '../types-actions';
import axios from 'axios';

export function getQuiz(subject, tokenId) {
  return dispatch => {
    dispatch(requestQuiz());

    axios
      .get(`${process.env.REACT_APP_API_URL}/${subject}`, {
        headers: { Authorization: `Bearer ${tokenId}` },
      })
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          if (data.length === 0) throw new Error();
          else dispatch(requestSuccess({ data, subject }));
        }
      })
      .catch(error => {
        let msg = '';

        if (error.hasOwnProperty('response') && error.response !== undefined) {
          const { response } = error;

          switch (response.status) {
            case 403:
              msg = `You do not have authorization. Contact the administrator.`;
              break;
            case 401:
              msg = `You are not authenticated. Please Sign In`;
              break;
            default:
              break;
          }
          console.error(
            `An error occurred... : ${response.status} - ${response.statusText}`
          );
        } else if (
          error.hasOwnProperty('response') &&
          error.response === undefined
        ) {
          msg = `${error}`;
          console.error(`An error occurred... : ${error}`);
        } else {
          msg = `We couldn't find any questions for the quiz.`;
        }
        dispatch(requestError(msg));
      });
  };
}

export const requestQuiz = () => ({
  type: types.REQUEST_QUIZ,
});

export const requestSuccess = payload => {
  return {
    type: types.REQUEST_QUIZ_SUCCESS,
    payload,
  };
};

export const requestError = payload => ({
  type: types.REQUEST_QUIZ_ERROR,
  payload,
});

export const saveAnswer = payload => ({
  type: types.SAVE_ANSWER,
  payload,
});

export function postResults(email, subject, score, tokenId) {
  return dispatch => {
    dispatch(sendResults());

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/results`,
        {
          subject,
          email,
          score,
        },
        { headers: { Authorization: `Bearer ${tokenId}` } }
      )
      .then(response => {
        if (response.status !== 200)
          throw new Error(response.status + response.statusText);
        else dispatch(sendResultsSuccess());
      })
      .catch(error => {
        console.error(`An error occurred... : ${error}`);
        dispatch(sendResultsError());
      });
  };
}

export const sendResults = () => ({
  type: types.SEND_RESULTS,
});

export const sendResultsSuccess = payload => ({
  type: types.SEND_RESULTS_SUCCESS,
  payload,
});

export const sendResultsError = payload => ({
  type: types.SEND_RESULTS_ERROR,
  payload,
});
