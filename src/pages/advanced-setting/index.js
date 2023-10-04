import React, { useState } from "react";
import "../advanced/advanced.scss";
import { Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import Select, { components } from "react-select";
import { iconBail, iconGraysearch } from "assets/images";
import CheckboxTitle from "components/checkbox-title";
import CommonButton from "components/common-button";

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} />
      {children}
    </components.Option>
  );
};

const allOptions = [
  { value: "option 1", label: "option 1" },
  { value: "option 2", label: "option 2" },
  { value: "option 3", label: "option 3" },
  { value: "option 4", label: "option 4" },
];

const AdvancedSetting = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);
  return (
    <>
      <section className="advanced-section section-padding">
        <Container>
          <div className="box">
            <div className="title">
              <h1>
                advanced Setting <span>reset Setting</span>
              </h1>
            </div>

            <Row>
              <Col lg={9} md={12}>
                <div className="item basic">
                  <h4>basic details</h4>

                  <Form>
                    <div className="inner">
                      <Row>
                        <Col lg={2} md={4} className="margin-b">
                          <h5>Keywords: </h5>
                        </Col>
                        <Col lg={10} md={8} className="margin-b">
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                              Type Keyword or Click tha arrow for more options
                              <span>Expand</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                Action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                Another action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                Something else
                              </Dropdown.Item>
                            </Dropdown.Menu>

                            <div className="check">
                              <h6>Search in :</h6>
                              <Form.Check
                                inline
                                label="Entire Resume"
                                name="group1"
                                type="radio"
                                id="inline-radio-1"
                              />
                              <Form.Check
                                inline
                                label="Resume Title & Key Skills"
                                name="group1"
                                type="radio"
                                id="inline-radio-2"
                              />
                              <Form.Check
                                inline
                                label="Resume Synopsis"
                                name="group1"
                                type="radio"
                                id="inline-radio-3"
                              />

                              <Form.Check
                                inline
                                label="Resume Title"
                                name="group1"
                                type="radio"
                                id="inline-radio-4"
                              />
                            </div>
                          </Dropdown>
                        </Col>
                      </Row>
                    </div>
                  </Form>

                  <Form>
                    <div className="inner">
                      <Row>
                        <Col lg={2} md={4} className="margin-b">
                          <h5>Keywords: </h5>
                        </Col>
                        <Col lg={10} md={8}>
                          <Row>
                            <Col lg={4} md={4} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="Minimun"
                              />
                            </Col>
                            <Col lg={4} md={4} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="Maximun"
                              />
                            </Col>
                            <Col lg={4} md={4} className="margin-b">
                              <p>in Years</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Form>

                  <Form>
                    <div className="inner">
                      <Row>
                        <Col lg={2} md={4} className="margin-b">
                          <h5>Annual Salary:</h5>
                        </Col>
                        <Col lg={10} md={8}>
                          <Row>
                            <Col lg={2} md={4} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="Lacs"
                              />
                            </Col>
                            <Col lg={2} md={4} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="Thousands"
                              />
                            </Col>
                            <Col lg={2} md={4} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="Lacs"
                              />
                            </Col>
                            <Col lg={2} md={4} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="Thousands"
                              />
                            </Col>
                            <Col lg={2} md={4} className="margin-b">
                              <p>(in INR)</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Form>

                  <Form>
                    <div className="inner">
                      <Row>
                        <Col lg={2} md={4}>
                          <h5>Candidate Current Location:</h5>
                        </Col>
                        <Col lg={10} md={8}>
                          <div className="search">
                            <div className="form-group has-search">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Select or Start Typing"
                              />
                              <span className="icon form-control-feedback">
                                <img src={iconGraysearch} alt="" />
                              </span>
                            </div>

                            <div className="bottom">
                              <CheckboxTitle title="Preferred location is " />
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  same age above
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item href="#/action-1">
                                    Action
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">
                                    Another action
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-3">
                                    Something else
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </div>

                <div className="item search">
                  <details>
                    <summary>Search Candidates in </summary>

                    <Row>
                      <Col lg={3} md={5} className="margin-b">
                        <h5>Requirements:</h5>
                      </Col>
                      <Col lg={9} md={7} className="margin-b">
                        <Select
                          className="select"
                          options={options}
                          placeholder="Select or Start Typing"
                        />
                      </Col>

                      <Col lg={3} md={5} className="margin-b">
                        <h5>Status:</h5>
                      </Col>
                      <Col lg={9} md={7} className="margin-b">
                        <Select
                          className="select"
                          options={options}
                          placeholder="Select or Start Typing"
                        />
                      </Col>

                      <Col lg={3} md={5} className="margin-b">
                        <h5>Profile Sources:</h5>
                      </Col>
                      <Col lg={9} md={7} className="margin-b">
                        <Select
                          className="select"
                          options={options}
                          placeholder="Select or Start Typing"
                        />
                      </Col>

                      <Col lg={3} md={5} className="margin-b">
                        <h5>Comments:</h5>
                      </Col>
                      <Col lg={9} md={7} className="margin-b">
                        <Select
                          className="select"
                          options={options}
                          placeholder="Type Comments"
                        />
                      </Col>
                    </Row>
                  </details>
                </div>

                <div className="item employment">
                  <details>
                    <summary>Employment Details </summary>

                    <Row>
                      <Col lg={3} md={4} className="margin-b">
                        <h5>Functional Area and Roles</h5>
                      </Col>
                      <Col lg={9} md={8}>
                        <div className="roles">
                          <Row>
                            <Col lg={6} md={12} className="margin-b">
                              <Select
                                defaultValue={[]}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                onChange={(options) => {
                                  if (Array.isArray(options)) {
                                    setSelectedOptions(
                                      options.map((opt) => opt.value)
                                    );
                                  }
                                }}
                                options={allOptions}
                                components={{
                                  Option: InputOption,
                                }}
                              />
                            </Col>
                            <Col lg={6} md={12} className="margin-b">
                              <Select
                                defaultValue={[]}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                onChange={(options) => {
                                  if (Array.isArray(options)) {
                                    setSelectedOptions(
                                      options.map((opt) => opt.value)
                                    );
                                  }
                                }}
                                options={allOptions}
                                components={{
                                  Option: InputOption,
                                }}
                              />
                            </Col>
                          </Row>
                        </div>
                      </Col>

                      <Col lg={3} md={4} className="margin-b">
                        <h5>Industry Type:</h5>
                      </Col>
                      <Col lg={9} md={8} className="margin-b">
                        <Select
                          className="select"
                          options={options}
                          placeholder="Select or Start Typing"
                        />
                      </Col>

                      <Col lg={3} md={4} className="margin-b">
                        <h5>Employers:</h5>
                      </Col>
                      <Col lg={9} md={8}>
                        <Form>
                          <Row>
                            <Col lg={4} md={12} className="margin-b">
                              <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control
                                  type="text"
                                  placeholder="Start typing for suggestions"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={4} md={12} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="Current Employer"
                              />
                            </Col>
                            <Col lg={4} md={12} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="All Words"
                              />
                            </Col>
                          </Row>
                        </Form>
                      </Col>

                      <Col lg={3} md={4} className="margin-b">
                        <h5>Exclude Employers:</h5>
                      </Col>
                      <Col lg={9} md={8}>
                        <Form>
                          <Row>
                            <Col lg={4} md={12} className="margin-b">
                              <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control
                                  type="text"
                                  placeholder="Start typing for suggestions"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={4} md={12} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="Current Employer"
                              />
                            </Col>
                            <Col lg={4} md={12} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="All Words"
                              />
                            </Col>
                          </Row>
                        </Form>
                      </Col>

                      <Col lg={3} md={4} className="margin-b">
                        <h5>Designation:</h5>
                      </Col>
                      <Col lg={9} md={8}>
                        <Form>
                          <Row>
                            <Col lg={4} md={12} className="margin-b">
                              <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control
                                  type="text"
                                  placeholder="Start typing for suggestions"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={4} md={12} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="Current Employer"
                              />
                            </Col>
                            <Col lg={4} md={12} className="margin-b">
                              <Select
                                className="select"
                                options={options}
                                placeholder="All Words"
                              />
                            </Col>
                          </Row>
                        </Form>
                      </Col>

                      <Col lg={3} md={4} className="margin-b">
                        <h5>Notice Period:</h5>
                      </Col>
                      <Col lg={9} md={8}>
                        <Row>
                          <Col lg={5} md={12} className="margin-b">
                            <Select
                              className="select"
                              options={options}
                              placeholder="Select"
                            />
                          </Col>
                          <Col lg={4} md={12} className="margin-b">
                            <p>In Months</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </details>
                </div>

                <div className="item educational">
                  <details>
                    <summary>educational Details</summary>

                    <h5>UG Qualification </h5>
                    <div className="qualification">
                      <ul>
                        <li>Any UG Qualification</li>
                        <li>Specific UG Qualification</li>
                        <li>No UG Qualification</li>
                      </ul>
                    </div>

                    <p>
                      Show candidates with Either UG ro PG Qualification.{" "}
                      <span>Change</span>{" "}
                    </p>

                    <h5>PG Qualification </h5>
                    <div className="qualification">
                      <ul>
                        <li>Any UG Qualification</li>
                        <li>Specific UG Qualification</li>
                        <li>No UG Qualification</li>
                      </ul>
                    </div>
                    <h6>+Add PPG/Doctorate Qualification</h6>
                  </details>
                </div>

                <div className="item additional">
                  <details>
                    <summary>additional Filters</summary>

                    <Row>
                      <Col lg={3} md={4} className="margin-b">
                        <h5>Resume Processed By:</h5>
                      </Col>
                      <Col lg={9} md={8} className="margin-b">
                        <div className="check">
                          <Form.Check
                            inline
                            label="Anyone"
                            name="group1"
                            type="radio"
                            id={`inline-radio-1`}
                          />
                          <Form.Check
                            inline
                            label="Me"
                            name="group1"
                            type="radio"
                            id={`inline-radio-2`}
                          />
                          <Form.Check
                            inline
                            label="Specific"
                            name="group1"
                            type="radio"
                            id={`inline-radio-3`}
                          />
                        </div>
                      </Col>

                      <Col lg={3} md={4} className="margin-b">
                        <h5>Star Rating:</h5>
                      </Col>
                      <Col lg={9} md={8} className="margin-b">
                        <div className="star-img">
                          <img src={iconBail} alt="" />
                          <p>TO</p>
                          <img src={iconBail} alt="" />
                        </div>
                      </Col>

                      <Col lg={3} md={4} className="margin-b">
                        <h5>Candidate Age:</h5>
                      </Col>
                      <Col lg={9} md={8}>
                        <Row>
                          <Col lg={4} md={6} className="margin-b">
                            <Select
                              className="select"
                              options={options}
                              placeholder="Select"
                            />
                          </Col>

                          <Col lg={4} md={6} className="margin-b">
                            <Select
                              className="select"
                              options={options}
                              placeholder="Select"
                            />
                          </Col>

                          <Col lg={4} md={6} className="margin-b">
                            <p>(In years)</p>
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={3} md={4} className="margin-b">
                        <h5>Work Status For:</h5>
                      </Col>
                      <Col lg={9} md={8}>
                        <Row>
                          <Col lg={6} md={6} className="margin-b">
                            <Select
                              className="select"
                              options={options}
                              placeholder="-USA-"
                            />
                          </Col>

                          <Col lg={6} md={6} className="margin-b">
                            <Select
                              className="select"
                              options={options}
                              placeholder="-Other Countries-"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </details>
                </div>

                <div className="item affirmative">
                  <details>
                    <summary>Affirmative Actions</summary>

                    <Row>
                      <Col lg={3} md={4} className="margin-b">
                        <h5>Category</h5>
                      </Col>
                      <Col lg={9} md={8} className="margin-b">
                        <Select
                          className="select"
                          options={options}
                          placeholder="Select from List"
                        />
                      </Col>

                      <Col lg={3} md={4} className="margin-b">
                        <h5>Diversity</h5>
                      </Col>
                      <Col lg={9} md={8} className="margin-b">
                        <div className="diversity">
                          <div className="check mb-3">
                            <Form.Check
                              inline
                              label="All Candidates"
                              name="group1"
                              type="radio"
                              id={`inline-radio-1`}
                            />
                            <Form.Check
                              inline
                              label="Female Candidates"
                              name="group1"
                              type="radio"
                              id={`inline-radio-2`}
                            />
                            <Form.Check
                              inline
                              label="Male Candidates"
                              name="group1"
                              type="radio"
                              id={`inline-radio-3`}
                            />
                          </div>
                          <div className="spacial">
                            <CheckboxTitle title="Search Candidates with special abilities only" />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </details>
                </div>

                <div className="item display">
                  <details>
                    <summary>Display Options</summary>
                    <Row>
                      <Col lg={3} md={4} className="margin-b">
                        <h5>Show Candidates Seeking:</h5>
                      </Col>
                      <Col lg={9} md={8} className="margin-b">
                        <div className="check">
                          <Form.Check
                            inline
                            label="Any Job"
                            name="group1"
                            type="radio"
                            id={`inline-radio-1`}
                          />
                          <Form.Check
                            inline
                            label="Parmanent job"
                            name="group1"
                            type="radio"
                            id={`inline-radio-2`}
                          />
                          <Form.Check
                            inline
                            label="Temporary/Contract Job"
                            name="group1"
                            type="radio"
                            id={`inline-radio-3`}
                          />
                        </div>
                      </Col>

                      <Col lg={3} md={4} className="margin-b">
                        <h5>Employment Type:</h5>
                      </Col>
                      <Col lg={9} md={8} className="margin-b">
                        <div className="check">
                          <Form.Check
                            inline
                            label="Any"
                            name="group1"
                            type="radio"
                            id={`inline-radio-1`}
                          />
                          <Form.Check
                            inline
                            label="Full Time"
                            name="group1"
                            type="radio"
                            id={`inline-radio-2`}
                          />
                          <Form.Check
                            inline
                            label="Part Time"
                            name="group1"
                            type="radio"
                            id={`inline-radio-3`}
                          />
                        </div>
                      </Col>

                      <Col lg={3} md={4} className="margin-b">
                        <h5>Show Candidates Only with:</h5>
                      </Col>
                      <Col lg={9} md={8}>
                        <div className="check">
                          <Row>
                            <Col lg={4} md={6}>
                              <CheckboxTitle title="Verified mobile no." />
                            </Col>
                            <Col lg={4} md={6}>
                              <CheckboxTitle title="Verified e-mail id" />
                            </Col>
                            <Col lg={4} md={6}>
                              <CheckboxTitle title="Attached Resume" />
                            </Col>
                            <Col lg={4} md={6}>
                              <CheckboxTitle title="Search only Premium Resume" />
                            </Col>
                          </Row>
                        </div>
                      </Col>

                      <Row>
                        <Col lg={3} md={4} className="margin-b">
                          <h5>Shot By:</h5>
                        </Col>
                        <Col lg={9} md={8} className="margin-b">
                          <Select
                            className="select"
                            options={options}
                            placeholder="Relevance"
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={3} md={4} className="margin-b">
                          <h5>Resume Per Page:</h5>
                        </Col>
                        <Col lg={9} md={8} className="margin-b">
                          <Select
                            className="select"
                            options={options}
                            placeholder="40"
                          />
                        </Col>
                      </Row>
                    </Row>
                  </details>
                </div>

                <div className="resume">
                  <div className="find">
                    <CommonButton title="Find Resume" />
                  </div>
                  <div className="modified">
                    <h5>Modified in</h5>
                    <Select
                      className="select"
                      options={options}
                      placeholder="All Resume"
                    />
                  </div>
                </div>
              </Col>
              <Col lg={3} md={12}>
                <div className="right">
                  <div className="item">
                    <h4>Rescent Searches</h4>
                    <h5>Requirements Sales-Gurgoan</h5>
                    <p>25 may 23</p>
                    <a href="/">Show More</a>
                  </div>

                  <div className="item">
                    <h4>Saved Searches</h4>
                    <h5>No Saved searches</h5>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdvancedSetting;
