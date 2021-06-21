import { gql } from '@apollo/client';

export const CHATROOMS_QUERY = gql`
  query chatrooms($query: String!){
    chatrooms(query: $query){
      id
      name
      messages {
        id
        sender
        body
      }
    }
  }
`;
