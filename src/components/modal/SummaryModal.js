import React, { useState, useEffect } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import CommonButton from "components/common-button";
import { useLocation, useNavigate } from "react-router-dom";
import { apiBase } from "apiBase";

const SummaryModal = ({ isConfirm, closeConfirm }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);

  const [formData, setFormData] = useState({ comment: "" });

  const { comment } = formData;

  const location = useLocation();
  const { profileID } = location.state !== null && location.state;
  useEffect(() => {
    console.log(profileID, "profileID");
    if (profileID !== undefined && profileID !== null) {
      editProfile();
    }
  }, []);

  const editProfile = async () => {
    setUpdateProfile(true);
    try {
      const response = await apiBase.get(`profile/details/${profileID}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setFormData(response.data.data);
        // console.log(getKeyByValue(response.data.data,formData),'Keysss')
      }
      console.log(response, "response of profile");

      setValidated(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleUpdate = async (event) => {
    console.log(formData, "formData expere");
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await apiBase.put(
          `profile/update/${profileID}`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          // history('/profile');
          navigate("/profile");
        }

        setValidated(false);
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
          <Modal.Title>Edit Summary</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" as={Col} controlId="formGridText">
              <Form.Label>Edit the summary below</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                required
                placeholder="enter summary"
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

export default SummaryModal;
