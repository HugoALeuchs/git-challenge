import React from "react";

import { useQuery } from "@apollo/client";

import repositoriesRoute from "../../routes/RepositoriesRoute";

import { Card, Col, Row } from "react-bootstrap";

function RepositoriesTable(props) {
  // const [pageController, setPageController] = useState();

  const { loading, error, data } = useQuery(repositoriesRoute, {
    variables: {
      page: 10,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error! {error.message}</p>;
  }

  if (data) {
    const repositories = data.viewer.repositories.nodes;

    return (
      <Row xs={1} md={2} className="g-4">
        {repositories.map((repo) => (
          <Col key={repo.id}>
            <Card>
              <Card.Body>
                <Card.Title>{repo.name}</Card.Title>
                <Card.Text>{repo.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
              {repo.languages.nodes.map((language) => (
                <small className='mx-1' >{language.name}</small>
              ))}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default RepositoriesTable;
