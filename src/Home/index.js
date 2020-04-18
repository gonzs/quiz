import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Jumbotron>
      <h1>Hello, Welcome to this QUIZ!</h1>
      <p>This is a simple quiz</p>
      <p>
        <Button variant="secondary">Learn more</Button>
      </p>
    </Jumbotron>
  );
};

export default Home;
