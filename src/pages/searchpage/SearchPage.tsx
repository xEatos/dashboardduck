import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid2';
import React, {
  createContext,
  Suspense,
  useContext,
  useDeferredValue,
  useEffect,
  useState
} from 'react';
import {
  FilterSelectionInput,
  MediumEdge,
  ValueType,
  WikiData,
  WikiDataLiteral
} from '../../__generated__/graphql';
import { MediumCard, MediumCardProp } from '../../components/MediumCard';
import { gql } from '../../__generated__';
import { FilterPanel } from './FilterPanel';
import {
  mapToWikiDataInput,
  mapURLValueToWikidata,
  mapWikiDataToURLValue,
  tryCastToWikiDataLiteral
} from '../../utils/wikiDataFunctions';
import { LoaderFunction, Path, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { MediaGridPanel } from './MediaGridPanel';
import { Box, CircularProgress } from '@mui/material';

export interface SearchQueryValues {
  filterInputs: Record<string, WikiData[]>;
}

export interface SearchQuery extends SearchQueryValues {
  updateFilter: (filterId: string | 'FreeText', data: WikiData[]) => void;
  resetFilters: (expect: string[]) => void;
}

export const SearchQueryContext = createContext<SearchQuery>({
  filterInputs: {},
  updateFilter: (_) => {},
  resetFilters: (_) => {}
});

export interface SearchLoaderData {
  params: { search: string };
}

export const searchLoader: LoaderFunction<SearchLoaderData> = (context): Partial<Path> => {
  const url = new URL(context.request.url);
  //console.log('url - params:', url.searchParams); // would be easier
  return {
    pathname: url.pathname,
    search: url.search.slice(1)
  };
};

const mapPathToSearchQueryValues = ({ search }: Partial<Path>): SearchQueryValues => {
  return search
    ? {
        filterInputs: search
          .split('&')
          .map((idWithValues) => {
            const idWithValueList = idWithValues.split('=');
            return {
              filterId: idWithValueList[0],
              values: idWithValueList[1].split('|').map((value) => mapURLValueToWikidata(value))
            };
          })
          .reduce((accu, pair) => ({ ...accu, [pair.filterId]: pair.values }), {})
      }
    : { filterInputs: {} };
};

const mapSearchQueryValuesToPath = ({ filterInputs }: SearchQueryValues): Partial<Path> => {
  const path: Partial<Path> = {
    search: Object.entries(filterInputs)
      .map(([fid, values]) =>
        values.length > 0 ? `${fid}=${values.map(mapWikiDataToURLValue).join('|')}` : undefined
      )
      .filter((s) => s)
      .join('&')
  };
  return path;
};

export const SearchPage: React.FC = () => {
  const urlSearchParams = useLoaderData<Partial<Path>>();
  const navigate = useNavigate();

  const queryValues: SearchQueryValues = mapPathToSearchQueryValues(urlSearchParams);
  console.log('QueryValues:', queryValues);

  const updateFilter = (filterId: string, data: WikiData[]) => {
    const newQueryValues: SearchQueryValues = {
      filterInputs: { ...queryValues.filterInputs }
    };
    newQueryValues.filterInputs[filterId] = data;
    navigate(mapSearchQueryValuesToPath(newQueryValues));
  };

  const resetFilters = (expect /*filterIds */ : string[]) => {
    navigate(
      mapSearchQueryValuesToPath({
        filterInputs: Object.fromEntries(
          Object.entries(queryValues.filterInputs).filter(([fsId]) => expect.includes(fsId))
        )
      })
    );
  };

  return (
    <SearchQueryContext.Provider value={{ ...queryValues, updateFilter, resetFilters }}>
      <Grid container direction='row' sx={{ flexWrap: 'nowrap' }}>
        <Suspense fallback={<CircularProgress />}>
          <Grid container sx={{ minWidth: 'auto' }}>
            <FilterPanel />
          </Grid>
        </Suspense>
        <Grid container direction='row' spacing={2}>
          <MediaGridPanel />
        </Grid>
      </Grid>
    </SearchQueryContext.Provider>
  );
};
