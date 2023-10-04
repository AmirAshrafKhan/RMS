import React, { useEffect, useState } from "react";
import "./manage-employer.scss";
import { Button, ButtonGroup } from "react-bootstrap";
import { IconLeftErrow, IconRightErrow } from "assets/images";
import Select from "react-select";
import DataTable from "react-data-table-component";
import CheckboxTitle from "components/checkbox-title";
import CommonButton from "components/common-button";
import axios from "axios";
import { apiBase } from "apiBase";
const columns = [
  {
    name: "Employer Name",
    cell: (row) => (
      <div>
        <span>{row?.employerName}</span>
        <p>{row?.subtitle}</p>
      </div>
    ),
    width: "400px",
  },

  {
    name: "Added / Updated on",
    selector: (row) => row.addedOrUpdatedOn,
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
const ManageEmployer = () => {

  const [selectedId,setSelectedId]=useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
       fetchData();
  }, []);

  const fetchData = async () => {
    try {
      
      const response = await apiBase.get("employers/",{ headers: { Authorization: localStorage.getItem("token")}}
      );
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  const options = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
  ];

  const onSelected=(state) => {
    console.log(state,'state')
    let Ids=state.selectedRows.map(function(e){
      return e._id
    })
    console.log(Ids,"Ids")
    setSelectedId(Ids);

  }

  const deleteEmp = async() => {
    
    

    let token= localStorage.getItem("token");
      try {
        const response = await apiBase.delete(`employer/delete/${selectedId}`,{ headers: { Authorization: token}}
        );
        console.log(response.data,'response.data')
        if(response.data.data!==undefined && response.data.data!==null){
          console.log("enter");
          // setData(response.data.data);
          fetchData();

        }else{
          // setData(updatedData);
        }
        // setLoading(false);
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="manage-employer">
      
      <div className="table">
        <div className="top-header">
          <div className="left">
            <CheckboxTitle />

            <CommonButton title="Delete" type="button" onClick={deleteEmp}/>
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
          selectableRowsSingle
          selectableRows
          selectableRowsNoSelectAll
          selectableRowsHighlight
          // onSelectedRowsChange={onSelected}
          onSelectedRowsChange={(state)=>setSelectedId(state.selectedRows[0]._id)}

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

export default ManageEmployer;
