import React, { useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import "./modal.scss";
import CommonButton from "components/common-button";
import axios from "axios";

const ProjectModal = ({ isConfirm, closeConfirm, setProjectData }) => {
  const [collegeName, setCollegeName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [city, setCity] = useState("");
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "https://rms-buzzhiring.onrender.com/rms/api/createProfileEducation",
        {
          collegeName,
          course,
          year,
          city,
        },
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        console.log("Education added successfully:", response.data);
        setProjectData(response.data);
        closeConfirm();
      } else {
        console.error("Error adding education:", response.data);
        // Handle other status codes if needed
      }
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  return (
    <Modal
      show={isConfirm}
      onHide={closeConfirm}
      centered
      size="md"
      className="global-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Projects</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" as={Col} controlId="formGridText">
            <Form.Label>Project Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Project Name "
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridText">
            <Form.Label> Project Description</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Enter Project Description"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridText">
            <Form.Label> Project URL</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Enter Project URL "
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Form.Group>

          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CommonButton onClick={handleSaveChanges} title="Save Changes" />
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;
