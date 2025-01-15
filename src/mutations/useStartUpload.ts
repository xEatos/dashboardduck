import { gql } from '../__generated__';

export const START_IMPORT = gql(`
  mutation StartWlpVideosImport($userId: String!) {
  startWlpVideosImport(userId: $userId) {
    id
    message
  }
}
  `);
