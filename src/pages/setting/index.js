import React, { useState } from "react";
import "./setting.scss";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import Heading from "components/heading";
import ManageEmployer from "./manageEmployer";
import CommonButton from "components/common-button";
import AddEmployerModal from "components/modal/AddEmployerModal";
import ManageQuestionaire from "./manageQuestionaire";
import ManageQuestionaireModal from "components/modal/ManageQuestionaireModal";
const Setting = () => {
  const [employerShowing, setEmployerShowing] = useState(false);
  const [manageQuestionShowing, setManageQuestionShowing] = useState(false);

  const employerHandler = () => {
    setEmployerShowing(!employerShowing);
  };
  const manageQuestionHandler = () => {
    setManageQuestionShowing(!manageQuestionShowing);
  };
  return (
    <>
      <section className="setting section-padding">
        <Container>
          <div className="mb-4 mb-md-5">
            <div className="setting-head">
              <Heading
                title="Settings"
                description="Manage the RMS from the settings"
              />
            </div>
          </div>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="manageEmployer"
          >
            <Row>
              <Col md={4} lg={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="manageEmployer">
                      Manage Employer
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="manageQuestionaire">
                      Manage Questionaire
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="manageEmail">Manage Email</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="manageVendors">Manage Vendors</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="manageExternalSourses">
                      Manage External Sources
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={8} lg={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="manageEmployer">
                    <CommonButton
                      title="+ Add new Employer"
                      onClick={employerHandler}
                    />{" "}
                    <ManageEmployer />
                  </Tab.Pane>
                  <Tab.Pane eventKey="manageQuestionaire">
                    <CommonButton
                      title="+ Add new Questionaire"
                      onClick={manageQuestionHandler}
                    />
                    <ManageQuestionaire />
                  </Tab.Pane>
                  <Tab.Pane eventKey="manageEmail">Manage Email</Tab.Pane>
                  <Tab.Pane eventKey="manageVendors">Manage Vendors</Tab.Pane>
                  <Tab.Pane eventKey="manageExternalSourses">
                    Manage External Sources
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </section>
      <AddEmployerModal
        isConfirm={employerShowing}
        closeConfirm={employerHandler}
      />

      <ManageQuestionaireModal
        isConfirm={manageQuestionShowing}
        closeConfirm={manageQuestionHandler}
      />
    </>
  );
};

export default Setting;
