import React, { useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import CommonButton from "components/common-button";

const SkillsModal = ({ isConfirm, closeConfirm }) => {
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
          <Modal.Title>Edit Skills</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" as={Col} controlId="formGridText">
              <Form.Label>Add or Remove Skills</Form.Label>
              <Form.Control as="textarea" rows={1} required />
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

export default SkillsModal;
