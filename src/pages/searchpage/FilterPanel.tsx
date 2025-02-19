import React, { useContext } from 'react';
import { FilterOption } from '../../__generated__/graphql';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FitlerGroup } from './FilterGroup';
import { useGetMediaFilters } from '../../queries/useGetMediaFilters';
import { FreeSoloInput } from '../../components/inputs/FreeSoloInput';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { createFreeTextInput } from './InputFactory';
import { SearchQueryContext } from './SearchPage';

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
  const query = useContext(SearchQueryContext);

  const groupedFilterOptions = groupFilterOptionById(data);
  //console.log('groupedFilterOptions:', groupedFilterOptions);

  return (
    <Grid container sx={{ padding: '12px', maxWidth: '440px' }} spacing={'12px'}>
      <Grid container direction='column'>
        <Grid container>{createFreeTextInput(groupedFilterOptions.Search[0])}</Grid>
        <Grid container>
          <Divider sx={{ width: '420px' }} orientation='horizontal' />
        </Grid>
        <Grid
          container
          spacing={'12px'}
          sx={{
            flex: '1 1 auto',
            overflowY: 'auto',
            height: `calc(100vh - 172px)`,
            scrollbarColor: '#1976d2 #e4e4e4',
            scrollbarWidth: 'thin'
          }}>
          <Grid
            container
            sx={{
              flexGrow: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0px 6px'
            }}>
            <Typography>Faceted Search:</Typography>
            <IconButton
              onClick={() => {
                query.resetFilters(['FreeText']);
              }}>
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
          {groupedFilterOptions &&
            Object.entries(groupedFilterOptions).map(([header, fopts]) =>
              header === 'Search' ? undefined : (
                <FitlerGroup
                  key={header}
                  header={
                    <Typography variant='h6' sx={{ paddingLeft: 0.75 }}>
                      {header}
                    </Typography>
                  }
                  filterOptions={fopts}
                />
              )
            )}
        </Grid>
      </Grid>
    </Grid>
  );
};
