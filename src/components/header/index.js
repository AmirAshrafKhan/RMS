import {
  iconAvatar,
  iconBail,
  iconLogo,
  iconSearch,
  iconSetting,
} from "assets/images";
import "./header.scss";
import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { allRoutes } from "constants/allRoutes";
const Header = () => {
  return (
    <header>
      <Navbar expand="lg">
        <Container>
          <div className="header-top">
            <Navbar.Brand as={Link} to={allRoutes.home}>
              <img src={iconLogo} alt="" />
            </Navbar.Brand>
            <Nav className="ml-auto d-flex align-items-center">
              <Nav.Link as={Link} to={allRoutes.home}>
                <div className="form-group has-search">
                  <span className="icon form-control-feedback">
                    <img src={iconSearch} alt="" />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <span>More </span>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to={allRoutes.advanced}>
                Advance Search
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>

      <Container>
        <div className="header-bottom">
          <Nav>
            <Nav.Link as={NavLink} to={allRoutes.home}>
              Home
            </Nav.Link>

            <NavDropdown
              as={NavLink}
              to={allRoutes.home}
              title="Requirements"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={NavLink} to={allRoutes.home}>
                View All Requirements
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={allRoutes.addRequirements}>
                Add A New Requirements
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Profiles" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to={allRoutes.profile}>
                {/* <NavDropdown.Item as={NavLink} to={allRoutes.profileDetails}> */}
                View All Profiles
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={allRoutes.addProfile}>
                Add A New Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={allRoutes.uploadBulkProfile}>
                Upload Bulk Profiles
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={allRoutes.home}>
                View All Applications
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to={allRoutes.reporting}>
              Reporting
            </Nav.Link>
          </Nav>

          <div className="user-profile">
            <ul>
              <li>
                <NavLink to={allRoutes.setting}>
                  <img src={iconSetting} alt="" />
                </NavLink>
              </li>
              <li>
                <NavLink to={allRoutes.notification}>
                  <img src={iconBail} alt="" />
                </NavLink>
              </li>
              <li>
                <Link to={allRoutes.myProfile}>
                  <img src={iconAvatar} alt="" className="avatar" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
