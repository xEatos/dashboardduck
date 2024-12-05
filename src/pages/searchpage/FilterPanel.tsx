import React from 'react';
import { FilterOption } from '../../__generated__/graphql';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FitlerGroup } from './FilterGroup';
import { useGetMediaFilters } from '../../queries/useGetMediaFilters';

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
  const data = useGetMediaFilters();

  const groupedFilterOptions = groupFilterOptionById(data);

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
