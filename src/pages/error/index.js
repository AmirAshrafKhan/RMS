import React from "react";
import Heading from "components/heading";
import { Container } from "react-bootstrap";

const Error = () => {
  return (
    <section className="error section-padding">
      <Container>
        <Heading title="page not found" />
      </Container>
    </section>
  );
};

export default Error;
