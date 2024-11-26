import { Box, Paper, Typography } from '@mui/material';
import { FilterOption } from '../__generated__/graphql';
import {
  compare,
  compareWikiData,
  isSame,
  wikiDataToString,
  wikiDataToStringWithId,
} from '../searchpage/wikiDataFunctions';
import { LabelSearchInput } from './LabelSearchInput';
import { WikiDataItem } from './WikiDataItem';
import Grid from '@mui/material/Grid2';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';

const createLabelSearchInput = (filter: FilterOption): React.ReactNode => {
  console.log('Filter:', filter);

  return (
    <LabelSearchInput
      key={filter.filterId}
      label={filter.label}
      options={[...filter.options]}
      isOptionEqualToValue={isSame}
      getOptionLabel={(option) => wikiDataToStringWithId(option)}
      renderOption={(option) => <WikiDataItem {...option} />}
      renderChip={(option) => <WikiDataItem {...option} />}
      sortOption={(a, b) => {
        const r = compareWikiData(a, b);
        return compare(r === 0, r === -1);
      }}
    />
  );
};

const createDatePicker = (filter: FilterOption): React.ReactNode => (
  <Box sx={{ padding: 0.75, margin: '4px 8px 4px 16px', width: '420px' }}>
    <Grid
      container
      direction='row'
      wrap='nowrap'
      spacing={2}
      sx={{ alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Typography>{filter.label}:</Typography>
      <LocalizationProvider adapterLocale='de' dateAdapter={AdapterDayjs}>
        <DateField defaultValue={dayjs(wikiDataToString(filter.options[0]))} />
      </LocalizationProvider>
    </Grid>
  </Box>
);

export const filterToInputFactory = (filter: FilterOption): React.ReactNode => {
  switch (filter.filterType) {
    case 'LabelSearch':
      return createLabelSearchInput(filter);
    case 'Datepicker':
      return createDatePicker(filter);
    default:
      return null;
  }
};
