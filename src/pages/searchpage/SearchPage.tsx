import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid2';
import React, { PropsWithChildren, useContext } from 'react';
import {
  FilterSelectionInput,
  MediaQuery,
  MediumEdge,
  WikiData,
  WikiDataLiteral,
  WikiDataResource
} from '../../__generated__/graphql';
import { MediumCard, MediumCardProp } from '../../components/MediumCard';
import { gql } from '../../__generated__';
import { filterToInputFactory } from './InputFactory';
import { FilterPanel } from './FilterPanel';
import { SearchQueryContext, SearchQueryValues } from '../../App';
import { mapToWikiDataInput } from '../../utils/wikiDataFunctions';

export interface SearchPageProps {
  filterPanel: React.JSX.Element;
}

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

const toModel = ({ cursor, node }: MediumEdge): MediumCardProp => ({
  id: node.id,
  cursor: cursor,
  title: node.title ?? '',
  channel: node.channel ?? '',
  date: node.publication ?? '',
  duration: node.duration ?? NaN,
  thumbnail: new URL(node.thumbnail ?? ''),
  type: 'Video'
});

const MediaGridPanel: React.FC = () => {
  const searchQuery = useContext(SearchQueryContext);
  const filerSelectionInput: FilterSelectionInput[] = Object.entries(searchQuery.filterInputs).map(
    ([filterId, data]) => {
      const [resources, literals] = mapToWikiDataInput(data);
      return { filterId, resources, literals };
    }
  );

  const { loading, error, data } = useQuery(GET_MEDIA, {
    variables: {
      first: 10,
      filter: filerSelectionInput
    }
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  return (
    <Grid
      container
      size={{ xs: 8 }}
      gap={2}
      spacing={2}
      sx={{
        padding: 1,
        border: '0px solid red',
        justifyContent: 'center',
        height: 'calc(100vh - 128px)',
        overflowY: 'scroll'
      }}>
      {data?.mediaConnections?.edges?.flatMap((edge) => {
        return Array(20)
          .fill(0)
          .map((_, index) => <MediumCard key={index} {...toModel(edge)} />);
      })}
    </Grid>
  );
};

// <MediaViewPanel />
export const SearchPage: React.FC = () => {
  return (
    <Grid
      container
      direction='row'
      size={{ xs: 12 }}
      columnGap={3}
      sx={{ border: '0px solid black' }}>
      <FilterPanel />
      <MediaGridPanel />
      <Grid container size={{ xs: 2 }}></Grid>
    </Grid>
  );
};
