import { gql } from "@apollo/client";

const REPOSITORIESSEARCHROUTE = gql`
  query REPOSITORIESSEARCHROUTE(
    $next: Int
    $previous: Int
    $after: String
    $before: String
    $query: String!
  ) {
    search(
      type: REPOSITORY
      first: $next,
      last: $previous,
      after: $after, 
      before: $before, 
      query: $query
    ) {
      edges {
        node {
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
`;

export default REPOSITORIESSEARCHROUTE;
