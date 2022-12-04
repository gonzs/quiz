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
    <form name="contact" method="post">
      <input type="hidden" name="form-name" value="contact" />
      <p>
        <label>
          Your Name: <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Your Email: <input type="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Message: <textarea name="message"></textarea>
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  );
}
