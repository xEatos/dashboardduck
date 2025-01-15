import { useQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { GetUploadStatusQuery, GetUploadStatusQueryVariables } from '../__generated__/graphql';

export const GET_UPLOAD_STATUS = gql(`
  query GetUploadStatus($uploadId: String!) {
  getUploadStatus(uploadId: $uploadId) {
    id
    message
  }
}
`);

export const useGetUploadStatus = (uploadId: string, pollInterval?: number) => {
  const response = useQuery<GetUploadStatusQuery, GetUploadStatusQueryVariables>(
    GET_UPLOAD_STATUS,
    {
      variables: {
        uploadId
      },
      ...(pollInterval ? { pollInterval } : {})
    }
  );
  return response;
};
