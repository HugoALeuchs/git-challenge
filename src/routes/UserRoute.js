import { gql } from "@apollo/client";

const USER = gql`
  query USER($name: String!) {
    user(login: $name) {
      name
      avatarUrl
      location
    }
  }
`;

export default USER;
