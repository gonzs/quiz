import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function ContactForm() {
  return (
    <form name="contact" method="post">
      <input type="hidden" name="form-name" value="contact" />
      <Row>
        <Col xs={3}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              name="email"
              type="email"
              placeholder="your@email.com"
            />
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
