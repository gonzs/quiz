import React, { useState } from 'react';
import { ButtonGroup, Button, Card, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { RESULTS } from '../Router/routes';
import {
  useNavigation,
  useRetrieveAnswer,
  useQuestion,
  useSaveAnswer,
  useQuizData,
} from './Model';
import './Trivia.css';

const Question = () => {
  // * Get Navigation data
  const { id, prevId, nextId, isFirst, isLast } = useNavigation();
  // * Get current question
  const question = useQuestion(id);
  // * Get current subject
  const { subject } = useQuizData();
  // * Get cached answer
  const { retrievedAnswer } = useRetrieveAnswer(id);
  // * Answer local state
  const [answer, setAnswer] = useState(() => {
    if (retrievedAnswer.length !== 0) return retrievedAnswer[0].text;
  });
  // * Save Answer event
  const saveAnswer = useSaveAnswer(retrievedAnswer, question, answer);

  // Render if there is not question
  if (question === undefined) return <Redirect to={subject} />;

  // Render Trivia
  return (
    <Card bg="light" text="dark">
      <Card.Header>{`# ${id}`}</Card.Header>
      <Card.Body>
        <Card.Title>{question.title}</Card.Title>

        {question.options !== undefined && question.options.length !== 0 ? (
          <div className="card-body-box">
            {question.options.map((opt, index) => (
              <Form.Check
                key={index}
                id={index + 1}
                name="options"
                type="radio"
                label={opt}
                checked={opt === answer}
                onChange={() => setAnswer(opt)}
              />
            ))}
          </div>
        ) : (
          <div className="card-body-box">
            <Form.Label>Respuesta:</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              cols="50"
              value={answer}
              onChange={event => setAnswer(event.target.value.toUpperCase())}
            />
          </div>
        )}
      </Card.Body>

      <ButtonGroup>
        {!isFirst ? (
          <Button
            variant="secondary"
            as={Link}
            to={`/${subject}/${prevId}`}
            onClick={saveAnswer}
          >
            Previous
          </Button>
        ) : (
          <Button variant="secondary" disabled>
            Previous
          </Button>
        )}

        {isLast ? (
          <Button
            variant="secondary"
            as={Link}
            to={`/${subject + RESULTS}`}
            onClick={saveAnswer}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="secondary"
            as={Link}
            to={`/${subject}/${nextId}`}
            onClick={saveAnswer}
          >
            Next
          </Button>
        )}
      </ButtonGroup>
    </Card>
  );
};

export default Question;
