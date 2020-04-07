import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { HOME } from '../constants/routes';
import { Table, Nav } from 'react-bootstrap';

const Results = () => {
  const quiz = useSelector(state => state.quiz.quiz);
  const answers = useSelector(state => state.quiz.answers);
  const subject = useSelector(state => state.quiz.subject);
  let score = 0;

  const validateQuestion = question => {
    let i = answers.findIndex(a => a.id === question.id);

    if (answers[i].text === question.correct) {
      return { answer: 'Correct', points: 1 };
    } else return { answer: 'Incorrect', points: 0 };
  };

  return (
    <div>
      {answers.length === 0 ? (
        <Redirect to={HOME} />
      ) : (
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
              {quiz.map((question, index) => {
                let { answer, points } = validateQuestion(question);
                score += points;

                return (
                  <tr key={index}>
                    <td>
                      <Nav.Link as={Link} to={`/${subject}/${index + 1}`}>
                        {index + 1}
                      </Nav.Link>
                    </td>
                    <td className={answer.toLowerCase()}>{answer}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h2>{`Score: ${score} / ${quiz.length}`}</h2>
        </div>
      )}
    </div>
  );
};

export default Results;
