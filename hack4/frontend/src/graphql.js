import { gql } from '@apollo/client';

const STATSCOUNT_QUERY = gql`
  query statsCount(
    $severity: Int
    $locationKeywords: [String!]!
  ){
    statsCount(severity:$severity, locationKeywords:$locationKeywords)
  }
`;
const UPLOAD_MUTATION = gql`
  mutation insertPeople(
    $data: [PersonInput!]!
  ){
    insertPeople(data:$data)
  }  
`;
const SUBSCRIPTION = gql`
  subscription people{
    people{
      ssn
      name
      severity
      location {
        name
        description
      }
    }
  }
`;

export { STATSCOUNT_QUERY, UPLOAD_MUTATION, SUBSCRIPTION };
