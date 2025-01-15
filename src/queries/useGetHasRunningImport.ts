import { useSuspenseQuery } from '@apollo/client';
import { gql } from '../__generated__';
import {
  HasUserRunningImportQuery,
  HasUserRunningImportQueryVariables
} from '../__generated__/graphql';

const HAS_RUNNING_IMPORTS = gql(`
  query HasUserRunningImport($userId: String!) {
  hasUserRunningImport(userId: $userId) {
    uploadId
    message
  }
}`);

export const useHasRunningImports = (userId: string) => {
  console.log('useHasRunningImports - userId:', userId);
  const { data } = useSuspenseQuery<HasUserRunningImportQuery, HasUserRunningImportQueryVariables>(
    HAS_RUNNING_IMPORTS,
    {
      variables: {
        userId
      },
      fetchPolicy: 'no-cache'
    }
  );
  console.log('useHasRunningImports - data:', data);
  return data;
};
