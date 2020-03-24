import React from 'react';
import '../App.css';
import { ButtonGroup, Button, Badge, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { AdmgerRoute } from '../routes';
import { data1, data2, data3 } from '../data';

const Admger = () => {
  let options = [];
  const { id } = useParams();
  const prevId = Number(id) - 1;
  const nextId = Number(id) + 1;

  console.log(id);

  let data;
  switch (id) {
    case '1':
      data = data1;
      break;
    case '2':
      data = data2;
      break;
    case '3':
      data = data3;
      break;
    default:
      break;
  }

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

export default Admger;
