import React, { useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import "./modal.scss";
import CheckboxTitle from "components/checkbox-title";
import CommonButton from "components/common-button";

const ExperienceModal = ({ isConfirm, closeConfirm, setExperienceData }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isCurrent: !prevFormData.isCurrent,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data to the parent component
    setExperienceData(formData);
    // Close the modal
    closeConfirm();
  };
  console.log(formData);
  return (
    <Modal
      show={isConfirm}
      onHide={closeConfirm}
      centered
      size="md"
      className="global-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Experience</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Col} className="mb-3" controlId="formGridText">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="formGridText">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formGridText">
            <Row>
              <Col sm={6} col={12} className="mb-3">
                <label className="mb-2" for="start">
                  Start date:
                </label>

                <input
                  className="date-input"
                  type="date"
                  id="start"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </Col>
              <Col sm={6} col={12} className="mb-3">
                <label className="mb-2" for="end">
                  End date:
                </label>

                <input
                  className="date-input"
                  type="date"
                  id="end"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="formGridText">
            <CheckboxTitle
              title="Current Working "
              checked={formData.isCurrent}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="primary" onClick={closeConfirm}>
          Save Changes
        </Button> */}
        <CommonButton onClick={closeConfirm} title="Save Changes" />
      </Modal.Footer>
    </Modal>
  );
};

export default ExperienceModal;
