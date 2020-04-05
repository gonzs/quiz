import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Button, Badge, Form } from 'react-bootstrap';
import { Link, useParams, Redirect, useRouteMatch } from 'react-router-dom';
import { saveAnswer } from '../Actions';

const Question = () => {
  const { id } = useParams();
  const question = useSelector(state => state.quiz.quiz[id - 1]);
  const pathData = useRouteMatch().path.split('/');
  const rootPath = `${pathData[0]}/${pathData[1]}`;
  const dispatch = useDispatch();
  const prevId = parseInt(id) - 1;
  const nextId = parseInt(id) + 1;
  const retrievedAnswer = useSelector(state =>
    state.quiz.answers.filter(o => o.id === question.id)
  );
  const [answer, setAnswer] = useState(() => {
    if (retrievedAnswer.length !== 0) return retrievedAnswer[0].text;
  });

  const saveAnswerEvent = () => {
    if (retrievedAnswer.length === 0 || answer !== retrievedAnswer[0].text)
      dispatch(saveAnswer({ id: question.id, text: answer }));
  };

  return (
    <div>
      {question === undefined ? (
        <Redirect to={rootPath} />
      ) : (
        <div className="main">
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
                  checked={o.desc === answer}
                  onChange={() => setAnswer(o.desc)}
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
                  onChange={event => setAnswer(event.target.value)}
                />
              </div>
            )}
          </div>

          <ButtonGroup>
            {parseInt(id) !== 1 ? (
              <Button
                as={Link}
                to={`${rootPath}/${prevId}`}
                onClick={() => saveAnswerEvent()}
              >
                Previous
              </Button>
            ) : (
              <span></span>
            )}
            {parseInt(id) === 3 ? (
              <Button onClick={() => saveAnswerEvent()}>Submit</Button>
            ) : (
              <Button
                as={Link}
                to={`${rootPath}/${nextId}`}
                onClick={() => saveAnswerEvent()}
              >
                Next
              </Button>
            )}
          </ButtonGroup>
        </div>
      )}
    </div>
  );
};

export default Question;
