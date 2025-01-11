import { useSuspenseQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { GetYoutubeKeyQuery, GetYoutubeKeyQueryVariables } from '../__generated__/graphql';

const GET_YOUTUBE_KEY = gql(`
  query GetYoutubeKey($userId: String!) {
    getYoutubeKey(userId: $userId) {
      ... on UserYouTubeKey {
        id
        youTubeKey
      }
      ... on NoYouTubeKeyRegistered {
        id
      }
    }
  }
  `);

export const useGetYouTubeKey = (userId: string) => {
  const { data } = useSuspenseQuery<GetYoutubeKeyQuery, GetYoutubeKeyQueryVariables>(
    GET_YOUTUBE_KEY,
    { variables: { userId } }
  );
  return data;
};
