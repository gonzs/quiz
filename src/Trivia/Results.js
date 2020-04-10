import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { HOME } from '../constants/routes';
import { Table, Nav, Badge } from 'react-bootstrap';
import SendMessage from '../Messages/SendMessage';
import { postResults } from '../Redux/Actions';

const Results = () => {
  const {
    questions,
    answers,
    subject,
    isSending,
    success,
    error,
  } = useSelector(state => {
    return {
      questions: state.quiz.questions,
      answers: state.quiz.answers,
      subject: state.quiz.subject,
      isSending: state.results.isSending,
      success: state.results.success,
      error: state.results.error,
    };
  });

  const [state, setState] = useState({ validated: [], score: 0 });
  const dispatch = useDispatch();

  const validateQuiz = (q, a) => {
    let score = 0;
    const validated = q.map((question, index) => {
      let i = a.findIndex(answer => answer.id === question.id);

      if (a[i].text === question.correct) {
        score += 1;
        return 'Correct';
      } else return 'Incorrect';
    });
    setState({ validated: validated, score: score });
    if (validated.length !== 0) dispatch(postResults(subject, score));
  };

  useEffect(() => {
    validateQuiz(questions, answers);
  }, []);

  return (
    <div>
      {answers.length === 0 ? (
        <Redirect to={HOME} />
      ) : (
        <div>
          {!isSending && <SendMessage success={success} error={error} />}

          <div className="trivia">
            <h1>
              <Badge variant="secondary">Results</Badge>
            </h1>

            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                </tr>
              </thead>

              <tbody>
                {state.validated.map((elem, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Nav.Link as={Link} to={`/${subject}/${index + 1}`}>
                          {index + 1}
                        </Nav.Link>
                      </td>
                      <td className={elem.toLowerCase()}>{elem}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <h2>{`Score: ${state.score} / ${questions.length}`}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
