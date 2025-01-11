import { useSuspenseQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { GetUploadStatusQuery, GetUploadStatusQueryVariables } from '../__generated__/graphql';

export const GET_UPLOAD_STATUS = gql(`
  query GetUploadStatus($userId: String!) {
  getUploadStatus(userId: $userId) {
    id
    message
  }
}
`);

export const useGetUploadStatus = (userId: string) => {
  const { data } = useSuspenseQuery<GetUploadStatusQuery, GetUploadStatusQueryVariables>(
    GET_UPLOAD_STATUS,
    {
      variables: {
        userId
      }
    }
  );
  return data;
};
