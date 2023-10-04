import React, { useState } from "react";
import "./modal.scss";
import Select from "react-select";
import { Col, Form, Modal, Row } from "react-bootstrap";
import CommonButton from "components/common-button";
import CheckboxTitle from "components/checkbox-title";

const ManageQuestionaireModal = ({ isConfirm, closeConfirm }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
      <Modal
        show={isConfirm}
        onHide={closeConfirm}
        centered
        size="lg"
        className="global-modal"
      >
        <Modal.Header closeButton>
          <div className="left">
            <Modal.Title>Add New Questionaire</Modal.Title>
            <p>
              Enter Questions You want Candidate to answer at time of applying
            </p>
          </div>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col lg={4} md={4} className="mb-2">
                <h6>Name Of Questionaire:</h6>
              </Col>
              <Col lg={8} md={8} className="mb-2">
                <Form.Group className="mb-3" as={Col} controlId="formGridText">
                  <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="Kaiful"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Name.
                  </Form.Control.Feedback>
                  <CheckboxTitle title="Share Will Make the Questionaire Visible/usable for everyone" />
                </Form.Group>
              </Col>

              <Col lg={4} md={4} className="mb-2">
                <h6>Use Existing Questionaire:</h6>
              </Col>
              <Col lg={8} md={8} className="mb-2">
                <Form.Group className="mb-3" as={Col} controlId="formGridText">
                  <Select
                    className="select"
                    options={options}
                    placeholder="Select Questionaire"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="question">
              <h4>Add New Question</h4>
              <Form.Group className="mb-3" as={Col} controlId="formGridText">
                <Form.Label>Enter Your Question </Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Enter Your Question "
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Your Question.
                </Form.Control.Feedback>
                <CheckboxTitle title="Mandatory Question" />
              </Form.Group>
            </div>

            <div className="types">
              <h6>Choose Answer Type</h6>
              <div className="check">
                <Form.Check
                  inline
                  label="Radio"
                  name="group1"
                  type="radio"
                  id="inline-radio-1"
                />
                <Form.Check
                  inline
                  label="Check Box"
                  name="group1"
                  type="radio"
                  id="inline-radio-2"
                />
                <Form.Check
                  inline
                  label="Custom List "
                  name="group1"
                  type="radio"
                  id="inline-radio-3"
                />

                <Form.Check
                  inline
                  label="Text Area"
                  name="group1"
                  type="radio"
                  id="inline-radio-4"
                />
              </div>
            </div>

            <Row>
              <Col lg={6} md={6} className="mb-3">
                <Form.Group controlId="formGridText">
                  <Form.Label>Enter Your Answers </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Answers "
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Your Answers.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col lg={6} md={6} className="mb-3">
                <Form.Group controlId="formGridText">
                  <Form.Label>Enter Your Answers </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Answers "
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Your Answers.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <CommonButton type="submit" title="Add this Questionaire" />
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageQuestionaireModal;
