import { gql } from "../../__generated__";
import { useQuery } from '@apollo/client';

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

export const useFilterOptions = () => {
  const { loading, error, data } = useQuery(GET_ALL_FILTER_OPTIONS);
  return { loading, error, data }
}