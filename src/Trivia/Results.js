import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { HOME } from '../constants/routes';
import { Table, Nav, Badge } from 'react-bootstrap';
import SendMessage from '../Messages/SendMessage';
import { useQuizData, useResultsData, useValidateQuiz } from './Logic';

const Results = () => {
  // * Get Quiz data
  const { questions, answers, subject } = useQuizData();
  // * Get Results data
  const { isSending, success, error } = useResultsData();
  // * Declare local results state
  const [results, setResults] = useState({ validated: [], score: 0 });

  // * Validate Quiz
  useValidateQuiz(questions, answers, setResults, subject);

  // Render if there are not answers
  if (answers.length === 0) return <Redirect to={HOME} />;

  // Render results table
  return (
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
            {results.validated.map((elem, index) => {
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
        <h2>{`Score: ${results.score} / ${questions.length}`}</h2>
      </div>
    </div>
  );
};

export default Results;
