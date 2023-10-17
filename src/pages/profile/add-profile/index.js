import React, { useEffect, useState } from "react";
import "./addprofile.scss";

import { Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import UploadProfile from "components/upload-profile";
import CommonButton from "components/common-button";
import { iconProfile, iconResume } from "assets/images";
import axios from "axios";
import OptionsLists from "OptionsLists";
import { useLocation, useNavigate } from "react-router-dom";
import { apiBase } from "apiBase";
import Cities from "./Cities";

const AddProfile = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    jobDescription: "",
    email: "",
    phone: "",
    currentDesignation: "",
    currentCompany: "",
    currentCTC: {},
    currentCTCLakhs: "",
    currentCTCThous: "",
    currentCity: "",
    expectedCTC: {},
    preferredCity: "",
    workExperience: {},
    functionalArea: "",
    role: "",
    industry: "",
    keySkills: [],
    selectedRequirements: [],
    comment: "",
    profile: null,
    resume: null,
    rating: "",
    joiningDate: "",
    lastModified: "",
    course: "",
    noticePeriod: "",
    educationDetails: {},
    employmentType: "Full Time",
    qualification: "",

    additionalDetails: {
      resumeProcessedBy: "Me",
      starRating: 4,
      candidateAge: 28,
    },
    affirmativeDetails: {
      category: "General",
      gender: "Male",
      specialAbilities: false,
    },
    showCandidatesSeeking: "Any Job",
    showOnlyWith: {},
  });

  const {
    showOnlyWith,
    showCandidatesSeeking,
    affirmativeDetails,
    fullName,
    jobDescription,
    email,
    phone,
    qualification,
    currentDesignation,
    currentCompany,
    currentCTC,
    currentCity,
    expectedCTC,
    preferredCity,
    workExperience,
    functionalArea,
    role,
    industry,
    keySkills,
    selectedRequirements,
    comment,
    // profile,
    // resume,
    rating,
    joiningDate,
    lastModified,
    course,
    noticePeriod,
    educationDetails,
    employmentType,
  } = formData;

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

  function getKeyByValue(object) {
    return Object.keys(object).find((key) => object[key]);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "keySkills") {
      setFormData((prevData) => ({
        ...prevData,
        keySkills: [...keySkills, value],
      }));
    } else if (name === "selectedRequirements") {
      setFormData((prevData) => ({
        ...prevData,
        selectedRequirements: [...selectedRequirements, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profile: file,
    }));
  };

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      resume: file,
    }));
  };

  const handleSubmit = async (event) => {
    console.log(formData, "formData expere");
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await apiBase.post("profile/add", formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        navigate("/profile");

        setValidated(false);
      } catch (error) {
        console.log(error);
      }
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

  const options = [
    { value: "2", label: "years" },
    { value: "4", label: "years" },
    { value: "vanilla", label: "Vanilla" },
  ];
  // consoles

  const cityOptions = Cities.map((city) => ({
    value: city.id,
    label: `${city.name}, ${city.state}`,
  }));

  return (
    <>
      <section className="add-profile section-padding">
        <Container>
          <div className="profile-details">
            <div className="details-box">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h4>Please Fill up the Profile Details</h4>
                <Row className="input-border">
                  <Col lg={6} md={6}>
                    <Row>
                      <Col lg={12} md={12} className="desktop">
                        <Form.Group as={Col} controlId="formGridText">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Enter requirement title "
                            name="fullName"
                            value={fullName}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Enter requirement title
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col lg={12} md={12} className="desktop">
                        <Form.Label>Job Description (Required)</Form.Label>

                        <textarea
                          required
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="6"
                          placeholder="Enter a description..."
                          onResize={false}
                          name="jobDescription"
                          value={jobDescription}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter a description...
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="desktop" lg={6} md={6}>
                    <UploadProfile
                      icon={iconProfile}
                      title="Upload photo"
                      description="Please upload a picture of the candidate"
                      text="Upload"
                      onChange={handleProfileChange}
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Please enter email address"
                        name="email"
                        value={email}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter email address
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Please enter phone number"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter phone number
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Current Designation</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("jobCategorization")}
                      placeholder=" Search & select designation"
                      name="currentDesignation"
                      value={OptionsLists.optionList(
                        "jobCategorization"
                      ).filter(function (option) {
                        return option.value === currentDesignation;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          currentDesignation: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col lg={6} md={6}>
                    <Row>
                      <Col className="desktop" lg={6} md={6}>
                        <Form.Label>Work Expirence</Form.Label>
                        {console.log(workExperience.years, "workssds")}
                        {console.log(
                          OptionsLists.optionList(
                            "minimumWorkExperience"
                          ).filter(function (option) {
                            return option;
                          }),
                          "asd"
                        )}
                        <Select
                          className="select"
                          options={OptionsLists.optionList(
                            "minimumWorkExperience"
                          )}
                          placeholder=" select year"
                          name="years"
                          value={OptionsLists.optionList(
                            "minimumWorkExperience"
                          ).filter(function (option) {
                            return option.value === workExperience.years;
                          })}
                          onChange={(selectedOption) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              workExperience: {
                                years: selectedOption.value,
                                ...workExperience,
                              },
                            }))
                          }
                        />
                      </Col>

                      <Col className="desktop" lg={6} md={6}>
                        <Form.Label className="expirence"></Form.Label>
                        <Select
                          className="select"
                          options={OptionsLists.optionList("monthsExperience")}
                          placeholder=" 
                          select month"
                          name="months"
                          value={OptionsLists.optionList(
                            "monthsExperience"
                          ).filter(function (option) {
                            return option.value === workExperience.months;
                          })}
                          onChange={(selectedOption) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              workExperience: {
                                months: selectedOption.value,
                                ...workExperience,
                              },
                            }))
                          }
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Current Company</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("jobLocation")}
                      placeholder=" Select Company"
                      name="currentCompany"
                      value={OptionsLists.optionList("jobLocation").filter(
                        function (option) {
                          return option.value === currentCompany;
                        }
                      )}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          currentCompany: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col lg={6} md={6}>
                    <Row>
                      <Col className="desktop" lg={6} md={6}>
                        <Form.Label>Current CTC</Form.Label>
                        <Select
                          className="select"
                          options={OptionsLists.optionList("annualCTC")}
                          placeholder="  select lakhs"
                          name="currentCTCLakhs"
                          // value={currentCTC.lakhs}
                          value={OptionsLists.optionList("annualCTC").filter(
                            function (option) {
                              return option.value === currentCTC.lakhs;
                            }
                          )}
                          onChange={(selectedOption) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              currentCTC: {
                                lakhs: selectedOption.value,
                                ...currentCTC,
                              },
                            }))
                          }
                        />
                      </Col>

                      <Col className="desktop" lg={6} md={6}>
                        <Form.Label className="expirence"></Form.Label>
                        <Select
                          className="select"
                          options={OptionsLists.optionList("thousands")}
                          placeholder=" select thousands"
                          name="currentCTCThous"
                          value={OptionsLists.optionList("thousands").filter(
                            function (option) {
                              return option.value === currentCTC.thousands;
                            }
                          )}
                          onChange={(selectedOption) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              currentCTC: {
                                thousands: selectedOption.value,
                                ...currentCTC,
                              },
                            }))
                          }
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Current City</Form.Label>
                    <Select
                      className="select"
                      options={cityOptions}
                      placeholder="Select a city"
                    />
                  </Col>

                  <Col lg={6} md={6}>
                    <Row>
                      <Col className="desktop" lg={6} md={6}>
                        <Form.Label>Expected CTC</Form.Label>
                        <Select
                          className="select"
                          options={OptionsLists.optionList("annualCTC")}
                          placeholder="select lakhs"
                          name="lakhs"
                          value={OptionsLists.optionList("annualCTC").filter(
                            function (option) {
                              return option.value === expectedCTC.lakhs;
                            }
                          )}
                          onChange={(selectedOption) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              expectedCTC: {
                                lakhs: selectedOption.value,
                                ...expectedCTC,
                              },
                            }))
                          }
                        />
                      </Col>

                      <Col className="desktop" lg={6} md={6}>
                        <Form.Label className="expirence"></Form.Label>
                        <Select
                          className="select"
                          options={OptionsLists.optionList("thousands")}
                          placeholder="select thousands"
                          name="thousands"
                          value={OptionsLists.optionList("thousands").filter(
                            function (option) {
                              return option.value === expectedCTC.thousands;
                            }
                          )}
                          onChange={(selectedOption) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              expectedCTC: {
                                thousands: selectedOption.value,
                                ...expectedCTC,
                              },
                            }))
                          }
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Prefered City</Form.Label>
                    <Select
                      className="select"
                      options={cityOptions}
                      placeholder="Select a city"
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Functional Area</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("jobCategorization")}
                      placeholder="
                      Search & select functional area (e.i  Product management)"
                      name="functionalArea"
                      value={OptionsLists.optionList(
                        "jobCategorization"
                      ).filter(function (option) {
                        return option.value === functionalArea;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          functionalArea: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Role</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("jobCategorization")}
                      placeholder="
                      Search & select role "
                      name="role"
                      value={OptionsLists.optionList(
                        "jobCategorization"
                      ).filter(function (option) {
                        return option.value === role;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          role: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Industry</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("jobCategorization")}
                      placeholder="
                      Search & select industry "
                      name="industry"
                      value={OptionsLists.optionList(
                        "jobCategorization"
                      ).filter(function (option) {
                        return option.value === industry;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          industry: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Key Skill</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("previousRequirements")}
                      placeholder=" Search & select requirements from the list"
                      name="keySkills"
                      value={OptionsLists.optionList(
                        "previousRequirements"
                      ).filter(function (option) {
                        return option.value === keySkills;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          keySkills: selectedOption.value,
                        }))
                      }
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={6} className="desktop">
                    <Form.Label>Select requirement</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("previousRequirements")}
                      placeholder="Search & select requirements from the list"
                      name="selectedRequirements"
                      value={OptionsLists.optionList(
                        "previousRequirements"
                      ).filter(function (option) {
                        return option.value === selectedRequirements;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          selectedRequirements: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col lg={6} md={6} className="desktop">
                    <CommonButton title="+ Add New Requirement" />
                  </Col>
                </Row>

                <Row>
                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Comment </Form.Label>

                    <textarea
                      required
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="8"
                      placeholder="Enter"
                      name="comment"
                      value={comment}
                      onChange={handleChange}
                      onResize={false}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter
                    </Form.Control.Feedback>
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <UploadProfile
                      icon={iconResume}
                      title="Upload Resume"
                      description="Please upload resume of the candidate"
                      text="Upload"
                      onChange={handleResumeChange}
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Rating</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("rating")}
                      placeholder="  select rating"
                      name="rating"
                      value={OptionsLists.optionList("rating").filter(function (
                        option
                      ) {
                        return option.value === rating;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          rating: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Joining Date</Form.Label>
                    <Select
                      type="date"
                      className="select"
                      options={OptionsLists.optionList("Date")}
                      placeholder="  select joining Date"
                      value={OptionsLists.optionList("Date").filter(function (
                        option
                      ) {
                        return option.value === joiningDate;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          joiningDate: selectedOption.value,
                        }))
                      }

                    
                      // // max="2030-12-31"
                      // name="joiningDate"
                      // value={joiningDate}
                      // onChange={(e) => {
                      //   setFormData((prevFormData) => ({
                      //     ...prevFormData,
                      //     joiningDate: e.target.value,
                      //   }));
                      // }}
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Last Modified</Form.Label>
                    <Select
                      type="date"
                      className="select"
                      options={OptionsLists.optionList("Date")}
                      placeholder="  select last Modified Date"
                      name="lastModified"
                      value={OptionsLists.optionList("Date").filter(function (
                        option
                      ) {
                        return option.value === lastModified;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          lastModified: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Course</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("degree")}
                      placeholder="  select course"
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
                    />
                  </Col>
                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Notice Period</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("NP")}
                      placeholder="  select noticePeriod"
                      name="noticePeriod"
                      value={OptionsLists.optionList("NP").filter(function (
                        option
                      ) {
                        return option.value === noticePeriod;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          noticePeriod: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Qualification</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList(
                        "educationQualification"
                      )}
                      placeholder="  Select Qualification"
                      name="educationQualification"
                      value={OptionsLists.optionList(
                        "educationQualification"
                      ).filter(function (option) {
                        return option.value === qualification;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          qualification: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  {/* <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Employment Type</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("employmentType")}
                      placeholder="  select employment Type"
                      name="employmentType"
                      value={OptionsLists.optionList("employmentType").filter(
                        function (option) {
                          return option.value === employmentType;
                        }
                      )}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          employmentType: selectedOption.value,
                        }))
                      }
                    />
                  </Col> */}
                </Row>
                <div className="bottom-btn">
                  <CommonButton
                    title={
                      updateProfile ? " Update Profile" : " Add New Profile"
                    }
                    type="button"
                    onClick={updateProfile ? handleUpdate : handleSubmit}
                  />
                </div>
              </Form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AddProfile;
