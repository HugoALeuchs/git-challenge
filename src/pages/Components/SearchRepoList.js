import React, { useState } from "react";
import SearchFilterBar from "./SearchFilterBar";

import { useQuery } from "@apollo/client";

// import searchRoute from "../../routes/SearchRoute";
import repositoriesRoute from "../../routes/RepositoriesRoute";

import { Card, Col, Row, Button } from "react-bootstrap";

function SearchRepoList(props) {
  const [firstPageCursor, setFirstPageCursor] = useState();
  const [lastPageCursor, setLastPageCursor] = useState();
  const [nextPages, setNextPages] = useState(5);
  const [previousPages, setPreviousPages] = useState();

  const [isFork, setForkInformation] = useState();
  const [isLoked, setLokedInformation] = useState();

  const [orderBy, setOrderBy] = useState("CREATED_AT");

  const { loading, error, data } = useQuery(repositoriesRoute, {
    variables: {
      next: nextPages,
      previous: previousPages,
      after: firstPageCursor,
      before: lastPageCursor,
      fork: isFork,
      locked: isLoked,
      orderBy: orderBy,
    },
  });

  function setNextPage() {
    setLastPageCursor();
    setNextPages(5);
    setPreviousPages();
    setFirstPageCursor(data.viewer.repositories.pageInfo.endCursor);
  }
  function setPreviusPage() {
    setFirstPageCursor();
    setNextPages();
    setPreviousPages(5);
    setLastPageCursor(data.viewer.repositories.pageInfo.startCursor);
  }

  function filterValue(value) {
    if (value === "Fork") {
      setLokedInformation();
      setForkInformation(true);
    } else if (value === "Arquivado") {
      setForkInformation();
      setLokedInformation(true);
    } else {
      setForkInformation();
      setLokedInformation();
    }
  }

  function sortValue(value) {
    if (value === "Último atualizado") {
      setOrderBy("PUSHED_AT");
    } else if (value === "Nome") {
      setOrderBy("NAME");
    } else if (value === "Estrelas") {
      setOrderBy("STARGAZERS");
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error! {error.message}</p>;
  }

  if (data) {
    var repositories = data.viewer.repositories.nodes.filter((repo) => repo.name.includes(props.searchValue));

    var pageInfos = data.viewer.repositories.pageInfo;

    return (
      <>
        <Row xs={1} className="mt-4 g-3">
          <SearchFilterBar
            filter={filterValue}
            sort={sortValue}
            search={props.searchController}
          ></SearchFilterBar>
          {repositories.map((repo) => (
            <Col key={repo.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{repo.name}</Card.Title>
                  <Card.Text>{repo.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  {repo.languages.nodes.map((language, index) => (
                    <small key={index} className="mx-1">
                      {language.name}
                    </small>
                  ))}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        <Row xs={2}>
          {pageInfos.hasPreviousPage ? (
            <Button
              className="mt-3 w-25 mx-auto"
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
              className="mt-3 w-25 mx-auto"
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

export default SearchRepoList;
