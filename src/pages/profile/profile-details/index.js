import React, { useState, useEffect, uselo } from "react";
import "./profiledetails.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import Heading from "components/heading";
import {
  IconDelete,
  iconDocument,
  iconDowndash,
  iconEdit,
  iconForward,
  iconRequirements,
  iconStatus,
} from "assets/images";
import CommonButton from "components/common-button";
import EducationModal from "components/modal/EducationModal";
import ExperienceModal from "components/modal/ExperienceModal";
import ProjectModal from "components/modal/ProjectModal";
import CommonModal from "components/modal/CommonModal";
import CommonDeletModal from "components/modal/CommonDeletModal";
import { allRoutes } from "constants/allRoutes";
import { Link, useLocation } from "react-router-dom";
import { apiBase } from "apiBase";
// import AddprofilePopup from "pages/addprofile-popup";
import axios from "axios";

const ProfileDetails = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const [isEducation, setIsEducation] = useState(false);
  const [isExperience, setIsExperience] = useState(false);
  const [isProject, setIsProject] = useState(false);
  let [experienceData, setExperienceData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [summary, setsummary] = useState("");
  const location = useLocation();
  const { profileID } = location.state !== null && location.state;

  useEffect(() => {
    console.log(profileID, "profileID");
    if (profileID !== undefined && profileID !== null) {
      getProfileDetails();
    }
  }, []);

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
        // console.log(getKeyByValue(response.data.data,formData),'Keysss')
      }
    } catch (error) {
      debugger;
      console.log(error);
    }
  };
  console.log(profileDetails, "response of profile");

  // experience data
  const handleExperienceData = async (formData) => {
    try {
      const response = await axios.post(
        "https://rms-buzzhiring.onrender.com/rms/api/createProfileExperience",
        {
          profileId: formData.profileId,
          experience: formData.experience,
          totalExperience: formData.totalExperience,
        }
      );
      console.log("Work experience added successfully:", response.data);
    } catch (error) {
      console.error("Error adding work experience:", error);
    }
  };
  // education data
  const handleEducationData = async (formData) => {
    try {
      const response = await axios.post(
        "https://rms-buzzhiring.onrender.com/rms/api/createProfileEducation",
        {
          profile_id: formData.profileId,
          school_name: formData.schoolName,
          board_type: formData.boardType,
          passing_year: formData.passingYear,
          grade: formData.grade,
        }
      );
      console.log("Education added successfully:", response.data);
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };
  // project Data
  const handleProjectData = async (formData) => {
    try {
      const response = await axios.post(
        "rms-buzzhiring.onrender.com/rms/api/createProfileEducation",
        {
          profile_id: formData.profileId,
          school_name: formData.schoolName,
          board_type: formData.boardType,
          passing_year: formData.passingYear,
          grade: formData.grade,
        }
      );
      console.log("Education added successfully:", response.data);
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };
  const [isSummary, setIsSummary] = useState(false);
  const [isWork, setIsWork] = useState(false);
  const [isAcademics, setIsAcademics] = useState(false);
  const [isSkills, setIsSkills] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [isDelete1, setIsDelete1] = useState(false);
  const [isDelete2, setIsDelete2] = useState(false);
  const [isDelete3, setIsDelete3] = useState(false);
  // const [isDelete3, setIsDelete3] = useState(false);

  function handleEducation() {
    setIsEducation(!isEducation);
  }
  function handleExperience() {
    setIsExperience(!isExperience);
  }
  function handleProject() {
    setIsProject(!isProject);
  }
  function handleSummary(value) {
    setsummary(value);
    setIsSummary(!isSummary);
  }
  function handleWork() {
    setIsWork(!isWork);
  }
  function handleAcademics() {
    setIsAcademics(!isAcademics);
  }
  function handleSkills() {
    setIsSkills(!isSkills);
  }
  function handleDetails() {
    setIsDetails(!isDetails);
  }
  function handleDelete1() {
    setIsDelete1(!isDelete1);
  }

  function handleDelete2() {
    setIsDelete2(!isDelete2);
  }

  function handleDelete3() {
    setIsDelete3(!isDelete3);
  }
  //

  return (
    <>
      <section className="profile-details section-padding">
        <Container>
          <div className="box">
            <div className="title">
              <Heading
                title="Profile"
                description="Add new requirement by filling out this form"
              />
              <div className="top-bar">
                <button>
                  <img src={iconDowndash} alt="" />
                  <span>Download</span>
                </button>
                <button>
                  <img src={iconForward} alt="" />
                  <span>Forward</span>
                </button>

                <button>
                  <img src={iconStatus} alt="" />
                  <span>Change Status</span>
                </button>

                <button>
                  <img src={iconRequirements} alt="" />
                  <span>Add to Requirements</span>
                </button>
              </div>
            </div>

            <Row>
              <Col lg={9} md={8}>
                <div className="item details">
                  <div className="edit-image">
                    <Link
                      to={allRoutes.addProfilePopup}
                      state={{ profileID: profileDetails._id }}
                      className="icon-hover"
                    >
                      <img src={iconEdit} alt="" />
                    </Link>
                  </div>
                  <Row>
                    <Col lg={6} md={6}>
                      <div className="details-content">
                        <ul>
                          <li>
                            <span>Experience:</span>{" "}
                            {profileDetails?.workExperience?.years} Year(s){" "}
                            {profileDetails?.workExperience?.months} Month (s)
                          </li>
                          <li>
                            <span>Current Designation: </span>{" "}
                            {profileDetails?.currentDesignation}
                          </li>

                          <li>
                            <span>Current Company: </span>
                            {profileDetails?.currentCompany}
                          </li>
                          <li>
                            <span>Previous Designation: </span>Sr. Software
                            Developer
                          </li>
                          <li>
                            <span>Previous Company:</span> Sr. Software
                            Developer
                          </li>
                          <li>
                            <span>Functional Area :</span>{" "}
                            {profileDetails?.functionalArea}
                          </li>
                          <li>
                            <span>Industry:</span>
                            {profileDetails?.industry}
                          </li>
                        </ul>
                      </div>
                    </Col>

                    <Col lg={6} md={6}>
                      <div className="details-content">
                        <ul>
                          <li>
                            <span>Current Location: </span>
                            {profileDetails?.currentCity}
                          </li>
                          <li>
                            <span>Pref Location: </span>{" "}
                            {profileDetails?.preferredCity}
                          </li>

                          <li>
                            <span>Education:</span>
                            {profileDetails.industry}
                          </li>
                          <li>
                            <span>Phone No. :</span>
                            {profileDetails?.phone}
                          </li>
                          <li>
                            <span>Email:</span> {profileDetails?.email}
                          </li>
                        </ul>
                      </div>
                    </Col>

                    <div className="details-content">
                      <ul>
                        <li className="mt-2">
                          <span>Key Skills:</span>
                          {profileDetails.keySkills}
                        </li>
                      </ul>
                    </div>
                  </Row>

                  <div className="applied">
                    <ul>
                      <li>
                        <span>Applied on:</span> 30th July 22
                      </li>
                      <li>|</li>
                      <li>
                        <span>Active:</span> 30th July 22
                      </li>
                      <li>|</li>
                      <li>
                        <span>Modified:</span> {profileDetails?.lastModified}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="item summary">
                  <div className="title">
                    <h5>Summary</h5>
                    <button
                      className="icon-hover"
                      onClick={() => handleSummary(profileDetails?.comment)}
                      href="/"
                    >
                      <img src={iconEdit} alt="" />
                    </button>
                  </div>

                  <div className="content">{profileDetails?.comment}</div>
                </div>

                <div className="item work">
                  <div className="title">
                    <h5>Work Experience</h5>
                    <CommonButton onClick={handleExperience} title="+ Add" />
                  </div>
                  <div className="content">
                    <div className="left">
                      <p>
                        {profileDetails?.workExperience?.years} Year(s){" "}
                        {profileDetails?.workExperience?.months} Month (s)
                      </p>
                      <p>Team Leader | Jan 2021 To Jun 2022</p>
                    </div>
                    <div className="right">
                      <button
                        className="icon-hover"
                        onClick={handleDelete1}
                        href="/"
                      >
                        <img src={IconDelete} alt="" />
                      </button>

                      <button
                        className="icon-hover"
                        onClick={handleWork}
                        href="/"
                      >
                        <img src={iconEdit} alt="" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="item work education">
                  <div className="title">
                    <h5>Academics (Education)</h5>
                    <CommonButton title="+ Add" onClick={handleEducation} />
                  </div>
                  <div className="content">
                    <div className="left">
                      <span>{profileDetails.course}</span>
                    </div>
                    <div className="right">
                      <button
                        className="icon-hover"
                        onClick={handleDelete2}
                        href="/"
                      >
                        <img src={IconDelete} alt="" />
                      </button>

                      <button
                        className="icon-hover"
                        onClick={handleAcademics}
                        href="/"
                      >
                        <img src={iconEdit} alt="" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="item work skills">
                  <div className="title">
                    <div>
                      <h5>IT Skills</h5>
                      <div>{profileDetails?.keySkills}</div>
                    </div>

                    <button
                      className="icon-hover"
                      onClick={handleSkills}
                      href="/"
                    >
                      <img src={iconEdit} alt="" />
                    </button>
                  </div>
                </div>

                <div className="item work project">
                  <div className="title">
                    <h5>Projects</h5>
                    <CommonButton title="+ Add" onClick={handleProject} />
                  </div>
                  <div className="content">
                    <div className="left">
                      {/* <h4>B.A (Arts&Humanities)</h4> */}
                      {/* <p>
                      Veer Bahadur Singh Purvanchal University Jaunpur - Jaunpur
                    </p> */}
                    </div>
                    {/* <div className="right">
                    <img src={IconDelete} alt="" />
                    <img src={iconEdit} alt="" />
                  </div> */}
                  </div>
                </div>

                <div className="item work other">
                  <div className="title">
                    <h5>Other details</h5>
                    <button
                      className="icon-hover"
                      onClick={handleDetails}
                      href="/"
                    >
                      <img src={iconEdit} alt="" />
                    </button>
                  </div>

                  <Row className="other-items">
                    <Col lg={6} md={6}>
                      <div className="other-details">
                        {/* <h4>{profileDetails?.additionalDetails?.resumeProcessedBy}</h4>
                        <h4>{profileDetails?.additionalDetails?.resumeProcessedBy}</h4> */}
                        <h6>Date of Birth: Not Mentioned</h6>
                        <h6>Gender: Male</h6>
                        <h6>Marital Status: Not Mentioned</h6>
                      </div>
                    </Col>

                    <Col lg={6} md={6}>
                      <div className="other-details">
                        <h4>Desired Job Details </h4>
                        <h6>
                          Job Type: {profileDetails?.showCandidatesSeeking}
                        </h6>
                        <h6>
                          Employment Status: {profileDetails?.employmentType}
                        </h6>
                      </div>
                    </Col>

                    <Col lg={6} md={6}>
                      <div className="other-details">
                        <h4>Address:</h4>
                        <h6>{profileDetails?.currentCity}</h6>
                        <h6>Home Town: Not Mentioned</h6>
                      </div>
                    </Col>

                    <Col lg={6} md={6}>
                      <div className="other-details">
                        <h4>Work Authorization</h4>
                        <h6>US Work Status: Not Mentioned</h6>
                        <h6>Countries: Not Mentioned</h6>
                      </div>
                    </Col>

                    <Col lg={6} md={6}>
                      <div className="other-details">
                        <h4>Affirmative Action</h4>
                        <h6>
                          Category:{" "}
                          {profileDetails?.affirmativeDetails?.category}
                        </h6>
                        <h6>
                          Physically Challenged:{" "}
                          {profileDetails?.affirmativeDetails?.specialAbilities}
                        </h6>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="item work documents">
                  <div className="title">
                    <h5>Attached Documents</h5>
                    <CommonButton title="+ Add" />
                  </div>

                  <div className="box">
                    <div className="left">
                      <div className="icon">
                        <img src={iconDocument} alt="" />
                      </div>
                      <div className="text">
                        <h6>
                          <b>Resume :</b> {profileDetails?.resume} <br />
                        </h6>
                      </div>
                    </div>

                    <div className="right">
                      <img src={iconDowndash} alt="" />

                      <button
                        className="icon-hover"
                        onClick={handleDelete3}
                        href="/"
                      >
                        <img src={IconDelete} alt="" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="item work resume">
                  <div className="title">
                    <h5>Attached Documents</h5>
                  </div>
                  <div className="pdf"></div>
                </div>

                <CommonButton title="Update" />
              </Col>
              <Col lg={3} md={4}>
                <Form>
                  <div className="item enter">
                    <Col className="desktop" lg={12} md={12}>
                      {/* <Form.Label>Comment </Form.Label> */}

                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        placeholder="Enter"
                        onResize={false}
                      />
                    </Col>

                    <CommonButton title="+ Add New comment" />
                  </div>

                  <div className="item sumit">
                    <h5>
                      Sumit <span>(21/09/2021)</span>
                    </h5>
                    <p>
                      Add this profile to requirement 123 and sent it
                      rameshwaram private limited{" "}
                    </p>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <EducationModal
        isConfirm={isEducation}
        closeConfirm={handleEducation}
        setEducationData={handleEducationData}
      />
      <ExperienceModal
        isConfirm={isExperience}
        closeConfirm={handleExperience}
        setExperienceData={handleExperienceData}
      />
      <ProjectModal
        isConfirm={isProject}
        closeConfirm={handleProject}
        setIsProjectData={handleProjectData}
      />
      <ProjectModal isConfirm={isProject} closeConfirm={handleProject} />
      <CommonModal isConfirm={isSummary} closeConfirm={handleSummary} />
      <CommonModal isConfirm={isWork} closeConfirm={handleWork} />

      <CommonModal isConfirm={isAcademics} closeConfirm={handleAcademics} />
      <CommonModal isConfirm={isSkills} closeConfirm={handleSkills} />
      <CommonModal isConfirm={isDetails} closeConfirm={handleDetails} />
      <CommonDeletModal isConfirm={isDelete1} closeConfirm={handleDelete1} />
      <CommonDeletModal isConfirm={isDelete2} closeConfirm={handleDelete2} />
      <CommonDeletModal isConfirm={isDelete3} closeConfirm={handleDelete3} />
    </>
  );
};

export default ProfileDetails;
