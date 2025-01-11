import { useSuspenseQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { UserConsumerQuery, UserConsumerQueryVariables } from '../__generated__/graphql';

const GET_USER_CONSUMER_TOKEN = gql(`
  query UserConsumer($userId: String!) {
  getConsumerToken(userId: $userId) {
    ... on UserConsumer {
      id
      key
      secret
    }
    ... on NoConsumerRegistered {
      id
    }
  }
}
`);

export const useSuspenseGetUserConsumerToken = (userId: string) => {
  const { data } = useSuspenseQuery<UserConsumerQuery, UserConsumerQueryVariables>(
    GET_USER_CONSUMER_TOKEN,
    {
      variables: {
        userId
      }
    }
  );

  return data;
};
