import React, { useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import "./modal.scss";
import CommonButton from "components/common-button";
import axios from "axios";
import { apiBase } from "apiBase";
import { useNavigate, useLocation } from "react-router-dom";

const ProjectModal = ({
  isConfirm,
  closeConfirm,
  setProjectData,
  getDetails,
}) => {
  const [projectName, setprojectName] = useState("");
  const [description, setdescription] = useState("");
  const [projectUrl, setprojectUrl] = useState("");
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    projectUrl: "",
  });
  const location = useLocation();
  const { profileID } = location.state !== null && location.state;

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
    setProjectData(formData);
    // Close the modal
    closeConfirm();
  };
  const getProfileDetails = async () => {
    try {
      const response = await apiBase.get(`profile/details/${profileID}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      debugger;
      if (response.status === 200) {
        debugger;

        const {
          projectName,

          description,

          projectUrl,
        } = response.data.data;
        setFormData({
          ...formData,
          projectName: projectName,

          description: description,

          projectUrl: projectUrl,
        });
        // console.log(getKeyByValue(response.data.data,formData),'Keysss')
      }
      closeConfirm();
    } catch (error) {
      debugger;
      console.log(error);
    }
  };

  const handleDropDown = (data) => {
    let { value } = data;
    debugger;
    setFormData({ ...formData, position: value });
  };

  const handleUpdate = async (event) => {
    console.log(formData, "formData expere");
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
     
      try {
        const response = await apiBase.post(
          `profile/project-add/${profileID}`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          // history('/profile');
          // navigate("/profile");
          getDetails(profileID);
          closeConfirm();
        }

        setValidated(false);
      } catch (error) {
        console.log(error);
      }
    }

    setValidated(true);
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
              // type="text"

              // value={collegeName}
              // onChange={(e) => setCollegeName(e.target.value)}
              required
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Enter Project Name "
              onResize={false}
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridText">
            <Form.Label> Project Description</Form.Label>
            <Form.Control
              // type="text"

              // value={course}
              // onChange={(e) => setCourse(e.target.value)}
              required
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder=" Enter Project Description"
              onResize={false}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridText">
            <Form.Label> Project URL</Form.Label>
            <Form.Control
              // type="text"

              // onChange={(e) => setYear(e.target.value)}
              required
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder=" Enter Project URL "
              onResize={false}
              name="projectUrl"
              value={formData.projectUrl}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CommonButton
          onClick={closeConfirm ? handleUpdate : handleSubmit}
          title="Save Changes"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;
