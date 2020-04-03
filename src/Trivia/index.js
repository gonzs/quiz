import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Button, Badge, Form } from 'react-bootstrap';
import { Link, useParams, Redirect, useRouteMatch } from 'react-router-dom';
import { saveAnswer } from '../Actions';

const Trivia = props => {
  const { id } = useParams();
  const question = useSelector(state => state.quiz.quiz[id - 1]);
  const pathData = useRouteMatch().path.split('/');
  const rootPath = `${pathData[0]}/${pathData[1]}`;
  const dispatch = useDispatch();
  const prevId = parseInt(id) - 1;
  const nextId = parseInt(id) + 1;
  const [answer, setAnswer] = useState();

  const saveAnswerEvent = () => {
    dispatch(saveAnswer({ id: id, text: answer }));
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
                  onClick={() => setAnswer(o.desc)}
                />
              ))
            ) : (
              <div>
                <Form.Label>Respuesta:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  cols="50"
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

export default Trivia;
