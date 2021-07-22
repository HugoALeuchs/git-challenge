import React, { useState } from "react";
import RepositoriesList from "./Components/RepositoriesList";

import { useQuery } from "@apollo/client";

import userRoute from "../routes/UserRoute";

import { Container, Col, Row, Image } from "react-bootstrap";
import SearchRepoList from "./Components/SearchRepoList";

function GitHome() {

  const [searchValueData, setSearchValueData] = useState();

  const { loading, error, data } = useQuery(userRoute, {
    variables: {
      name: "HugoALeuchs",
    },
  });

  function searchValue(value) {

    setSearchValueData(value);

  }

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
        <Row xs={1} lg={2}>
          <Col
            xs={12}
            md={4}
            className="d-flex flex-column align-items-center mt-5"
          >
            <Image className="w-50" src={user.avatarUrl} roundedCircle fluid />
            <h1 className="mt-2 text-center">{user.name}</h1>
            <p>{user.location}</p>
            <p>{user.email}</p>
          </Col>
          <Col xs={12} md={8}>
            {searchValueData ? 
              <SearchRepoList searchValue={searchValueData}></SearchRepoList>
              : 
              <RepositoriesList searchController={searchValue} ></RepositoriesList>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}
export default GitHome;
