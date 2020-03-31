import React from 'react';
import { useSelector } from 'react-redux';
import { ButtonGroup, Button, Badge, Form } from 'react-bootstrap';
import { Link, useParams, Redirect, useRouteMatch } from 'react-router-dom';

const Trivia = props => {
  const { id } = useParams();
  const question = useSelector(state => state.quiz.quiz[id - 1]);
  const pathData = useRouteMatch().path.split('/');
  const rootPath = `${pathData[0]}/${pathData[1]}`;

  const prevId = parseInt(id) - 1;
  const nextId = parseInt(id) + 1;
  let options = [];

  if (question !== undefined)
    switch (question.type) {
      case 'mc':
        options = question.options;
        break;
      case 'vof':
        options = [
          { option: '1', desc: 'Verdadero' },
          { option: '2', desc: 'Falso' },
        ];
        break;

      default:
        break;
    }

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
            {options.length !== 0 ? (
              options.map((o, index) => (
                <Form.Check
                  key={index}
                  id={o.option}
                  name="options"
                  type="radio"
                  label={o.desc}
                />
              ))
            ) : (
              <div>
                <Form.Label>Respuesta:</Form.Label>
                <Form.Control as="textarea" rows="4" cols="50" />
              </div>
            )}
          </div>

          <ButtonGroup>
            {question.id !== 1 ? (
              <Button as={Link} to={`${rootPath}/${prevId}`}>
                Previous
              </Button>
            ) : (
              <span></span>
            )}
            {question.id === 3 ? (
              <Button>Submit</Button>
            ) : (
              <Button as={Link} to={`${rootPath}/${nextId}`}>
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
