import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import ContactForm from '../ContactForm/ContactForm';

/**
 * Home Component
 */

export const Home = () => {
  const [learnMore, setLearnMore] = React.useState(false);

  const content = learnMore ? (
    <>
      <p>
        To enjoy the power of Quiz App you have to be logged.
        <br />
        Once you are login in, will see different trivias ready to be solved.
        <br />
        Good Luck!!!
        <br />
        <br />
        <br />
        ***NOTES***
        <ul> - Admin users are only able to create new trivias.</ul>
        <ul> - All user can display all trivias.</ul>
        <br />
        <b>We are working to add new features. Stay tuned for more updates!</b>
      </p>
      <ContactForm />
    </>
  ) : (
    <p>
      <Button variant="secondary" onClick={() => setLearnMore(!learnMore)}>
        Learn more
      </Button>
    </p>
  );

  return (
    <Jumbotron>
      <h1>Hello, Welcome to this Quiz App!</h1>
      <br />
      <h4>This is just a quiz</h4>
      <br />
      {content}
    </Jumbotron>
  );
};
