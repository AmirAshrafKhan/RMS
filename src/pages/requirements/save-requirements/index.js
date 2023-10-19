import React, { useState } from "react";
import "./saveraquirements.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import CheckboxTitle from "components/checkbox-title";
import CommonButton from "components/common-button";
import Heading from "components/heading";
import axios from "axios";
import OptionsLists from "OptionsLists";
import { Navigate } from "react-router-dom";
import { apiBase } from "apiBase";

const SaveRequirements = () => {
  const [validated, setValidated] = useState(false);

  const [saveformData, setFormData] = useState({
    addPostNaukri: "",
    educationQualification: "",
    jobCategorization: {},
    contactDetails:{},
    contactPerson:"",
    contactPersonPhone:"",
    companyName:"",
    aboutCompany:"",
    companyWebsite:""



  });
  const {
    addPostNaukri,
    educationQualification,
    contactDetails,
    jobCategorization,
    contactPerson,
    contactPersonPhone,
    companyName,
    aboutCompany,
    companyWebsite
  } = saveformData;

  const handleChange = (event) => {
    const { name, value } = event.target;

    if(name==="contactPerson" || name==="contactPersonPhone" || name==="companyName" || name==="aboutCompany" || name==="companyWebsite"){
      console.log(value,'values');
      setFormData((prevData) => ({
        ...prevData,
        contactDetails:{[name]:value,...saveformData.contactDetails},
      }));  
    }else if(name==="educationQualification" || name==="functionalArea"){
      setFormData((prevData) => ({
        ...prevData,
        jobCategorization:{[name]:value,...saveformData.jobCategorization},
      }));  
    
    }else{
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

    let addReqFormData = JSON.parse(localStorage.getItem("add_requirement"));
      console.log(addReqFormData,'parse addReqFormData') ;
      console.log(addReqFormData.requirementTitle,'addReqFormData.requirementTitle')
  };

  const handleSubmit = async(event) => {
    setValidated(true);

    event.preventDefault();
    event.stopPropagation();

    // localStorage.clear();
    
     const form = event.currentTarget;
    
    // if (form.checkValidity() === false) {
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();

      let newAdd=JSON.parse( localStorage.getItem("add_requirement"))
      let data={
        ...saveformData,...newAdd
      }
     
 try {

      const response = await apiBase.post("requirement/add",
        data,
        { headers: { Authorization: localStorage.getItem("token")}}
      );
     
      console.log(response.data);
      Navigate('/')

    } catch (error) {
      console.error(error);
    }
    }else{
      setValidated(true);
    }
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <section className="save-requirements">
        <Container>
          <div className="items">
            <div className="title">
              <Heading
                title="Add A New Requirement"
                description="Add new requirement by filling out this form"
              />
              <div className="stap">
                <h5>Step 2/3</h5>
              </div>
            </div>

            <div className="details-box">
              <Form noValidate validated={validated} 
              onSubmit={handleSubmit}
              >
                <h4>Please Fill up the additional Details</h4>
                <Row className="input-border">
                  <CheckboxTitle title="Add this post in Naukri " name="addPostNaukri"
                            value={addPostNaukri}
                            onChange={handleChange}/>
                </Row>

                <h4>Please Fill up the Educational Details </h4>
                <Row className="input-border">
                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Educational Qualification</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("educationQualification")}
                      placeholder="Select educational qualification"
                      name="educationQualification"
                      value={OptionsLists.optionList("educationQualification").filter(function(option) {
                        return option.value === educationQualification;
                      })}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          educationQualification: selectedOption.value,
                        }))
                      }
                    />
                  </Col>
                </Row>

                <h4>Please Fill up the Job Categorization</h4>
                <Row className="input-border">
                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Industry</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("jobCategorization")}
                      placeholder="Select or type a category"
                      name="jobCategorization"
                      value={OptionsLists.optionList("jobCategorization").value}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          jobCategorization: {"industry": selectedOption.value},
                        }))
                      }
                    />
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Label>Functional Area</Form.Label>
                    <Select
                      className="select"
                      options={OptionsLists.optionList("functionalArea")}
                      placeholder="Select or start typing category"
                      name="functionalArea"
                      value={OptionsLists.optionList("functionalArea").value}
                      onChange={(selectedOption) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          functionalArea: selectedOption,
                        }))
                      }
                    />
                  </Col>
                </Row>

                <h4>Please Fill up the Contact Details</h4>
                <Row className="input-border bottom">
                  <Col className="desktop" lg={6} md={6}>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Contact Person </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter contact person name"
                        name="contactPerson"
                      value={contactDetails.contactPerson}
                      onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter contact person name
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Contact Person Phone </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter contact person Phone number"
                        name="contactPersonPhone"
                            value={contactDetails.contactPersonPhone}
                            onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        PleaseEnter contact person Phone number
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="desktop" lg={6} md={6}>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Company Website</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter company website url "
                        name="companyWebsite"
                            value={contactDetails.companyWebsite}
                            onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter company website url
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col className="desktop" lg={6} md={6}>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter company name"
                        name="companyName"
                            value={contactDetails.companyName}
                            onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter company name
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Col className="desktop" lg={12} md={12}>
                  <Form.Label>About the Company</Form.Label>

                  <textarea
                    required
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    placeholder="Enter a description..."
                    onResize={false}
                    name="aboutCompany"
                    value={contactDetails.aboutCompany}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a description...
                  </Form.Control.Feedback>
                </Col>
                
                <CommonButton type="submit" title="Save Reqiurement" onClick={handleSubmit}/>
              </Form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default SaveRequirements;
