import Heading from "components/heading";
import React, { useRef, useState } from "react";
import { Card, Container } from "react-bootstrap";
import "./upload-bulk-profile.scss";
import { iconClose, iconTrash, iconProfileUpload } from "assets/images";
import axios from "axios";
import { apiBase } from "apiBase";

const apiUrl = "http://3.15.201.35:3000/uploads/bulk-profiles";

const UploadBulkProfile = () => {
  const [files, setFiles] = useState([]);
  const [fileErr, setFileErr] = useState("");

  const dragOverHandler = (e) => {
    e.preventDefault();
    setFileErr("");
    setFiles(e.dataTransfer.files);
  };
  const dropHandler = (e) => {
    e.preventDefault();
    setFileErr("");
    setFiles(e.dataTransfer.files);
  };
  //    The Array.from(file) line in your isValidFileUploaded function is causing an issue because file is not an array but a FileList object, fixed in the below code.

  // const isValidFileUploaded = (fileList) => {
  //   setFileErr("");

  //   const validExtensions = [".pdf", ".zip", ".doc", ".docx", ".rar"];
  //   let con = Array.from(fileList).map((val, ind) => {
  //     const fileExtension = val.type.split("/")[1];
  //     return validExtensions.includes(fileExtension);
  //   });

  //   let check = con.every((v) => v === true);
  //   return check;
  // };
  const isValidFileUploaded = (fileList) => {
    setFileErr("");

    const validExtensions = [".pdf", ".zip", ".doc", ".docx", ".rar"];
    let isValid = true;

    Array.from(fileList).forEach((file) => {
      const fileExtension = file.name.split(".").pop();
      if (!validExtensions.includes(`.${fileExtension}`)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const trashFile = (ind = null) => {
    if (ind === null) {
      const newFile = Array.from(files).filter((item, index) => null);
      setFiles(newFile);
    } else {
      const newFile = Array.from(files).filter((item, index) => index !== ind);
      setFiles(newFile);
    }
  };

  const uploadBulk = async () => {
    debugger;
    setFileErr("");
    console.log(files, "Files");
    console.log(isValidFileUploaded(files), "isValidFileUploaded(files)");

    if (isValidFileUploaded(files)) {
      setFileErr("");

      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("CV", file);
      });

      // const formData = new FormData();
      // formData.append(`cvs`, files);
      try {
        const response = await apiBase.post("uploads/bulk-profiles", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(response, "respose");

        if (response.status === 200) {
          setFiles(null);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setFileErr("Accept Only .zip, .pdf, .doc, .docx, .rar* ");
    }
  };
  return (
    <section className="upload-bulk-profile section-padding">
      <Container>
        <div className="content">
          <Heading
            title="Upload Bulk profile"
            description="Add profiles by uploading excel files"
          />
        </div>
        <Card>
          <label
            htmlFor="fileID"
            className="drop_box"
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
          >
            <div>
              <img src={iconProfileUpload} alt="" />
              <h4>
                Drag & drop files or <span>Browse</span>
              </h4>
              <p>Supported formates: zip, pdf, doc, csv, xlsx</p>
              <input
                type="file"
                name="file"
                hidden
                accept=".zip, .pdf, .doc, .docx, .rar, application/zip"
                id="fileID"
                onChange={(e) => setFiles(e.target.files)}
                multiple
              />
            </div>
          </label>
          {fileErr && <span className="text-danger">{fileErr}</span>}
          {files && (
            <div className="upload-item">
              <h5>
                Uploading - {files.length} {""} files
              </h5>
              {Array.from(files).map((file, idx) => (
                <>
                  <div className="upload-item-box">
                    <span key={idx}>{file.name}</span>
                    <div key={idx}>
                      <img
                        src={iconClose}
                        alt=""
                        onClick={() => trashFile(idx)}
                      />
                      {/* <img src={iconTrash} alt="" onClick={()=>setFiles(null)}/> */}
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
          <button className="btn" onClick={uploadBulk}>
            add profiles
          </button>
        </Card>
      </Container>
    </section>
  );
};

export default UploadBulkProfile;
