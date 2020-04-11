import React, { useState } from 'react';
import { ButtonGroup, Button, Badge, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { RESULTS } from '../constants/routes';
import {
  useNavigation,
  useRetrieveAnswer,
  useQuestion,
  useSaveAnswer,
  useQuizData,
} from './Logic';

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
    <div className="trivia">
      <h1>
        <Badge variant="secondary">{question.title}</Badge>
      </h1>

      <div>
        {question.options !== undefined && question.options.length !== 0 ? (
          question.options.map((o, index) => (
            <Form.Check
              key={index}
              id={o.option}
              name="options"
              type="radio"
              label={o.desc}
              checked={o.option === answer}
              onChange={() => setAnswer(o.option)}
            />
          ))
        ) : (
          <div>
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
      </div>

      <ButtonGroup>
        {!isFirst && (
          <Button as={Link} to={`/${subject}/${prevId}`} onClick={saveAnswer}>
            Previous
          </Button>
        )}

        {isLast ? (
          <Button as={Link} to={`/${subject + RESULTS}`} onClick={saveAnswer}>
            Submit
          </Button>
        ) : (
          <Button as={Link} to={`/${subject}/${nextId}`} onClick={saveAnswer}>
            Next
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

export default Question;
