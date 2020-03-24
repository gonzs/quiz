import React from 'react';
import { AdmgerRoute } from '../routes';
import { ButtonGroup, Button, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Trivia = ({ id, questions }) => {
  console.log(questions);
  const prevId = Number(id) - 1;
  const nextId = Number(id) + 1;
  let data;
  let options = [];

  data = questions[id - 1];

  switch (data.type) {
    case 'mc':
      options = data.options;
      break;
    case 'vof':
      options = [{ id: true, desc: 'Verdadero' }, { id: false, desc: 'Falso' }];
      break;

    default:
      break;
  }

  return (
    <div className="main">
      <h1>
        <Badge variant="secondary">{data.question}</Badge>
      </h1>

      <div>
        {options.length !== 0 ? (
          options.map((opt, index) => (
            <Form.Check
              key={index}
              id={opt.id}
              name="options"
              type="radio"
              label={opt.desc}
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
        {data.id !== 1 ? (
          <Button as={Link} to={`${AdmgerRoute}/${prevId}`}>
            Previous
          </Button>
        ) : (
          <span></span>
        )}
        {data.id === 3 ? (
          <Button>Submit</Button>
        ) : (
          <Button as={Link} to={`${AdmgerRoute}/${nextId}`}>
            Next
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

export default Trivia;
