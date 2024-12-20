import { useSuspenseQuery } from '@apollo/client';
import { gql } from '../__generated__';
import {
  FilterSelectionInput,
  MediaQuery,
  MediaQueryVariables,
  MediumEdge
} from '../__generated__/graphql';

const GET_MEDIA = gql(`
  query Media($first: Int!, $after: String, $filter: [FilterSelectionInput!],) {
  mediaConnections(first: $first, after: $after, filter: $filter) {
    edges {
      node {
        id
        title
        thumbnail
        publication
        duration
        channel
      }
      cursor
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
  console.log(first, after, filter);
  const { data } = useSuspenseQuery<MediaQuery, MediaQueryVariables>(GET_MEDIA, {
    variables: {
      first,
      after,
      filter
    }
  });

  return data.mediaConnections?.edges?.map((edge) => toModel(edge)) ?? [];
};
