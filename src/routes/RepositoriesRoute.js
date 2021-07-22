import { gql } from "@apollo/client";

const REPOSITORIES = gql`
  query REPOSITORIES($next: Int, $previous: Int, $after: String, $before: String, $fork: Boolean, $locked: Boolean, $orderBy: String) {
    viewer {
      repositories(first: $next, last: $previous,  privacy: PUBLIC, after: $after, before: $before, isFork: $fork, isLocked: $locked, orderBy: {field: $orderBy, direction: ASC}) {
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
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

export default REPOSITORIES;
