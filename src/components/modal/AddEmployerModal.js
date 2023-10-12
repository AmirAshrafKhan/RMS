import React, { useState } from "react";
import "./modal.scss";
// import Select from "react-select";
import { Col, Form, Modal } from "react-bootstrap";
import CommonButton from "components/common-button";
import axios from "axios";
import { apiBase } from "apiBase";
// import CheckboxTitle from "components/checkbox-title";

const AddEmployerModal = ({ isConfirm, closeConfirm }) => {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    employerName: "",
    employerDescription: "",
    addedOrUpdatedOn:"addedOrUpdatedOn"
    });
    const {
      employerName,
      employerDescription,
      addedOrUpdatedOn,
    } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
      event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      try {
        // Prepare the request data
        // const formData = new FormData();
       
        // formData.append("employerName", employerName);
        // formData.append("employerDescription", employerDescription);
      
        const response = await apiBase.post("employer/add",
          formData,
          {
            headers: {
              Authorization:localStorage.getItem("token"),
            },
          }
        );
        setValidated(false)
        closeConfirm()

        console.log(response.data);

      } catch (error) {
        console.log(error);
      }
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
          <Modal.Title>Add New Employer</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} 
        // onSubmit={handleSubmit}
        >
          <Modal.Body>
            <Form.Group className="mb-3" as={Col} controlId="formGridText">
              <Form.Label>Employer Name </Form.Label>
              <Form.Control type="text" placeholder="College Name " required  name="employerName"
                  onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" as={Col} controlId="formGridText">
              <Form.Label>Employer Description (Required)</Form.Label>
              <Form.Control as="textarea" rows={4} required name="employerDescription"
                  onChange={handleChange}/>
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
            <CommonButton type="button" title="Add this Employer" onClick={handleSubmit}/>
            {/* <button className="btn" onClick={handleSubmit}>
      </button> */}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddEmployerModal;
