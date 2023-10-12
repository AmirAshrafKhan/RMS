import React, { useEffect, useState } from "react";
import "./myprofile.scss";
import { Col, Container, Row } from "react-bootstrap";
import Heading from "components/heading";
import { iconEdit } from "assets/images";
import useModal from "hooks/useModal";
import EditProfile from "components/modal/EditProfile";
import axios from "axios";
import { apiBase } from "apiBase";
import { allRoutes } from "constants/allRoutes";
import { Navigate, Route, Routes, useNavigate, Link } from "react-router-dom";

const MyProfile = () => {
  const { isShowing, toggle } = useModal();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiBase.get("my-profile/details", {
          headers: { Authorization: localStorage.getItem("token") },
        });

        if (response.status === 200) {
          setData(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsAuth(false);
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <section className="my-profile section-padding">
        <Container>
          <Heading
            title="My Profile"
            description="Manage your profile from here."
          />
          <span>
            <button className="btn" onClick={handleLogout}>
              Sign Out{" "}
            </button>
          </span>
          <Row>
            <Col lg={8} md={12}>
              <div className="details">
                <div className="item">
                  <div className="topbar">
                    <h4>Profile Details</h4>
                    <button onClick={toggle} href="/">
                      <img src={iconEdit} alt="" />
                    </button>
                  </div>
                  <div className="bottom">
                    <div className="left">
                      <h4>{data?.name}</h4>
                      <p>SPG Recruiters Private Limited</p>
                    </div>
                    <div className="right">
                      <p>
                        <span>Phone No. :</span> {data?.phoneNo}
                      </p>
                      <p>
                        <span>Email:</span> {data?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4} md={12}></Col>
          </Row>
        </Container>
      </section>

      <EditProfile isConfirm={isShowing} closeConfirm={toggle} />
    </>
  );
};

export default MyProfile;
