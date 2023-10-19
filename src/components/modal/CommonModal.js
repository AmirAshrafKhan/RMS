import React, { useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import CommonButton from "components/common-button";


const CommonModal = ({ isConfirm, closeConfirm }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Modal
        show={isConfirm}
        onHide={closeConfirm}
        centered
        size="md"
        className="global-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" as={Col} controlId="formGridText">
              <Form.Label>Enter Name </Form.Label>
              <Form.Control type="text" placeholder="Enter Name" required />
              <Form.Control.Feedback type="invalid">
                Please Enter Name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" as={Col} controlId="formGridText">
              <Form.Label>Employer Description (Required)</Form.Label>
              <Form.Control as="textarea" rows={4} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Make Employer details anonymous"
                feedback="Enter anonymous details of your employer here to display in your job posts"
                feedbackType="invalid"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <CommonButton type="submit" title="Update" />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CommonModal;
