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
}
export const SearchQueryContext = createContext<SearchQuery>({
  filterInputs: {},
  updateFilter: (_) => {}
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
  console.log('search:', search);
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
  //console.log('QueryValues:', queryValues);

  const updateFilter = (filterId: string, data: WikiData[]) => {
    const newQueryValues: SearchQueryValues = {
      filterInputs: { ...queryValues.filterInputs }
    };
    newQueryValues.filterInputs[filterId] = data;
    navigate(mapSearchQueryValuesToPath(newQueryValues));
  };

  console.log(screen.availWidth);
  return (
    <SearchQueryContext.Provider value={{ ...queryValues, updateFilter }}>
      <Grid container direction='row' size={{ xs: 12 }}>
        <Grid size={{ xs: screen.availWidth > 1920 ? 3 : 3.5 }}>
          <Suspense fallback={<CircularProgress />}>
            <FilterPanel />
          </Suspense>
        </Grid>
        <Grid
          size={{ xs: screen.availWidth > 1920 ? 9 : 8.5 }}
          container
          direction='row'
          spacing={2}
          sx={{ paddingTop: 2 }}>
          <MediaGridPanel />
        </Grid>
      </Grid>
    </SearchQueryContext.Provider>
  );
};
