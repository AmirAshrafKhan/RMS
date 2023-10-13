import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.scss";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  IconDelete,
  iconComment,
  iconDowndash,
  iconEdit,
  iconForward,
  iconGraysearch,
  iconMove,
  iconRequirements,
  iconSmile1,
  iconSmile2,
  iconSmile3,
  iconSmile4,
  iconSmile5,
  iconStatus,
} from "assets/images";
import CheckboxTitle from "components/checkbox-title";
import Select from "react-select";
import Heading from "components/heading";
import { Link } from "react-router-dom";
import { allRoutes } from "constants/allRoutes";
import { apiBase } from "apiBase";

let token = localStorage.getItem("token");

const Profile = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [data, setData] = useState([]);
  const [Checked, setChecked] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchfilters, setSearchFilters] = useState({
    designation: "",
    currentCity: "",
    experience: "",
  });

  useEffect(() => {
    fetchData();
    // window.location.reload();
  }, []);

  const fetchData = async () => {
    token = localStorage.getItem("token");

    try {
      const response = await apiBase.get("profiles/", {
        headers: { Authorization: token },
      });
      setData(response.data.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfile = async (id) => {
    const updatedData = data.filter((req) => req.id !== id);
    try {
      const response = await apiBase.delete(`profile/delete/${id}`, {
        headers: { Authorization: token },
      });
      console.log(response.data, "response.data");
      if (response.data.data !== undefined && response.data.data !== null) {
        console.log("enter");
        // setData(response.data.data);
        fetchData();
      } else {
        setData(updatedData);
      }
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const searchProfileByFilter = async (keywords) => {
    try {
      const response = await apiBase.get(`profiles/filter`, {
        params: {
          ...keywords,
        },
        headers: { Authorization: token },
      });
      console.log(response.data, "response.data");
      if (response.data.data !== undefined && response.data.data !== null) {
        console.log("enter");
        // setData(response.data.data);
        // fetchData();
      } else {
        // setData(updatedData);
      }
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.id;

    setSearchFilters({
      [name]: value,
    });

    // Function Calling
    searchProfileByFilter({ [name]: value });
  };

  const searchProfile = async (e) => {
    let designation = e.target.value;
    try {
      const response = await apiBase.get(`profiles/search`, {
        params: { designation },
        headers: { Authorization: token },
      });
      console.log(response.data, "response.data");
      if (response.data.data !== undefined && response.data.data !== null) {
        console.log("enter");
        // setData(response.data.data);
        // fetchData();
      } else {
        // setData(updatedData);
      }
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // If Next Changes for Multiple filters
  const onChangeMultipleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.id;

    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSearchFilters({
      [name]: newChecked,
    });
    setChecked(newChecked);

    // Function Calling
    searchProfileByFilter({ [name]: newChecked });
  };

  return (
    <>
      <section className="profile section-padding">
        <Container>
          <div className="box">
            <div className="title">
              <Heading
                title="All Profiles"
                description="View your added profiles here."
              />
              <div className="subheading">
                <h1>{data?.length}</h1>
                <h5>Total profiles available</h5>
              </div>
            </div>

            <div className="profile-top">
              <div className="form-group has-search">
                <span className="icon form-control-feedback">
                  <img src={iconGraysearch} alt="" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for Profile"
                  onChange={searchProfile}
                />
                <span>More </span>
              </div>

              <div className="add-btn">
                <Link to="/add-profile" className="btn">
                  + Add/ Post/ Create
                </Link>
              </div>
            </div>

            <div className="filter-box">
              <Row>
                <Col lg={3} md={12}>
                  <div className="filter-left">
                    <div className="title">
                      <h4>Filters</h4>
                    </div>
                    <div className="selection">
                      <h5>Selection Status:</h5>
                      <div className="item">
                        <details>
                          <summary>Prospect (528363)</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Prospect"
                              title="All (528363)"
                            />
                          </div>
                        </details>

                        <details>
                          <summary>Applied 5</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Applied"
                              title="All (5)"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Applied"
                              title="Not Matching (0)"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Applied"
                              title="Matching (5)"
                            />
                          </div>
                        </details>

                        <details>
                          <summary>Shortlisted 5</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Shortlisted"
                              title="All"
                            />
                          </div>
                        </details>

                        <details>
                          <summary>Interview 20</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="interview"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="interview"
                              title="Round 1 (20)"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="interview"
                              title="Round 2"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="interview"
                              title="Round 3"
                            />
                          </div>
                        </details>

                        <details>
                          <summary>Offer & Joining 1</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Offer & Joining"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Offer & Joining"
                              title="Offered (1)"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Offer & Joining"
                              title="Joined (0)"
                            />
                          </div>
                        </details>

                        <details>
                          <summary>Rejected</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Rejected"
                              title="All"
                            />
                          </div>
                        </details>

                        <details>
                          <summary>Interview Feedback</summary>

                          <details>
                            <summary>Approved</summary>
                            <div>
                              <CheckboxTitle
                                onChange={onChange}
                                currentIndex={currentIndex}
                                name="Approved"
                                title="All"
                              />
                            </div>
                          </details>

                          {/* <details>
                            <summary>Rejected</summary>
                            <div>
                              <CheckboxTitle  onChange={onChange} currentIndex={currentIndex} name="Rejected" title="All" />
                            </div>
                          </details> */}
                        </details>
                      </div>
                    </div>

                    <div className=" selection rating">
                      <h5>Rating:</h5>
                      <div className="item">
                        <CheckboxTitle
                          onChange={onChange}
                          currentIndex={currentIndex}
                          name="Rating"
                          title="All"
                        />

                        <CheckboxTitle
                          onChange={onChange}
                          currentIndex={currentIndex}
                          name="Rating"
                          icon
                        />
                        <CheckboxTitle
                          onChange={onChange}
                          currentIndex={currentIndex}
                          name="Rating"
                          icon
                        />
                        <CheckboxTitle
                          onChange={onChange}
                          currentIndex={currentIndex}
                          name="Rating"
                          icon
                        />
                        <CheckboxTitle
                          onChange={onChange}
                          currentIndex={currentIndex}
                          name="Rating"
                          icon
                        />
                        <CheckboxTitle
                          onChange={onChange}
                          currentIndex={currentIndex}
                          name="Rating"
                          icon
                        />

                        <CheckboxTitle
                          onChange={onChange}
                          currentIndex={currentIndex}
                          name="Rating"
                          title="Unrated"
                        />
                      </div>
                    </div>

                    <div className="selection">
                      <h5>Profile Activity:</h5>
                      <div className="item">
                        <details>
                          <summary>Processed By Me</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Me"
                              title="Viewed 2"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Me"
                              title="Emailed 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Me"
                              title="Called 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Me"
                              title="Messaged 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Me"
                              title="Call Not Picked 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Me"
                              title="Call Not Reachable 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Me"
                              title="WhatsApp Message 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Me"
                              title="Downloaded 1"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Me"
                              title="Starred 2"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Me"
                              title="Status Changed 1"
                            />
                          </div>
                        </details>

                        <details>
                          <summary>Processed By Anyone</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Anyone"
                              title="Viewed 2"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Anyone"
                              title="Emailed 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Anyone"
                              title="Called 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Anyone"
                              title="Messaged 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Anyone"
                              title="Call Not Picked 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Anyone"
                              title="Call Not Reachable 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Anyone"
                              title="WhatsApp Message 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Anyone"
                              title="Downloaded 1"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Anyone"
                              title="Starred 2"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Anyone"
                              title="Status Changed 1"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Processed By Anyone"
                              title="Not Yet Processed 348274"
                            />
                          </div>
                        </details>
                      </div>
                    </div>

                    <div className="selection">
                      {/* <h5>Profile Activity:</h5> */}
                      <div className="item">
                        <details>
                          <summary>Application Date</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="Today 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="2 to 3 days ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="4 to 7 day ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="8 to 15 day ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="16 to 30 day ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="1 to 2 months ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="2 to 3 months ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="3 to 6 months ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="6 to 9 months ago 1"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="9 to 12 months ago 527985"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Application Date"
                              title="Custom"
                            />
                          </div>
                        </details>

                        <details>
                          <summary>Interview Date</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="NA 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="2 to 3 Months After 0 "
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="1 to 2 Months After 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="0 to 1 Months After 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="2 to 15 Days After 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="Today 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="2 to 15 Days Ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="0 to 1 Months Ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="1 to 2 Months Ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="2 to 3 Months Ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Interview Date"
                              title="Custom"
                            />
                          </div>
                        </details>
                      </div>
                    </div>

                    <div className="selection">
                      {/* <h5>Profile Activity:</h5> */}
                      <div className="item">
                        <details>
                          <summary>Joining Date</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="NA 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="2 to 3 Months After 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="1 to 2 Months After 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="0 to 1 Month After 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="2 to 15 Days After 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="Today 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="2 to 15 Days Ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="0 to 1 Month Ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="1 to 2 Month Ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="2 to 3 Month Ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Joining Date"
                              title="Custom"
                            />
                          </div>
                        </details>

                        <details>
                          <summary>Last Modified</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Last Modified"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Last Modified"
                              title="Today 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Last Modified"
                              title="2 to 3 days ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Last Modified"
                              title="4 to 7 days ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Last Modified"
                              title="8 to 30 days ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Last Modified"
                              title="1 to 2 months ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Last Modified"
                              title="2 to 3 monthd ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Last Modified"
                              title="3 to 6 months ago 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Last Modified"
                              title="6 to 9 months ago 1"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Last Modified"
                              title="Custom"
                            />
                          </div>
                        </details>
                      </div>
                    </div>

                    <div className="selection">
                      <div className="item">
                        <details>
                          <summary>Location</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Location"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Location"
                              title="Bengaluru/Bangalore 119988"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Location"
                              title="Hyderabad 51598"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Location"
                              title="Puna 45599"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Location"
                              title="Chennai 31820"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Location"
                              title="Mumbai 28238"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Location"
                              title="Delhi 26017"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Location"
                              title="Noida 16610"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Location"
                              title="Gurgaon 14302"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Location"
                              title="KolKata 7301"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Location"
                              title="Ahmedabad 2248"
                            />
                            <Link to="/">
                              <span>Show More</span>
                            </Link>
                          </div>
                        </details>
                      </div>
                    </div>

                    <div className="selection">
                      <div className="item">
                        <details>
                          <summary>Company Name</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Company Name"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Company Name"
                              title="Tata Consultancy Services (TCS) 20115"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Company Name"
                              title="Infosys 19673"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Company Name"
                              title="Cognizant 13447"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Company Name"
                              title="Wipro 13443"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Company Name"
                              title="Accenture 12523"
                            />

                            <Link to="/">
                              <span>Show More</span>
                            </Link>
                          </div>
                        </details>
                      </div>
                    </div>

                    <div className="selection">
                      <div className="item">
                        <details>
                          <summary>Functional Area</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Engineering - Software & QA 369034"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Data Science & Analytics 21730"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Customer Success, Service & Operations 19826"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Human Resources 16948"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Other 11078"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Sales & Business Development 9060"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Engineering - Hardware & Networks 8884"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Finance & Accounting 8006"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Research & Development 7116"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Production, Manufacturing & Engineering 5710"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="UX, Design & Architecture 4499"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="BFSI, Investments & Trading 3893"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Procurement & Supply Chain 3641"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Construction & Site Engineering 3201"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Functional Area"
                              title="Marketing & Communication 3204"
                            />
                          </div>
                        </details>
                      </div>
                    </div>

                    <div className="selection">
                      <div className="item">
                        <details>
                          <summary>Role</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Role"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Role"
                              title="Full Stack Developer 304490"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Role"
                              title="Test Analyst 59107"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Role"
                              title="HR Generalist 16761"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Role"
                              title="Data Analyst 16561"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Role"
                              title="Other 11078"
                            />
                            <Link to="/">
                              <span>Show More</span>
                            </Link>
                          </div>
                        </details>

                        <details>
                          <summary>Industry</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Industry"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Industry"
                              title="IT Services & Consulting 427238"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Industry"
                              title="Miscellaneous 20040"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Industry"
                              title="Banking 8192"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Industry"
                              title="Recruitment/Staffing 6950"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="Industry"
                              title="Accounting/Auditing 6388"
                            />
                            <Link to="/">
                              <span>Show More</span>
                            </Link>
                          </div>
                        </details>

                        <details>
                          <summary>CTC</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="CTC"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="CTC"
                              title="Less than 1 Lakh 484431"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="CTC"
                              title="1 to 3 Lakhs 6157"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="CTC"
                              title="3 to 7 Lakhs 8577"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="CTC"
                              title="7 to 14 Lakhs 1"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="CTC"
                              title="14 to 28 Lakhs 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="CTC"
                              title="28 Lakhs or more 0"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              currentIndex={currentIndex}
                              name="CTC"
                              title="Custom"
                            />
                          </div>
                        </details>
                      </div>
                    </div>

                    <div className="selection">
                      <div className="item">
                        <details>
                          <summary>Designation</summary>
                          <div>
                            <CheckboxTitle
                              onChange={onChange}
                              name="designation"
                              title="All"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              name="designation"
                              title="Software Engineer 25302"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              name="designation"
                              title="Senior Software Engineer 19469"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              name="designation"
                              title="Software Developer 10292"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              name="designation"
                              title="Developer 6524"
                            />
                            <CheckboxTitle
                              onChange={onChange}
                              name="designation"
                              title="Consultant 6521"
                            />
                            <Link to="/">
                              <span>Show More</span>
                            </Link>
                          </div>
                        </details>

                        <details>
                          <summary>Experience</summary>
                          <div>
                            <CheckboxTitle
                              name="experience"
                              onChange={onChange}
                              title="All"
                            />
                            <CheckboxTitle
                              name="experience"
                              onChange={onChange}
                              title="Freshers 0"
                            />
                            <CheckboxTitle
                              name="experience"
                              onChange={onChange}
                              title="Less than 1 year 52022"
                            />
                            <CheckboxTitle
                              name="experience"
                              onChange={onChange}
                              title="1 to 2 years 9162"
                            />
                            <CheckboxTitle
                              name="experience"
                              onChange={onChange}
                              title="2 to 5 years 81564"
                            />
                            <CheckboxTitle
                              name="experience"
                              onChange={onChange}
                              title="5 to 8 years 151329"
                            />
                            <CheckboxTitle
                              name="experience"
                              onChange={onChange}
                              title="8 to 15 years 203967"
                            />
                            <CheckboxTitle
                              name="experience"
                              onChange={onChange}
                              title="15 to 30 years 27987"
                            />
                            <CheckboxTitle
                              name="experience"
                              onChange={onChange}
                              title="More than 30 years 1898"
                            />
                            <CheckboxTitle
                              name="experience"
                              onChange={onChange}
                              title="Custom"
                            />
                          </div>
                        </details>

                        <details>
                          <summary>Key Skills</summary>
                          <div>
                            <CheckboxTitle
                              name="Key Skills"
                              onChange={onChange}
                              title="All"
                            />
                            <CheckboxTitle
                              name="Key Skills"
                              onChange={onChange}
                              title="Java 148941"
                            />
                            <CheckboxTitle
                              name="Key Skills"
                              onChange={onChange}
                              title="SQL 129962"
                            />
                            <CheckboxTitle
                              name="Key Skills"
                              onChange={onChange}
                              title="HTML 117635"
                            />
                            <CheckboxTitle
                              name="Key Skills"
                              onChange={onChange}
                              title="Javascript 89513"
                            />
                            <CheckboxTitle
                              name="Key Skills"
                              onChange={onChange}
                              title="Testing 80374"
                            />
                            <Link to="/">
                              <span>Show More</span>
                            </Link>
                          </div>
                        </details>
                      </div>
                    </div>

                    <div className="selection">
                      <div className="item">
                        <details>
                          <summary>institute</summary>
                          <div>
                            <CheckboxTitle
                              name="institute"
                              onChange={onChange}
                              title="All"
                            />
                            <CheckboxTitle
                              name="institute"
                              onChange={onChange}
                              title="Other 299304"
                            />
                            <CheckboxTitle
                              name="institute"
                              onChange={onChange}
                              title="Mumbai University 3318"
                            />
                            <CheckboxTitle
                              name="institute"
                              onChange={onChange}
                              title="Pune University 2989"
                            />
                            <CheckboxTitle
                              name="institute"
                              onChange={onChange}
                              title="Anna University 2170"
                            />
                            <CheckboxTitle
                              name="institute"
                              onChange={onChange}
                              title="Osmania University 967"
                            />

                            <Link to="/">
                              <span>Show More</span>
                            </Link>
                          </div>
                        </details>

                        <details>
                          <summary>Course</summary>
                          <div>
                            <CheckboxTitle
                              name="Course"
                              onChange={onChange}
                              title="All"
                            />
                            <CheckboxTitle
                              name="Course"
                              onChange={onChange}
                              title="B.Tech/B.E. 238980"
                            />
                            <CheckboxTitle
                              name="Course"
                              onChange={onChange}
                              title="B.Sc 33418"
                            />
                            <CheckboxTitle
                              name="Course"
                              onChange={onChange}
                              title="MBA/PGDM 27304"
                            />
                            <CheckboxTitle
                              name="Course"
                              onChange={onChange}
                              title="M.Tech 17810"
                            />
                            <CheckboxTitle
                              name="Course"
                              onChange={onChange}
                              title="PG Diploma 10634"
                            />

                            <Link to="/">
                              <span>Show More</span>
                            </Link>
                          </div>
                        </details>
                      </div>
                    </div>

                    <div className="selection">
                      <h5>Added By</h5>
                      <div className="item">
                        <div className="mt-3">
                          <CheckboxTitle
                            name="Added By"
                            onChange={onChange}
                            title="All"
                          />
                        </div>
                        <details>
                          <details>
                            <summary>Active Recruiters</summary>
                            <div>
                              <CheckboxTitle
                                name="Active Recruiters"
                                onChange={onChange}
                                title="spgrecruiters@gmail.com 527985"
                              />
                              <CheckboxTitle
                                name="Active Recruiters"
                                onChange={onChange}
                                title="harsh@spgrecuiters.com 5"
                              />
                            </div>
                          </details>

                          <details>
                            <summary>Inactive Recruiters</summary>
                            <div>
                              <CheckboxTitle
                                name="Inactive Recruiters"
                                onChange={onChange}
                                title="(empty)"
                              />
                            </div>
                          </details>
                        </details>

                        <details>
                          <summary>Notice Period</summary>
                          <div>
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="All"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="Serving Notice Period 1"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="15 days or less 0"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="1 months 4"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="2 months 0"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="3 months 0"
                            />

                            <Link to="/">
                              <span>Show More</span>
                            </Link>
                          </div>
                        </details>

                        <details>
                          <summary>Notice Period</summary>
                          <div>
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="All"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="Featured 0"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="Verified Email 5"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="Verified Mobile 5"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="Female Candidate Only 194447"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="Private CVs 527990"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="Non Private CVs 0"
                            />
                            <CheckboxTitle
                              name="Notice Period"
                              onChange={onChange}
                              title="Referred CVs 0"
                            />
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={9} md={12}>
                  <div className="filter-right">
                    <div className="top-bar">
                      <CheckboxTitle />
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
                        {" "}
                        <img src={iconRequirements} alt="" />
                        <span>Add to Requirements</span>
                      </button>
                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "12px" }}
                      >
                        <span>Show</span>
                        <Select
                          className="select"
                          options={options}
                          placeholder="10"
                        />
                        <span>Per Page</span>
                      </div>
                    </div>

                    {data?.map((val) => (
                      <div className="profile-card">
                        <div className="title">
                          <div className="name">
                            <Link
                              to="/profile-details"
                              style={{ color: "white" }}
                              className="btn"
                              state={{ profileID: val._id }}
                            >
                              <CheckboxTitle title={val.fullName} />
                            </Link>
                          </div>
                          <div className="add-btn">
                            {/* <Link
                              to="/profile-details"
                              style={{ color: "white" }}
                              className="btn"
                              state={{ profileID: val._id }}
                            >
                              View Profile Details
                            </Link> */}
                          </div>
                          <div className="icons">
                            <button
                              type="button"
                              onClick={() => deleteProfile(val._id)}
                            >
                              <img src={IconDelete} alt="" />
                            </button>
                            <Link
                              to="/add-profile"
                              state={{ profileID: val._id }}
                            >
                              <img src={iconEdit} alt="" />
                            </Link>
                          </div>
                        </div>
                        <div className="profile-content">
                          <Row>
                            <Col lg={6} md={6}>
                              <ul>
                                <li>
                                  <span>Experience:</span> {val.currentCompany}{" "}
                                  {val.currentDesignation}
                                </li>
                                <li>
                                  <span>Current Designation: </span>{" "}
                                  {val.currentDesignation}
                                </li>
                                <li>
                                  <span>Current Company: </span>{" "}
                                  {val.currentCompany}
                                </li>
                                <li>
                                  <span>Previous Designation: </span> Sr.
                                  Software Developer
                                </li>
                                <li>
                                  <span>Previous Company:</span> Sr. Software
                                  Developer
                                </li>
                                <li>
                                  <span>Functional Area:</span>{" "}
                                  {val.functionalArea}
                                </li>
                                <li>
                                  <span>Industry:</span>
                                  {val.industry}
                                </li>
                              </ul>
                            </Col>

                            <Col lg={6} md={6}>
                              <ul>
                                <li>
                                  <span>Experience:</span>{" "}
                                  {val.workExperience.years} Year(s){" "}
                                  {val.workExperience.months} Month (s)
                                </li>
                                <li>
                                  <span>Current Designation: </span>{" "}
                                  {val.currentDesignation}
                                </li>
                                <li>
                                  <span>Current Company: </span>{" "}
                                  {val.currentCompany}
                                </li>
                                <li>
                                  <span>Previous Designation: </span> Sr.
                                  Software Developer
                                </li>
                                <li>
                                  <span>Previous Company:</span> Sr. Software
                                  Developer
                                </li>
                                <li>
                                  <span>Functional Area:</span>{" "}
                                  {val.functionalArea}
                                </li>
                                <li>
                                  <span>Industry:</span>
                                  {val.industry}
                                </li>
                              </ul>
                            </Col>
                            <ul className="ps-3">
                              <li>
                                <span>Key Skills:</span> Coordination, Back
                                Office Support, Recruitment, Public Relations
                              </li>
                            </ul>

                            <div className="applied">
                              <ul className="ps-3">
                                <li>
                                  <span>Applied on:</span> 30th July 22
                                </li>
                                <li>|</li>
                                <li>
                                  <span>Applied on:</span> 30th July 22
                                </li>
                                <li>|</li>
                                <li>
                                  <span>Applied on:</span> 30th July 22
                                </li>
                              </ul>
                            </div>

                            <div className="bottom">
                              <div className="comment">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src={iconMove} alt="" /> Move to
                                    Requirement
                                  </li>
                                  <li>
                                    {" "}
                                    <img src={iconComment} alt="" /> Add a
                                    Comment
                                  </li>
                                </ul>
                              </div>
                              <div className="rate">
                                <h5>Rate this profile:</h5>
                                <ul>
                                  <li>
                                    <img src={iconSmile1} alt="" />
                                  </li>
                                  <li>
                                    <img src={iconSmile2} alt="" />
                                  </li>
                                  <li>
                                    <img src={iconSmile3} alt="" />
                                  </li>
                                  <li>
                                    <img src={iconSmile4} alt="" />
                                  </li>
                                  <li>
                                    <img src={iconSmile5} alt="" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Row>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Profile;
