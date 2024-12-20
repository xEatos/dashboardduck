import { useSuspenseQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { SingleMediumQuery, SingleMediumQueryVariables } from '../__generated__/graphql';

const GET_MEDIUM = gql(`
  query SingleMedium($mediumId: ID!) {
  medium(mediumId: $mediumId) {
    id
    type
    title
    publication
    languages
    channel {
      ... on WikiDataResource {
        id
        label
      }
      ... on WikiDataLiteral {
        value
        type
        lang
      }
    }
    thumbnail
    categories {
      ... on WikiDataResource {
        id
        label
      }
      ... on WikiDataLiteral {
        value
        type
        lang
      }
    }
    subtitleLanguages
    duration
    transcripts {
      chapters {
        id
        heading
        startTimestamp
        endTimestamp
      }
      language
    }
    caption {
      id
      text
    }
  }
}
`);

export const useGetMedium = (mediumId: string) => {
  const { data } = useSuspenseQuery<SingleMediumQuery, SingleMediumQueryVariables>(GET_MEDIUM, {
    variables: {
      mediumId
    }
  });

  return data.medium;
};
