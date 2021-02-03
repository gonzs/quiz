import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import hooks from '../../Hooks';
import { NavButtons } from '../Buttons/';
import './Question.css';

/**
 * Show Question
 */

export const Question = () => {
  // * Get Navigation data
  const { id } = hooks.useNavigation();
  // * Get current question
  const question = hooks.useQuestion(id);
  // * Get current subject
  const { subject } = hooks.useQuizData();

  // * Get cached answer
  const { retrievedAnswer } = hooks.useRetrieveAnswer(id);
  // * Answer local state
  const [answer, setAnswer] = useState(() => {
    if (retrievedAnswer.length !== 0) return retrievedAnswer[0].text;
  });
  // * Save Answer event
  const saveAnswer = hooks.useSaveAnswer(retrievedAnswer, question, answer);

  // Render if there is not question
  if (question === undefined) return <Redirect to={`${subject}`} />;

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

      <NavButtons subject={subject} saveAnswer={saveAnswer} />
    </Card>
  );
};
