import { useSuspenseQuery } from '@apollo/client';
import { gql } from '../__generated__';
import {
  FilterSelection,
  FilterSelectionInput,
  MediaConnections,
  MediaPage,
  MediaQuery,
  MediaQueryVariables,
  MediumEdge,
  OffsetPair
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

//todo offset cache

export const createOffsetMapForNextPage = (
  mediaConnections: MediaConnections
): Record<string, number> => {
  return mediaConnections.media.reduce(
    (acc, value) => ({
      ...acc,
      ...(value.pageInfo.hasNextPage
        ? {
            [value.pageInfo.provenance]:
              value.edges?.[value.edges?.length - 1].cursor ??
              value.pageInfo.offset + value.pageInfo.limit
          }
        : { [value.pageInfo.provenance]: value.pageInfo.offset + value.pageInfo.limit })
    }),
    {}
  );
};

interface GetMediaAnswer {
  foundFilters: FilterSelection[];
  mediaPages: MediaPage[];
  nextPageOffsetMap: Record<string, number>;
}

export const useGetMedia = (
  limit: number,
  offsetMap: OffsetPair[] | undefined,
  filter: FilterSelectionInput[] | undefined
  //onFoundFiltersChange: (foundFilters: FilterSelection[]) => void,
  //setPaginationData: (otherOffsetMap: Record<string, number>) => void,
): GetMediaAnswer => {
  const { data } = useSuspenseQuery<MediaQuery, MediaQueryVariables>(GET_MEDIA, {
    variables: {
      limit,
      offsetMap,
      filter
    }
  });

  return {
    foundFilters: data.mediaConnections?.foundFilters ?? [],
    mediaPages: data.mediaConnections?.media ?? [],
    nextPageOffsetMap: data.mediaConnections
      ? createOffsetMapForNextPage(data.mediaConnections)
      : {}
  };
};
