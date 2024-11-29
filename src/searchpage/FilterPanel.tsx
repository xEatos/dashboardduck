import React, { Fragment, useEffect, useState } from 'react';
import { FilterOption, FilterOptionsQuery, FilterSelectionInput } from '../__generated__/graphql';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFilterOptions } from './useFilterOptions';
import { FitlerGroup } from './FilterGroup';

export interface FilterPanelProps {
  filters: FilterOption[];
}

type FilterOptionGroup = Record<string, FilterOption[]>;

const groupFilterOptionById = (filterOpts: FilterOption[]): FilterOptionGroup => {
  const g: FilterOptionGroup = {};
  filterOpts.forEach((fopts) => {
    if (Object.hasOwn(g, fopts.group ?? 'Other')) {
      g[fopts.group ?? 'Other'].push(fopts);
    } else {
      g[fopts.group ?? 'Other'] = [fopts];
    }
  });
  return g;
};

export const FilterPanel: React.FC = () => {
  const { loading, error, data } = useFilterOptions();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  const groupedFilterOptions = data ? groupFilterOptionById(data.filterOptions) : undefined;

  return (
    <Grid container direction='column' spacing={2.5} sx={{ padding: 2 }}>
      {groupedFilterOptions &&
        Object.entries(groupedFilterOptions).map(([header, fopts]) => (
          <FitlerGroup
            key={header}
            header={
              <Typography variant='h6' sx={{ paddingLeft: 0.75 }}>
                {header}
              </Typography>
            }
            filterOptions={fopts}
          />
        ))}
    </Grid>
  );
};
