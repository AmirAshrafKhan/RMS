import React from "react";
import "./newrequirements.scss";
import { Container } from "react-bootstrap";
import Heading from "components/heading";

const NewRequirements = () => {
  return (
    <section className="new-requirments section-padding">
      <Container>
        <div className="title">
          <Heading
            title="Add A New Requirement"
            description="Add new requirement by filling out this form"
          />
        </div>
      </Container>
    </section>
  );
};

export default NewRequirements;
