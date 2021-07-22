import { gql } from "@apollo/client";

const SEARCH = gql`
  query SEARCH($searchValue: String!) {
    search(query: $searchValue, type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
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
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;

export default SEARCH;
