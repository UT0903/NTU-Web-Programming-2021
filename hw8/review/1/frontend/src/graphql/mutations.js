import { gql } from '@apollo/client';

export const CREATE_CHATROOM_MUTATION = gql`
  mutation createChatroom(
    $name: String!
  ) {
    createChatroom(
      name: $name
    ) {
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

export const UPDATE_CHATROOM_MUTATION = gql`
  mutation updateChatroom(
    $name: String!
    $sender: String!
    $body: String!
  ) {
    updateChatroom(
      name: $name
      data: {
        sender: $sender
        body: $body
      }
    ) {
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

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $name: String!
  ) {
    createUser(
      name: $name
    ) {
      id
      name
    }
  }
`;