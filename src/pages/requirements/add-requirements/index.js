import React, { useEffect, useState } from "react";
import "./addrequirements.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import CommonButton from "components/common-button";
import Select from "react-select";
import Heading from "components/heading";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import OptionsLists from "OptionsLists";


const AddRequirements = () => {
  const navigate = useNavigate();


  const [validated, setValidated] = useState(false);

  let [addformData, setFormData] = useState({
    requirementTitle: "",
    previousRequirement: "",
    employmentType:"",
    jobTitle: "",
    jobDescription: "",
    jobCandidateDetails: "",
    annualCTC: "",
    minimumSalary: "",
    maximumSalary: "",
    minimumWorkExperience: "",
    maximumWorkExperience: "",
    keywords: [],
    jobLocations:[],
    visibleTo: "",
    noVacancy: ""
    });
  let {
    requirementTitle,
    previousRequirement,
    employmentType,
    jobTitle,
    jobDescription,
    jobCandidateDetails,
    annualCTC,
    minimumSalary,
    maximumSalary,
    minimumWorkExperience,
    maximumWorkExperience,
    keywords,
    jobLocations,
    visibleTo,
    noVacancy,
     } = addformData;


    
  const handleChange = (event) => {
    const { name, value } = event.target;

    if(name==="keywords"){
      setFormData((prevData) => ({
        ...prevData,
        keywords:[...keywords,value],
      }));  
    }else if(name==="jobLocations"){
      setFormData((prevData) => ({
        ...prevData,
        jobLocations:[...jobLocations,value],
      }));  
    }else{
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  };

  const handleSubmit = async (event) => {
    setValidated(false);
    event.preventDefault();
    // event.stopPropagation();
    
    const form = event.currentTarget
    console.log(form.checkValidity(),'form.checkValidity()')
  if (form.checkValidity() === true) {
      localStorage.setItem("add_requirement",JSON.stringify(addformData));
      navigate('/save-requirements')
  
    }else{
    setValidated(true);

    }
  };

  const options = [
    { label: "2",value: "2" },
    { value: "22", label: "2" },
    { value: "2", label: "2" },
  ];

  return (
    <>
      <section className="add-requirements section-padding">
        <Container>
          <div className="item">
            <div className="title">
              <Heading
                title="Add A New Requirement"
                description="Add new requirement by filling out this form"
              />
              <div className="pages">
                <h5>Step 1/3</h5>
              </div>
            </div>

            <div className="details-box">
              <Form noValidate validated={validated} 
              onSubmit={handleSubmit}
              >
                <h4>Please Fill up the Requirement Details</h4>
                <Row className="input-border">
                  <Col className="desktop" lg={6} md={6}>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Requirement Title (Required)</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter requirement title"
                        name="requirementTitle"
                        value={requirementTitle}
                        onChange={handleChange}
                      />

                      <Form.Control.Feedback type="invalid">
                        Please Enter requirement title
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>
                      Select from previous requirements This is a hint text to
                      help user.
                    </Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("previousRequirements")}
                      placeholder="Copy from an existing requirement"
                      name="previousRequirements"
                      value={OptionsLists.optionList("previousRequirements").filter(function(option) {
                        return option.value === previousRequirement;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          previousRequirement: selectedOption.value,
                        }))
                      }
                    />
                  </Col>
                </Row>

                <h4>Please Fill up the Basic Details about this Requirement</h4>
                <Row className="input-border">
                  <Col className="desktop" lg={6} md={6}>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Job Title/Designation (Required)</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter requirement title"
                        name="jobTitle"
                        value={jobTitle}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter requirement title
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Employment Type (Required)</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("employmentType")}
                      placeholder="Select employment type"
                      name="employmentType"
                      value={OptionsLists.optionList("employmentType").filter(function(option) {
                        return option.value === employmentType;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          employmentType: selectedOption.value,
                        }))
                      }
                    />
                  </Col>
                </Row>

                <Col className="desktop" lg={12} md={12}>
                  <Form.Label>Jon Description (Required)</Form.Label>

                  <textarea
                    required
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    placeholder="Enter a description..."
                    name="jobDescription"
                    value={jobDescription}
                    onChange={handleChange}
                    // onResize={false}
                  />

                  <Form.Control.Feedback type="invalid">
                    Please Enter a description...
                  </Form.Control.Feedback>
                </Col>

                <Col className="desktop" lg={12} md={12}>
                  <Form.Label>
                    Desired Candidate description (Optional)
                  </Form.Label>

                  <textarea
                    required
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    placeholder="Enter a description..."
                    name="jobCandidateDetails"
                    value={jobCandidateDetails}
                    onChange={handleChange}
                    // onResize={false}
                  />

                  <Form.Control.Feedback type="invalid">
                    Please Enter a description...
                  </Form.Control.Feedback>
                </Col>

                <Row>
                  <Col className="desktop" lg={4} md={6}>
                    <Form.Label>Annual CTC</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("annualCTC")}
                      placeholder="USD"
                      name="annualCTC"
                      value={OptionsLists.optionList("annualCTC").filter(function(option) {
                        return option.value === annualCTC;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          annualCTC: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col className="desktop" lg={4} md={6}>
                    <Form.Label>Minimum Salary </Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("minimumSalary")}
                      placeholder="Select minimum salary amount"
                      name="minimumSalary"
                      value={OptionsLists.optionList("minimumSalary").filter(function(option) {
                        return option.value === minimumSalary;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          minimumSalary: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col className="desktop" lg={4} md={6}>
                    <Form.Label>Maximum Salary</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("minimumSalary")}
                      placeholder="Select maximum salary amount"
                      name="maximumSalary"
                      value={OptionsLists.optionList("minimumSalary").filter(function(option) {
                        return option.value === maximumSalary;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          maximumSalary: selectedOption.value,
                        }))
                      }
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="desktop" md={6}>
                    <Form.Label>Minimum Work Experience</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("minimumWorkExperience")}
                      placeholder="
                      Select minimum work exp"
                      name="minimumWorkExperience"
                      value={OptionsLists.optionList("minimumWorkExperience").filter(function(option) {
                        return option.value === minimumWorkExperience;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          minimumWorkExperience: selectedOption.value,
                        }))
                      }
                    />
                  </Col>

                  <Col className="desktop" md={6}>
                    <Form.Label>Maximum Work Experience </Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("minimumWorkExperience")}
                      placeholder="Select Maximum work exp"
                      name="maximumWorkExperience"
                      value={OptionsLists.optionList("minimumWorkExperience").filter(function(option) {
                        return option.value === maximumWorkExperience;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          maximumWorkExperience: selectedOption.value,
                        }))
                      }
                    />
                  </Col>
                </Row>
                <Col className="desktop" lg={12} md={12}>
                  <Form.Group as={Col} controlId="formGridText">
                    <Form.Label>Keywords</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter a keyword..."
                      name="keywords"
                      value={keywords}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter a keyword...
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Row>
                  <Col className="desktop" lg={6} md={12}>
                    <Form.Label>Job Location</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("jobLocation")}
                      placeholder="Select job location"
                      value={OptionsLists.optionList("jobLocation").filter(function(option) {
                        return option.value === jobLocations;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          jobLocations: selectedOption.value,
                        }))
                      }
                    />
                  </Col>
                </Row>

                <h4> Additional Details</h4>
                <Row>
                  <Col className="desktop" lg={6} md={6}>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Visible to </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Only me"
                        name="visibleTo"
                        value={visibleTo}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Only me
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Number of vacancies (optional)</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="enter no of vacancies"
                        name="noVacancy"
                        value={noVacancy}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter no of vacancies
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                {/* <button onClick={handleSubmit}> save & next</button> */}
                {/* <Link to="/save-requirements"> */}
                  <CommonButton
                    type="submit"
                    title="Save & Continue to next step"
                    onClick={handleSubmit}
                  />
                {/* </Link> */}
              </Form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AddRequirements;
