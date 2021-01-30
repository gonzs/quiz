import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import hooks from '../../Hooks';

export const SignOut = () => {
  const signOutUser = hooks.useSignOut();
  const router = hooks.useRouter();
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleSignOut = () => {
    signOutUser();
    handleClose();
    router.push('/');
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleSignOut}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
