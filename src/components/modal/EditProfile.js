import React, { useState } from "react";
import "./modal.scss";
import { Col, Form, Modal } from "react-bootstrap";
import CommonButton from "components/common-button";
import axios from "axios";
import { apiBase } from "apiBase";

const EditProfile = ({ isConfirm, closeConfirm }) => {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    });
    const {
      name,
      designation,
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
        const formData = new FormData();
       
        formData.append("name", name);
        formData.append("designation", designation);
      
        const response = await apiBase.put("my-profile/update",
          formData,
          {
            headers: {
              Authorization:localStorage.getItem("token"),
            },
          }
        );
        closeConfirm();

        console.log(response.data);

        setValidated(false);
      } catch (error) {
        console.log(error);
      }
     
    }

    setValidated(true);
  };
  return (
    <div>
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
            <p>
              <span>User Name:</span>harsh@spgrecriuter.com
            </p>
            <p>
              <span>Email Id :</span>harsh@spgrecriuter.com
            </p>
            <Form.Group className="mb-3" as={Col} controlId="formGridText">
              <Form.Label>Name </Form.Label>
              <Form.Control type="text" placeholder="Enter Name " required  name="name"
                  onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please Enter Name
              </Form.Control.Feedback>
            </Form.Group>
            <p>
              <span>Phone No. :</span>214161719101
            </p>
            <Form.Group className="mb-3" as={Col} controlId="formGridText">
              <Form.Label>Designation </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Designation"
                required
                name="designation"
                  onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please Enter Designation
              </Form.Control.Feedback>
            </Form.Group>

            <p>
              <span>Role:</span>recruiter
            </p>
            <p>
              <span>Reporting to:</span>harsh@spgrecriuter.com
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn" onClick={handleSubmit}  >Update</button>
            {/* <CommonButton type="submit" title="Update" /> */}
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EditProfile;
