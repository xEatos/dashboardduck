import { gql } from '../__generated__';

export const CREATE_USER = gql(`
  mutation CreateUser($email: String!) {
  createUser(email: $email) {
    email
    id
  }
}
`);
