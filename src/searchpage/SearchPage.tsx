import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid2';
import React, { PropsWithChildren } from 'react';
import {
  MediaQuery,
  MediumEdge,
  WikiData,
  WikiDataLiteral,
  WikiDataResource,
} from '../__generated__/graphql';
import { MediumCard, MediumCardProp } from '../components/MediumCard';
import { gql } from '../__generated__';
import { LabelSearchInput } from '../components/LabelSearchInput';
import { FilterToInputFactory } from './FilterPanel';

export interface SearchPageProps {
  filterPanel: React.JSX.Element;
  //mediaGridView: React.FC<PropsWithChildren>;
}

const iso639_1 = [
  'bo',
  'br',
  'bs',
  'ca',
  'ce',
  'ch',
  'co',
  'cr',
  'cs',
  'cu',
  'cv',
  'cy',
  'da',
  'de',
];

const FilterPanel = () => {
  return (
    <Grid
      container
      size={{ xs: 2 }}
      sx={{ padding: 1, border: '0px solid blue' }}
    >
      <div>
        {FilterToInputFactory({
          filterId: 'spokenLangauge',
          filterType: 'LabelSearchInput',
          label: 'Language',
          options: Array<WikiData>(
            {
              value: 'en',
              type: 'ISO639',
              __typename: 'WikiDataLiteral',
            } as WikiDataLiteral,
            {
              value: 'de',
              type: 'ISO639',
              __typename: 'WikiDataLiteral',
            } as WikiDataLiteral,
            {
              value: 'fr',
              type: 'ISO639',
              __typename: 'WikiDataLiteral',
            } as WikiDataLiteral,
            {
              id: 'https://bnwiki.wikibase.cloud/entity/Q6',
              label: '32% aller Erwachsenen haben diese Krankheit. Du auch?',
              __typename: 'WikiDataResource',
            } as WikiDataResource,
            {
              id: 'https://bnwiki.wikibase.cloud/entity/Q8',
              label: '32% aller Erwachsenen haben diese Krankheit. Du auch?',
              __typename: 'WikiDataResource',
            } as WikiDataResource,
          ),
        })}
      </div>
    </Grid>
  );
};

const GET_MEDIA = gql(`
  query Media($first: Int!) {
  mediaConnections(first: $first) {
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
  type: 'Video',
});

const MediaViewPanel = () => {
  const { loading, error, data } = useQuery(GET_MEDIA, {
    variables: {
      first: 10,
    },
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
        overflowY: 'scroll',
      }}
    >
      {data?.mediaConnections?.edges?.flatMap((edge) => {
        return Array(20)
          .fill(0)
          .map((_, index) => <MediumCard key={index} {...toModel(edge)} />);
      })}
    </Grid>
  );
};
// <MediaViewPanel />
export const SearchPage: React.FC<SearchPageProps> = (props) => {
  return (
    <Grid
      container
      direction='row'
      size={{ xs: 12 }}
      sx={{ border: '0px solid black' }}
    >
      <FilterPanel />
      <MediaViewPanel />
      <Grid container size={{ xs: 2 }}></Grid>
    </Grid>
  );
};

function getRandomInteger(min: number, max: number): number {
  if (min >= max) {
    throw new Error("The 'min' value must be less than the 'max' value.");
  }
  return Math.floor(Math.random() * (max - min) + min);
}
