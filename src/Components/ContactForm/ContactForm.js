import React from 'react';
// import { Button, Col, Form, Row } from 'react-bootstrap';

export default function ContactForm() {
  return (
    // <form name="contact" netlify>
    //   <Row>
    //     <Col xs={3}>
    //       <Form.Group controlId="formBasicEmail">
    //         <Form.Control type="email" placeholder="your@email.com" />
    //       </Form.Group>
    //     </Col>
    //     <Col>
    //       <Button variant="primary" type="submit">
    //         Send
    //       </Button>
    //     </Col>
    //   </Row>
    // </form>
    <form name="contact" method="POST" data-netlify="true">
      <p>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
      </p>
      <p>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message"></textarea>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  );
}
