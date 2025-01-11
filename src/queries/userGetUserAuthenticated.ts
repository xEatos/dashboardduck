import { useQuery, useSuspenseQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { IsAuthenticatedQuery, IsAuthenticatedQueryVariables } from '../__generated__/graphql';

export const GET_USER_IS_AUTHENTICATED = gql(`
  query IsAuthenticated($userId: String!) {
  isAuthenticated(userId: $userId) {
    id
    status
  }
}
  `);
export const useIsUserAuthenticated = (userId: string, pollInterval?: number) => {
  const response = useQuery<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>(
    GET_USER_IS_AUTHENTICATED,
    {
      variables: {
        userId
      },
      ...(pollInterval ? { pollInterval } : {})
    }
  );
  return response;
};
