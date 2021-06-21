import { gql } from '@apollo/client';

export const CHATROOMS_SUBSCRIPTION = gql`
  subscription chatroom($name: String!){
    chatroom(name: $name) {
      mutation
      data {
        id
        name
        messages {
          sender
          body
        }
      }
    }
  }
`;
