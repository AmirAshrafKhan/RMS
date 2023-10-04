import React, { useEffect, useState } from "react";
import "./requirements.scss";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import {
  IconDelete,
  iconGraysearch,
  IconLeftErrow,
  IconRightErrow,
  Icondownload,
} from "assets/images";
import Select from "react-select";
import DataTable from "react-data-table-component";
import CheckboxTitle from "components/checkbox-title";
import CommonButton from "components/common-button";
import Heading from "components/heading";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiBase } from "apiBase";

// const data = [
//   {
//     id: 1,
//     title: "SRP-030",
//     subtitle: "Created By You",
//     company: "SRP Pvt Ltd",
//     number: "0",
//     modified: "Jan 13, 2022",
//     icons: "icons",
//   },
//   {
//     id: 2,
//     title: "MTCH SELL",
//     subtitle: "Created By You",
//     company: "MTCH co.",
//     number: "1",
//     modified: "Jan 13, 2022",
//     icons: "icons",
//   },
//   {
//     id: 3,
//     title: "DDOG BUY",
//     subtitle: "Created By You",
//     company: "DDGO Corp.",
//     number: "1",
//     modified: "Jan 13, 2022",
//     icons: "icons",
//   },
//   {
//     id: 4,
//     title: "ARKG BUY",
//     subtitle: "Created By You",
//     company: "ARKG LLP",
//     number: "1",
//     modified: "Jan 13, 2022",
//     icons: "icons",
//   },
//   {
//     id: 5,
//     title: "SQ BUY",
//     subtitle: "Created By You",
//     company: "SQ International",
//     number: "0",
//     modified: "Jan 13, 2022",
//     icons: "icons",
//   },
//   {
//     id: 6,
//     title: "MSTR SELL",
//     subtitle: "Created By You",
//     company: "MSTR Fintech ",
//     number: "0",
//     modified: "Jan 13, 2022",
//     icons: "icons",
//   },
// ];

const token = localStorage.getItem("token");
const apiUrl = "http://3.15.201.35:3000/requirements/";

const Requirements = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchfilters, setSearchFilters] = useState({
    requirementTitle: "",
    employmentType: "",
    jobLocations: "",
  });

  useEffect(() => {
    // localStorage.clear();
    let token = localStorage.getItem("token");
    let itm = localStorage.getItem("token");

    console.log(token, "token in rquirement", itm);

    if (token !== "undefined" && token !== null) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    let token = localStorage.getItem("token");
    console.log(token, "token");
    try {
      const response = await apiBase.get("requirements/", {
        headers: { Authorization: token },
      });
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //del a requirement

  const deleteRequirement = async (id) => {
    const updatedData = data.filter((req) => req.id !== id);

    let token = localStorage.getItem("token");
    try {
      const response = await apiBase.delete(`requirement/delete/${id}`, {
        headers: { Authorization: token },
      });
      console.log(response.data, "response.data");
      if (response.data.data !== undefined && response.data.data !== null) {
        console.log("enter");
        fetchData();
        // setData(response.data.data);
      } else {
        setData(updatedData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //download a requirement

  // const downloadFile = (url) => {
  //   axios({
  //     url: url,
  //     method: "GET",
  //     responseType: "blob",
  //   }).then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "filename.extension");
  //     document.body.appendChild(link);
  //     link.click();
  //   });
  // };

  const columns = [
    {
      name: "Requirement Title",
      // selector: (row) => row.title,
      cell: (row) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/requirement-details", { state: { ID: row._id } });
          }}
        >
          <span>{row?.requirementTitle}</span>
          <p>{row?.employmentType}</p>
        </div>
      ),
    },

    {
      name: "Employer",
      selector: (row) => row.contactDetails.companyName,
      width: "200px",
    },
    {
      name: "Number of Applications",
      selector: (row) => row.vacancies,
      width: "200px",
    },
    {
      name: "Last Modified",
      selector: (row) => row.modified,
      width: "200px",
    },

    {
      width: "120px",
      cell: (row) => (
        <div>
          <button type="button">
            <img
              src={Icondownload}
              alt=""
              // onClick={() => downloadFile(row.downloadUrl)}
            />
          </button>
          <button type="button" onClick={() => deleteRequirement(row._id)}>
            <img src={IconDelete} alt="" />
          </button>
        </div>
      ),
    },
  ];

  const searchRequirment = async (e) => {
    let requirementTitle = e.target.value;
    console.log(e.target.value === "", "value");

    if (e.target.value === "") {
      fetchData();
    } else {
      try {
        const response = await apiBase.get(`search`, {
          params: { requirementTitle },
          headers: { Authorization: token },
        });
        console.log(response.data, "response.data");
        if (response.data.data !== undefined && response.data.data !== null) {
          console.log("enter");
          setData(response.data.data);
          // fetchData();
        } else {
          // setData(updatedData);
        }
        // setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <section className="requirements section-padding">
        <Container>
          <div className="content">
            <div className="item">
              {/* <div className="title">
                <h1>List Of Requirements</h1>
                <h5>View your added requirements.</h5>
              </div> */}
              <Heading
                title="List Of Requirements"
                description="View your added requirements."
              />
              <div className="add-btn">
                <Link to="/add-requirements" className="btn">
                  + Add/ Post/ Create
                </Link>
              </div>
            </div>
            <div className="filter">
              <div className="search">
                <div className="form-group has-search">
                  <span className="icon form-control-feedback">
                    <img src={iconGraysearch} alt="" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for Requirements"
                    onChange={searchRequirment}
                  />
                </div>
              </div>

              <div className="status">
                <h5>Filter by:</h5>

                <Select
                  className="select"
                  options={options}
                  placeholder="Status"
                />

                <Select
                  className="select"
                  options={options}
                  placeholder="All"
                />
              </div>
            </div>

            <div className="table">
              <div className="top-header">
                <div className="left">
                  {/* <CheckboxTitle /> */}

                  <CommonButton title="Close" />

                  <CommonButton title="Search for Selected Requirement" />
                </div>

                <div className="right">
                  <ul>
                    <li>Show</li>
                    <li>
                      <Select
                        className="select"
                        options={options}
                        placeholder="10"
                      />
                    </li>
                    <li>Per Page </li>
                    <li>:</li>
                  </ul>
                </div>
              </div>
              {data && data.length > 0 && (
                <DataTable
                  className="global-table"
                  columns={columns}
                  data={data}
                  // selectableRows
                  selectableRowsNoSelectAll
                  // selectableRowsHighlight
                />
              )}
              {/* <DataTable
                className="global-table"
                columns={columns}
                data={data}
                selectableRows
                selectableRowsNoSelectAll
                selectableRowsHighlight
                progressPending={loading}
              /> */}
              <div className="pagination">
                <h5>Page 1 of 10</h5>
                <ButtonGroup>
                  <Button>
                    <img src={IconLeftErrow} alt="" /> Previous
                  </Button>
                  <Button>1</Button>
                  <Button>2</Button>
                  <Button>3</Button>
                  <Button>...</Button>
                  <Button>8</Button>
                  <Button>9</Button>
                  <Button>10</Button>
                  <Button>
                    Next <img src={IconRightErrow} alt="" />{" "}
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Requirements;
