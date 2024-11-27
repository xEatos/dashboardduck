import React, { Fragment, useState } from 'react';
import {
  FilterOption,
  FilterOptionsQuery,
  FilterSelectionInput,
  WikiData,
  WikiDataLiteral,
} from '../__generated__/graphql';
import { LabelSearchInput } from '../components/LabelSearchInput';
import { Typography } from '@mui/material';
import {
  compare,
  compareWikiData,
  isSame,
  wikiDataToString,
  wikiDataToStringWithId,
} from './wikiDataFunctions';
import { clip } from '../utils/clipString';
import { WikiDataItem } from '../components/WikiDataItem';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import { filterToInputFactory } from '../components/InputFactory';
import Grid from '@mui/material/Grid2';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';

export interface FilterPanelProps {
  filters: FilterOption[];
}

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

type FilterOptionGroup = Record<string, FilterOption[]>;

const groupFilterOptionById = (
  filterOpts: FilterOption[],
): FilterOptionGroup => {
  const g: FilterOptionGroup = {};
  filterOpts.forEach((fopts) => {
    if (Object.hasOwn(g, fopts.group ?? 'Rest')) {
      g[fopts.group ?? 'Rest'].push(fopts);
    } else {
      g[fopts.group ?? 'Rest'] = [fopts];
    }
  });
  return g;
};

const FilterTree = (data: FilterOptionsQuery) => {
  const [groups, setGroups] = useState<string[]>(
    data
      ? Object.entries(groupFilterOptionById(data.filterOptions)).map(
          ([key]) => key,
        )
      : [],
  );

  // instead of data use the groups array and get it from data
  return data ? (
    <SimpleTreeView
      expandedItems={groups}
      onItemExpansionToggle={(_, itemId, isExpanded) => {
        if (isExpanded) {
          setGroups([...groups, itemId]);
        } else {
          setGroups(groups.filter((otherItemId) => otherItemId != itemId)); // after a item is collapsed the component get unmounted -> resets internal state
        }
      }}
    >
      {Object.entries(groupFilterOptionById(data.filterOptions)).map(
        ([group, fopts]) => {
          return (
            <TreeItem
              itemId={group}
              label={<Typography variant='h6'>{group}</Typography>}
            >
              {fopts.map((fopt) => (
                <Fragment key={fopt.filterId}>
                  {filterToInputFactory(fopt)}
                </Fragment>
              ))}
            </TreeItem>
          );
        },
      )}
    </SimpleTreeView>
  ) : null;
};

export const FilterPanel: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_FILTER_OPTIONS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  return <>{data && <FilterTree filterOptions={data.filterOptions} />}</>;
};
