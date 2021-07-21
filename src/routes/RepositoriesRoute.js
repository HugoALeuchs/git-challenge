import { gql } from "@apollo/client";

const REPOSITORIES = gql`
  query REPOSITORIES($page: Int!) {
    viewer {
      repositories(first: $page) {
        nodes {
          id
          name
          description
          url
          languages(first: 2) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
`;

export default REPOSITORIES;
