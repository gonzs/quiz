import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <Jumbotron>
      <h1>Hello, Welcome to this QUIZ!</h1>
      <p>This is a simple quiz</p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </Jumbotron>
  );
};

export default Home;
