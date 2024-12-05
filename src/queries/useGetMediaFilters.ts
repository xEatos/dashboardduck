import { useSuspenseQuery } from '@apollo/client';
import { FilterOptionsQuery } from '../__generated__/graphql';
import { gql } from '../__generated__';

const GET_ALL_FILTER_OPTIONS = gql(`
  query FilterOptions {
  filterOptions {
    filterId
    filterType
    label
    group
    options {
      ... on WikiDataResource {
        __typename
        id
        label
      }
      ... on WikiDataLiteral {
        __typename
        lang
        type
        value
      }
    }
  }
}
`);

export const useGetMediaFilters = () => {
  const { data } = useSuspenseQuery<FilterOptionsQuery>(GET_ALL_FILTER_OPTIONS);
  return data.filterOptions;
};
