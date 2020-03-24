import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Trivia from '../Trivia';
import { Spinner } from 'react-bootstrap';

const Admger = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  // TODO: Implement redux
  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:3000/admger')
        .then(res => res.json())
        .then(data => setData(data));
    }, 1000);
  }, []);

  return (
    <div>
      {data.length === 0 ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Trivia id={id} questions={data} />
      )}
    </div>
  );
};

export default Admger;
