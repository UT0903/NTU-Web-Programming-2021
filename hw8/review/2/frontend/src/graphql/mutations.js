import { gql } from "@apollo/client";

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox($name1: String!, $name2: String!) {
    createChatBox(name1: $name1, name2: $name2) {
      id
      users {
        id
        name
      }
      name
      messages {
        id
        sender {
          id
          name
        }
        body
      }
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($name1: String!, $name2: String!, $body: String!) {
    createMessage(name1: $name1, name2: $name2, body: $body) {
      id
      sender {
        id
        name
      }
      body
    }
  }
`;
