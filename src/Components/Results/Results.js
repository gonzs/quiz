import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import routes from '../../Router/routes';
import { Table, Card, Badge } from 'react-bootstrap';
import { SendMessage } from '../Message';
import hooks from '../../Hooks';

const successMsg = `🎉Your results were saved successfully.`;
const failureMsg = `😪Sorry... We couldn't save the results of your quiz.`;

/**
 * Show Quiz's results
 */

export const Results = () => {
  // * Get Quiz data
  const { questions, answers, subject } = hooks.useQuizData();
  // * Get Results data
  const { isSending, success } = hooks.useResultsData();
  // * Declare local results state
  const [results, setResults] = useState({ validated: [], score: 0 });

  // *Get user data
  const { email, tokenId } = hooks.useUserData();

  // * Validate Quiz
  hooks.useValidateQuiz(
    questions,
    answers,
    setResults,
    subject,
    email,
    tokenId
  );

  // Render if there are not answers
  if (answers.length === 0) return <Redirect to={routes.HOME} />;

  // Render results table
  return (
    <div>
      {!isSending && (
        <SendMessage
          title="Save results"
          text={success ? successMsg : failureMsg}
        />
      )}

      <Card bg="light" text="dark">
        <Card.Header>Results</Card.Header>
        <Card.Body>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>

            <tbody>
              {results.validated.map((elem, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link to={`/subj/${subject}/${index + 1}`}>
                        {index + 1}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className={elem.toLowerCase()}
                        to={`/subj/${subject}/${index + 1}`}
                      >
                        {elem}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
        <h2>
          <Badge variant="secondary">{`Score: ${results.score} / ${questions.length}`}</Badge>
        </h2>
      </Card>
    </div>
  );
};
