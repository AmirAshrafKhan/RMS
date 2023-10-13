import React, { useState, useEffect } from "react";
import "./addprofile-popup.scss";
import "../profile/add-profile/addprofile.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import UploadProfile from "components/upload-profile";
import CommonButton from "components/common-button";
import { iconProfile, iconResume } from "assets/images";
import { apiBase } from "apiBase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OptionsLists from "OptionsLists";

const AddProfilePopup = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const navigate = useNavigate();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [validated, setValidated] = useState(false);
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
        setProfileDetails(response.data.data);
        const {
          fullName,
          email,
          phone,
          currentDesignation,
          workExperience,
          currentCompany,
          currentCTC,
        } = response.data.data;
        setFormData({
          ...formData,
          fullName: fullName,
          email: email,
          phone: phone,
          currentDesignation: currentDesignation,
          workExperience: workExperience.years,
          currentCompany: currentCompany,
          currentCTC: currentCTC,
        });
        // console.log(getKeyByValue(response.data.data,formData),'Keysss')
      }
    } catch (error) {
      debugger;
      console.log(error);
    }
  };
  console.log(profileDetails, "response of profile");
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
                            placeholder="Enter  Name"
                            name="fullName"
                            value={fullName}
                            onChange={handleChange}
                          />
                          {/* {profileDetails?.fullName} */}
                          <Form.Control.Feedback type="invalid">
                            value={profileDetails?.fullName}
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
                          {profileDetails?.jobDescription}
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
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={email}
                        required
                        type="text"
                        placeholder="Please enter email address"
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
                          value={workExperience.years}
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
                          options={OptionsLists.optionList(
                            "minimumWorkExperience"
                          )}
                          placeholder=" 
                          select month"
                          name="months"
                          value={workExperience.months}
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
                      value={currentCompany}
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
                          value={currentCTC.lakhs}
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
                          value={currentCTC.thousands}
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
                    <Form.Label>Prefered City</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("jobLocation")}
                      placeholder="Search & select city  "
                      name="preferredCity"
                      value={preferredCity}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          preferredCity: selectedOption.value,
                        }))
                      }
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
                          value={expectedCTC.lakhs}
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
                          options={OptionsLists.optionList("jobLocation")}
                          placeholder="select thousands"
                          name="jobLocation"
                          value={expectedCTC.thousands}
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
                      options={OptionsLists.optionList("jobLocation")}
                      placeholder="Search & select city  "
                      name="preferredCity"
                      value={preferredCity}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          preferredCity: selectedOption.value,
                        }))
                      }
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
                      value={functionalArea}
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
                      value={role}
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
                      value={industry}
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
                      value={keySkills}
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
                      value={selectedRequirements}
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
                    />
                  </Col>
                </Row>
                <div className="bottom-btn">
                  <CommonButton
                    title="Update"
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

export default AddProfilePopup;
