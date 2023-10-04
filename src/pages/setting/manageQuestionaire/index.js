import React from "react";
import "./manage-questionaire.scss";
import { Button, ButtonGroup } from "react-bootstrap";
import { IconLeftErrow, IconRightErrow } from "assets/images";
import Select from "react-select";
import DataTable from "react-data-table-component";
import CheckboxTitle from "components/checkbox-title";
import CommonButton from "components/common-button";

const columns = [
  {
    name: "Employer Name",
    cell: (row) => (
      <div>
        <span>{row?.title}</span>
        <p>{row?.subtitle}</p>
      </div>
    ),
    width: "400px",
  },

  {
    name: "Added / Updated on",
    selector: (row) => row.addedUpdatedOn,
  },
  {
    name: "Added By",
    selector: (row) => row.addedBy,
    // width: "200px",
  },
];

const data = [
  {
    id: 1,
    title: "SRP-030",
    subtitle: "Created By You",
    addedUpdatedOn: "SRP Pvt Ltd",
    addedBy: 0,
  },
  {
    id: 2,
    title: "MTCH SELL",
    subtitle: "Created By You",
    addedUpdatedOn: "MTCH co.",
    addedBy: 1,
  },
  {
    id: 3,
    title: "DDOG BUY",
    subtitle: "Created By You",
    addedUpdatedOn: "DDGO Corp.",
    addedBy: 1,
  },
  {
    id: 4,
    title: "ARKG BUY",
    subtitle: "Created By You",
    addedUpdatedOn: "ARKG LLP",
    addedBy: 1,
  },
  {
    id: 5,
    title: "SQ BUY",
    subtitle: "Created By You",
    addedUpdatedOn: "SQ International",
    addedBy: 0,
  },
  {
    id: 6,
    title: "MSTR SELL",
    subtitle: "Created By You",
    addedUpdatedOn: "MSTR Fintech ",
    addedBy: 0,
  },
];

const ManageQuestionaire = () => {
  const options = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
  ];

  return (
    <div className="manage-questionaire">
      <div className="table">
        <div className="top-header">
          <div className="left">
            <CheckboxTitle />

            <CommonButton title="Delete" />
          </div>

          <div className="right">
            <ul>
              <li>Show</li>
              <li>
                <Select className="select" options={options} placeholder="10" />
              </li>
              <li>Per Page </li>
            </ul>
          </div>
        </div>
        <DataTable
          className="global-table"
          columns={columns}
          data={data}
          selectableRows
          selectableRowsNoSelectAll
          selectableRowsHighlight
        />
        <div className="pagination flex-wrap">
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
  );
};

export default ManageQuestionaire;
