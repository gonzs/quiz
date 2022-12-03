import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function ContactForm() {
  return (
    <form name="contact" method="POST" data-netlify="true">
      <Row>
        <Col xs={3}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="your@email.com" />
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Col>
      </Row>
    </form>
  );
}
