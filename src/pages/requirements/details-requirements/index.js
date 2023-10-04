import React, { useEffect, useState } from "react";
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
// import AddprofilePopup from "pages/addprofile-popup";
import axios from "axios";
import { apiBase } from "apiBase";

const RequirementDetails = () => {
  const [isEducation, setIsEducation] = useState(false);
  const [isExperience, setIsExperience] = useState(false);
  const [isProject, setIsProject] = useState(false);
  let [experienceData, setExperienceData] = useState([]);
  const [educationData, setEducationData] = useState([]);

  const [reqData, setData]= useState(null);
 
  const location = useLocation();
  const {ID} = location.state;

  useEffect(() => {
    // localStorage.clear();
    console.log(ID,'ID')
    let token= localStorage.getItem("token");
   
   if(token!=="undefined" && token!==null) {
    fetchData();
    }
  }, []);
  
  const fetchData = async () => {
    let token= localStorage.getItem("token");
    try {
      const response = await apiBase.get(`requirement/details/${ID}`,
        { headers: { Authorization: token}}
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // experience data
  const handleExperienceData = async (formData) => {
    try {
      const response = await axios.post(
        "https://talenthiring.in/rms/api/createProfileExperience",
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
        "https://talenthiring.in/rms/api/createProfileEducation",
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
        "https://talenthiring.in/rms/api/createProfileEducation",
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
  function handleSummary() {
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
                title={reqData && reqData.requirementTitle}
                description={reqData && reqData.jobDescription}
              />
              {/* <div className="top-bar">
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
              </div> */}
            </div>

            <Row>
              <Col lg={9} md={8}>
                <div className="item details">
                  <div className="edit-image">
                    <Link to={allRoutes.addProfilePopup}  className="icon-hover">
                      <img src={iconEdit} alt="" />
                    </Link>
                  </div>
                  <Row>
                    <Col lg={6} md={6}>
                      <div className="details-content">
                        <ul>
                        <li>
                            <span>Job Title:</span> {reqData && reqData.jobTitle}
                          </li>
                          <li>
                            <span>Employment Type:</span>{reqData && reqData.employmentType}
                          </li>
                          <li>
                            <span>Skills: </span>
                            {(reqData && reqData.keywords.length > 0) && reqData.keywords.map((val,k)=>(
                              <span>{`${val},`}</span>
                            ))}
                          </li>

                          <li>
                            <span>Max WorkExperience: </span>{reqData && reqData.minWorkExperience}-{reqData && reqData.maxWorkExperience}
                          </li>

                          <li>
                            <span>Max Salary: </span>{reqData && reqData.minSalary}-{reqData && reqData.maxSalary}
                          </li>
                         
                          <li>
                            <span>Vacancies:</span> {reqData && reqData.vacancies}
                          </li>
                          <li>
                            <span>Job Locations:</span>{(reqData && reqData.jobLocations.length >0) && 
                            reqData.jobLocations.map((val)=>(
                              <span>{`${val},`}</span>
                            ))}
                          </li>
                          <li>
                            <span>Job categeory:</span>{(reqData && reqData.jobCategorization) &&<ul>
                                <li>
                                  <span>functionalArea:</span>{reqData && reqData.jobCategorization.functionalArea}
                                </li>
                                <li>
                                  <span>Industry:</span>{reqData && reqData.jobCategorization.industry}
                                </li>
                                </ul>}
                          </li>
                        </ul>
                      </div>
                    </Col>

                    <Col lg={6} md={6}>
                      <div className="details-content">
                        <ul>
                          <li>
                            <span>: </span>{reqData && reqData.desiredCandidateDescription}
                          </li>
                          <li>
                            <span>Education: </span>{reqData && reqData.educationalQualification}
                          </li>

                          <li>
                            <span>About Company:</span>{reqData && reqData.contactDetails && reqData.aboutCompany}
                          </li>
                          <li>
                            <span>Company Name :</span>{reqData && reqData.contactDetails && reqData.companyName}
                          </li>
                          <li>
                            <span>Email:</span> {reqData && reqData.contactDetails && reqData.aboutCompany}
                          </li>
                          <li>
                            <span>Website:</span> {reqData && reqData.contactDetails && reqData.companyWebsite}
                          </li>
                          <li>
                            <span>Contact Person:</span> {reqData && reqData.contactDetails && reqData.contactPerson}
                          </li>
                          <li>
                            <span>Phone:</span> {reqData && reqData.contactDetails && reqData.contactPersonPhone}
                          </li>
                        </ul>
                      </div>
                    </Col>

                    
                  </Row>

               </div>
               </Col>
               </Row>
               </div>
               </Container>
               </section>
               
    </>
  );
};

export default RequirementDetails;
