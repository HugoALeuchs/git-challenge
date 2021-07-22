import React from "react";
import RepositoriesList from "./Components/RepositoriesList";

import { useQuery } from "@apollo/client";

import userRoute from "../routes/UserRoute";

import { Container, Col, Row, Image } from "react-bootstrap";

function GitHome() {
  const { loading, error, data } = useQuery(userRoute, {
    variables: {
      name: "HugoALeuchs",
    },
  });

  if (loading) {
    return (
      <Container style={{height: '100vh'}} className="d-flex flex-column align-items-center justify-content-center">
      <div className="spinner-border text-light" role="status">
        <span className="sr-only"></span>
      </div>
      </Container>
    );
  }
  if (error) {
    return <p>Error! {error.message}</p>;
  }

  if (data) {
    const { ...user } = data.user;

    return (
      <Container>
        <Row xs={1} lg={2}>
          <Col
            xs={12}
            md={4}
            className="d-flex flex-column align-items-center mt-5"
          >
            <Image className="w-50" src={user.avatarUrl} roundedCircle fluid />
            <h1 className="mt-2 text-center text-light">{user.name}</h1>
            <p className="text-light">{user.location}</p>
            <p className="text-light">{user.email}</p>
          </Col>
          <Col xs={12} md={8}>
            <RepositoriesList></RepositoriesList>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default GitHome;
