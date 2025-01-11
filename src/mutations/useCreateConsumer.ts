import { gql } from '../__generated__';

export const CREATE_CONSUMER = gql(`
mutation CreateOrUpdateConsumer($consumerInput: UserConsumerInput!) {
  createOrUpdateConsumer(consumerInput: $consumerInput) {
    id
    key
    secret
  }
}
`);
