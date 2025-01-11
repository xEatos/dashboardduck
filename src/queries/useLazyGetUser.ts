import { gql } from '../__generated__';

export const LAZY_GET_USER = gql(`
  query GetUser($email: String!) {
  getUser(email: $email) {
    email
    id
  }
}
`);
