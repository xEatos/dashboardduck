import { useSuspenseQuery } from '@apollo/client';
import { gql } from '../__generated__';
import {
  TranscriptChaptersQuery,
  TranscriptChaptersQueryVariables
} from '../__generated__/graphql';

const GET_TRANSCRIPTS = gql(`
  query TranscriptChapters($transcriptIds: [ID!]!) {
  transcriptChapters(transcriptIds: $transcriptIds) {
    id
    text
  }
}
`);

export const useGetTranscripts = (ids: string[]) => {
  const { data } = useSuspenseQuery<TranscriptChaptersQuery, TranscriptChaptersQueryVariables>(
    GET_TRANSCRIPTS,
    {
      variables: {
        transcriptIds: ids
      }
    }
  );
  return data.transcriptChapters?.map((v) => v ?? undefined);
};
