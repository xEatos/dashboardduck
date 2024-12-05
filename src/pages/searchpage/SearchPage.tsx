import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid2';
import React, { createContext, Suspense, useContext, useEffect, useState } from 'react';
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

export interface SearchQueryValues {
  filterInputs: Record<string, WikiData[]>;
  freeSolo?: WikiDataLiteral;
}

export interface SearchQuery extends SearchQueryValues {
  updateFilter: (filterId: string, data: WikiData[]) => void;
  updateFreeSolo: (input: string) => void;
}
export const SearchQueryContext = createContext<SearchQuery>({
  filterInputs: {},
  updateFilter: (_) => {},
  updateFreeSolo: (_) => {}
});

export interface SearchLoaderData {
  params: { search: string };
}

export const searchLoader: LoaderFunction<SearchLoaderData> = (context): Partial<Path> => {
  const url = new URL(context.request.url);
  return {
    pathname: url.pathname,
    search: url.search
  };
};

const mapPathToSearchQueryValues = ({ search }: Partial<Path>): SearchQueryValues => {
  const textFilterId = 'Text';
  if (search) {
    const param: Record<string, WikiData[]> = {};
    const paramList = search
      .slice(1)
      .split('&')
      .map((idWithValues) => {
        const idWithValueList = idWithValues.split('=');
        return {
          filterId: idWithValueList[0],
          values: idWithValueList[1].split('|').map((value) => mapURLValueToWikidata(value))
        };
      });
    paramList.forEach((p) => {
      if (p.filterId !== textFilterId) {
        param[p.filterId] = p.values;
      }
    });
    return {
      filterInputs: param,
      freeSolo: param[textFilterId]?.[0]
        ? tryCastToWikiDataLiteral(param[textFilterId][0])
        : undefined
    };
  } else {
    return {
      filterInputs: {},
      freeSolo: undefined
    };
  }
};

const mapSearchQueryValuesToPath = ({
  filterInputs,
  freeSolo
}: SearchQueryValues): Partial<Path> => {
  const enCodedfreeSolo =
    freeSolo && freeSolo.value.length > 0 ? encodeURIComponent(`Text=${freeSolo}&`) : '';
  const path: Partial<Path> = {
    search:
      enCodedfreeSolo +
      Object.entries(filterInputs)
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

  const updateFilter = (filterId: string, data: WikiData[]) => {
    const newQueryValues: SearchQueryValues = {
      filterInputs: { ...queryValues.filterInputs },
      freeSolo: queryValues.freeSolo
    };
    newQueryValues.filterInputs[filterId] = data;
    navigate(mapSearchQueryValuesToPath(newQueryValues));
  };

  const updateFreeSolo = (value: string) => {
    queryValues.freeSolo = { __typename: 'WikiDataLiteral', type: ValueType.String, value };
    navigate(mapSearchQueryValuesToPath(queryValues));
  };

  return (
    <SearchQueryContext.Provider value={{ ...queryValues, updateFilter, updateFreeSolo }}>
      <Grid
        container
        direction='row'
        wrap='nowrap'
        size={{ xs: 12 }}
        columnGap={3}
        sx={{ border: '0px solid black' }}>
        <Suspense fallback={<p>loading filters</p>}>
          <FilterPanel />
        </Suspense>
        <MediaGridPanel />
        <Grid container size={{ xs: 2 }}></Grid>
      </Grid>
    </SearchQueryContext.Provider>
  );
};
