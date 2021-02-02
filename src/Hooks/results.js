import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../Redux/Actions';

export const useResultsData = () => {
  return {
    isSending: useSelector(state => state.results.isSending),
    success: useSelector(state => state.results.success),
  };
};

export const useValidateQuiz = (
  questions,
  answers,
  setResults,
  subject,
  email,
  tokenId
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let score = 0;
    const validated = questions.map(question => {
      let i = answers.findIndex(answer => answer.id === question.id);

      if (answers[i].text === question.correct) {
        score += 1;
        return 'Correct';
      } else return 'Incorrect';
    });

    setResults({ validated: validated, score: score });

    if (validated.length !== 0) {
      dispatch(actions.postResults(email, subject, score, tokenId));
    }
  }, [dispatch, questions, answers, setResults, email, subject, tokenId]);
};
