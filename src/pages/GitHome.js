import React from "react";
import RepositoriesTable from "./Components/RepositoriesTable";

import { useQuery } from "@apollo/client";

import userRoute from "../routes/UserRoute";

import { Container, Col, Row, Image } from "react-bootstrap";

function GitHome(props) {
  const { loading, error, data } = useQuery(userRoute, {
    variables: {
      name: "HugoALeuchs",
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error! {error.message}</p>;
  }

  if (data) {
    const { ...user } = data.user;

    return (
      <Container>
        <Row>
          <Col>
            <Image src={user.avatarUrl} roundedCircle fluid />
            <h1>{user.name}</h1>
            <p>{user.location}</p>
            <p>{user.email}</p>
          </Col>
          <Col>
            <RepositoriesTable></RepositoriesTable>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default GitHome;
