import React, { useState } from "react";
import "./modal.scss";
import { Col, Form, Modal, Row } from "react-bootstrap";
import CommonButton from "components/common-button";
import axios from "axios";
import { apiBase } from "apiBase";
import OptionsLists from "OptionsLists";
import Select from "react-select";

import { useNavigate, useLocation } from "react-router-dom";

const EducationModal = ({
  isConfirm,
  closeConfirm,
  setEducationData,
  getDetails,
}) => {
  const navigate = useNavigate();
  // const [collegeName, setCollegeName] = useState("");
  const [validated, setValidated] = useState(false);

  const [year, setYear] = useState("");
  // const [city, setCity] = useState("");

  const [formData, setFormData] = useState({
    institution: "",
    city: "",
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    course: "",
    joiningDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data to the parent component
    setEducationData(formData);
    // Close the modal
    closeConfirm();
  };

  const { collegeName, city, course, joiningDate, startDate, endDate } =
    formData;
  const location = useLocation();
  const { profileID } = location.state !== null && location.state;
  // const handleSaveChanges = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const response = await axios.post(
  //       // "https://talenthiring.in/rms/api/createProfileEducation",
  //       // "https://rms-buzzhiring.onrender.com/rms/api/createProfileEducation",
  //       "https://rms-buzzhiring.onrender.com/rms/api/createProfileEducation",

  //       {
  //         collegeName,
  //         course,
  //         year,
  //         city,
  //       },
  //       {
  //         headers: headers,
  //       }
  //     );

  //     if (response.status === 200) {
  //       console.log("Education added successfully:", response.data);
  //       setEducationData(response.data);
  //       closeConfirm();
  //     } else {
  //       console.error("Error adding education:", response.data);
  //       // Handle other status codes if needed
  //     }
  //   } catch (error) {
  //     console.error("Error adding education:", error);
  //   }
  // };

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
          course,
          collegeName,

          city,
          startDate,
          endDate,
        } = response.data.data;
        setFormData({
          ...formData,
          collegeName: collegeName,

          course: course,
          startDate: startDate,
          endDate: endDate,
          city: city,
        });
        // console.log(getKeyByValue(response.data.data,formData),'Keysss')
      }
    } catch (error) {
      debugger;
      console.log(error);
    }
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
          `profile/academicsEducation-add/${profileID}`,
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

  return (
    <Modal
      show={isConfirm}
      onHide={closeConfirm}
      centered
      size="md"
      className="global-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Education</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" as={Col} controlId="formGridText">
            <Form.Label>College Name </Form.Label>

            <textarea
              type="text"
              required
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="College Name "
              onResize={false}
              name="collegeName"
              value={collegeName}
              onChange={handleInputChange}
              // ########

              // ########
              // onChange={(e) => setCollegeName(e.target.value)}
            />
            {/* <Form.Control
              type="text"
              placeholder="year "
              value={year}
              onChange={(e) => setCollegeName(e.target.value)}
            /> */}
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridText">
            <Form.Label>Course</Form.Label>
            {/* <Select 
            type="text"
              className="select"
              options={OptionsLists.optionList("degree")}
              placeholder="  Select Course"
              name="course"
        
              value={OptionsLists.optionList("degree").filter(function (
                option
              ) {
                return option.value === course;
              })}
               onChange={(selectedOption) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  course: selectedOption.value,
                }))
              }
            /> */}
            <textarea
              type="text"
              required
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="enter course "
              onResize={false}
              name="course"
              value={course}
              onChange={handleInputChange}
              // onChange={(e) => setCollegeName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridText">
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
                  value={startDate?.substring(0, 10)}
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
                  value={endDate?.substring(0, 10)}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridText">
            <Form.Label>City</Form.Label>

            <textarea
              type="text"
              required
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="enter city"
              onResize={false}
              name="city"
              value={city}
              onChange={handleInputChange}
              // onChange={(e) => setCollegeName(e.target.value)}
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

export default EducationModal;
