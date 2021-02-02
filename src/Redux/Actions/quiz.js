import * as types from '../types-actions';
import axios from 'axios';

export function getSubjects(tokenId) {
  return dispatch => {
    dispatch(requestSubjects());

    axios
      .get(`${process.env.REACT_APP_API_URL}/subjects`, {
        headers: { Authorization: `Bearer ${tokenId}` },
      })
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          if (data.length === 0) throw new Error();
          else dispatch(requestSubjectsSuccess(data));
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
          msg = `We couldn't find any subject.`;
        }
        dispatch(requestSubjectsError(msg));
      });
  };
}

const requestSubjects = () => ({
  type: types.REQUEST_SUBJECTS,
});

const requestSubjectsSuccess = payload => {
  return {
    type: types.REQUEST_SUBJECTS_SUCCESS,
    payload,
  };
};

const requestSubjectsError = payload => ({
  type: types.REQUEST_SUBJECTS_ERROR,
  payload,
});

export function getQuiz(subject, tokenId) {
  return dispatch => {
    dispatch(requestQuiz());

    axios
      .get(`${process.env.REACT_APP_API_URL}/subj/${subject}`, {
        headers: { Authorization: `Bearer ${tokenId}` },
      })
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          if (data.length === 0) throw new Error();
          else dispatch(requestQuizSuccess({ data, subject }));
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
        dispatch(requestQuizError(msg));
      });
  };
}

const requestQuiz = () => ({
  type: types.REQUEST_QUIZ,
});

const requestQuizSuccess = payload => {
  return {
    type: types.REQUEST_QUIZ_SUCCESS,
    payload,
  };
};

const requestQuizError = payload => ({
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

const sendResults = () => ({
  type: types.SEND_RESULTS,
});

const sendResultsSuccess = payload => ({
  type: types.SEND_RESULTS_SUCCESS,
  payload,
});

const sendResultsError = payload => ({
  type: types.SEND_RESULTS_ERROR,
  payload,
});
