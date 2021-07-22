import React, { useState } from "react";
import SearchFilterBar from "./SearchFilterBar";

import { useQuery } from "@apollo/client";

import repositoriesSearchRoute from "../../routes/RepositoriesSearchRoute";

import { Container, Card, Col, Row, Button } from "react-bootstrap";

function RepositoriesList(props) {
  const [firstPageCursor, setFirstPageCursor] = useState();
  const [lastPageCursor, setLastPageCursor] = useState();
  const [nextPages, setNextPages] = useState(5);
  const [previousPages, setPreviousPages] = useState();

  const [query, setQuery] = useState("fork:true user:HugoALeuchs is:public");

  const [searchValueData, setSearchValue] = useState();

  const { loading, error, data } = useQuery(repositoriesSearchRoute, {
    variables: {
      next: nextPages,
      previous: previousPages,
      after: firstPageCursor,
      before: lastPageCursor,
      query: query,
    },
  });

  function setNextPage() {
    setLastPageCursor();
    setNextPages(5);
    setPreviousPages();
    setFirstPageCursor(data.search.pageInfo.endCursor);
  }
  function setPreviusPage() {
    setFirstPageCursor();
    setNextPages();
    setPreviousPages(5);
    setLastPageCursor(data.search.pageInfo.startCursor);
  }

  function filterValue(value) {
    if (value === "Fork") {
      setQuery("fork:false user:HugoALeuchs is:public");
    } else if (value === "Fechado") {
      setQuery(`${query} state:close`);
    } else if (value === "Arquivado") {
      setQuery(`${query} state:archived`);
    } else {
      setQuery("fork:true user:HugoALeuchs is:public");
    }
  }

  function sortValue(value) {
    if (value === "Último atualizado") {
      setQuery(`${query} sort:updated-desc`);
    } else if (value === "Nome") {
      setQuery(`${query} sort:name-asc`);
    } else if (value === "Estrelas") {
      setQuery(`${query} sort:stars-desc`);
    }
  }

  function searchValue(value) {
    setSearchValue(value);
    if (value) {
      setQuery(value + " fork:true user:HugoALeuchs is:public");
    } else {
      setQuery("fork:true user:HugoALeuchs is:public");
    }
  }

  if (loading) {
    return (
      <Container
        style={{ height: "100vh" }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
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
    var repositories = data.search.edges;

    var pageInfos = data.search.pageInfo;

    return (
      <>
        <Row xs={1} className=" mt-4 g-3">
          <SearchFilterBar
            filter={filterValue}
            sort={sortValue}
            search={searchValue}
            searchQuery={searchValueData}
          ></SearchFilterBar>
          {repositories.map((repo) => (
            <Col key={repo.node.id}>
              <Card className="bg-dark">
                <Card.Body>
                  <Card.Title className="text-light">
                    <a className="text-decoration-none" href={repo.node.url}>
                      {repo.node.name}
                    </a>
                  </Card.Title>
                  <Card.Text className="text-light">
                    {repo.node.description
                      ? repo.node.description.substring(0, 85) + ". . ."
                      : "Description not informed"}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex align-items-center text-light">
                  {repo.node.languages.nodes.length !== 0 ? (
                    repo.node.languages.nodes.map((language, index) => (
                      <>
                        <div
                          style={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                            backgroundColor: language.color,
                          }}
                        ></div>
                        <small key={index} className="mx-2">
                          {language.name}
                        </small>
                      </>
                    ))
                  ) : (
                    <small className="mx-2">{"Language not informed"}</small>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        <Row xs={2}>
          {pageInfos.hasPreviousPage ? (
            <Button
              className="m-3 w-25 mx-auto"
              variant="dark"
              onClick={setPreviusPage}
            >
              Previous
            </Button>
          ) : (
            <></>
          )}
          {pageInfos.hasNextPage ? (
            <Button
              className="m-3 w-25 mx-auto"
              variant="dark"
              onClick={setNextPage}
            >
              Next
            </Button>
          ) : (
            <></>
          )}
        </Row>
      </>
    );
  }
}

export default RepositoriesList;
