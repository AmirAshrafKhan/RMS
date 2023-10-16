import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import "./modal.scss";
import CheckboxTitle from "components/checkbox-title";
import CommonButton from "components/common-button";
import OptionsLists from "OptionsLists";
import Select from "react-select";
import { apiBase } from "apiBase";
import { useNavigate, useLocation } from "react-router-dom";

const ExperienceModal = ({
  isConfirm,
  closeConfirm,
  setExperienceData,
  getDetails,
}) => {
  const navigate = useNavigate();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });
  const {
    fullName,
    jobDescription,
    position,

    currentCompany,

    functionalArea,
    role,
    industry,

    rating,
    joiningDate,

    course,
  } = formData;
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
    debugger;
    // Pass the form data to the parent component
    setExperienceData(formData);
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
          fullName,

          currentDesignation,

          currentCompany,
        } = response.data.data;
        setFormData({
          ...formData,
          fullName: fullName,

          currentDesignation: currentDesignation,

          currentCompany: currentCompany,
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
      debugger;
      try {
        const response = await apiBase.post(
          `profile/add-experience/${profileID}`,
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
  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

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
            <textarea
              required
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Enter a description About your company"
              onResize={false}
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="formGridText">
            <Form.Label>Current Designation</Form.Label>
            <Select
              className="select"
              options={OptionsLists.optionList("jobCategorization")}
              placeholder=" Search & select designation"
              name="position"
              // onChange={handleInputChange}

              value={OptionsLists.optionList("jobCategorization").filter(
                function (option) {
                  return option.value === formData.position;
                }
              )}
              // defaultValue={formData?.currentDesignation}
              onChange={handleDropDown}
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
        <CommonButton
          onClick={closeConfirm ? handleUpdate : handleSubmit}
          title="Save Changes"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ExperienceModal;
