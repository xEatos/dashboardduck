import { useSuspenseQuery } from '@apollo/client';
import { gql } from '../__generated__';
import {
  FilterSelectionInput,
  MediaQuery,
  MediaQueryVariables,
  MediumEdge
} from '../__generated__/graphql';

const GET_MEDIA = gql(`
  query Media($limit: Int!, $offsetMap: [OffsetPair!], $filter: [FilterSelectionInput!]) {
  mediaConnections(limit: $limit, filter: $filter, offsetMap: $offsetMap) {
    foundFilters {
      data {
        ... on WikiDataResource {
          id
          label
        }
        ... on WikiDataLiteral {
          lang
          value
          type
        }
      }
      filterId
    }
    media {
      edges {
        cursor
        node {
          channel
          duration
          id
          publication
          thumbnail
          title
          type
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        limit
        offset
        provenance
      }
    }
  }
}
`);

export interface Medium {
  id: string;
  cursor: string;
  title: string;
  channel: string;
  date: string;
  duration: number;
  thumbnail: URL;
  type: 'Video' | 'Podcast';
}

const toModel = ({ cursor, node }: MediumEdge): Medium => ({
  id: node.id,
  cursor: cursor,
  title: node.title ?? '',
  channel: node.channel ?? '',
  date: node.publication ?? '',
  duration: node.duration ?? NaN,
  thumbnail: new URL(node.thumbnail ?? ''),
  type: 'Video'
});

export const useGetMedia = (
  first: number,
  after: string | undefined,
  filter: FilterSelectionInput[]
): Medium[] => {
  const { data } = useSuspenseQuery<MediaQuery, MediaQueryVariables>(GET_MEDIA, {
    variables: {
      first,
      after,
      filter
    }
  });

  return data.mediaConnections?.edges?.map((edge) => toModel(edge)) ?? [];
};
