import { gql } from "@apollo/client";

export const CHATBOX_SUBSCRIPTION = gql`
  subscription message($chatBoxName: String!) {
    message(chatBoxName: $chatBoxName) {
      data {
        id
        sender {
          name
        }
        body
      }
    }
  }
`;
