import { Box, Paper, Typography } from '@mui/material';
import {
  FilterOption,
  WikiData,
  WikiDataLiteral,
  WikiDataLiteralInput,
  WikiDataResource,
  WikiDataResourceInput
} from '../__generated__/graphql';
import {
  compare,
  compareWikiData,
  isSame,
  wikiDataToString,
  wikiDataToStringWithId
} from '../utils/wikiDataFunctions';
import { LabelSearchInput } from '../components/inputs/LabelSearchInput';
import { WikiDataItem } from '../components/WikiDataItem';
import Grid from '@mui/material/Grid2';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { useContext } from 'react';
import { SearchQueryContext } from '../App';

const createLabelSearchInput = ({ filterId, label, options }: FilterOption): React.ReactNode => {
  const query = useContext(SearchQueryContext);

  return (
    <LabelSearchInput<WikiData>
      key={filterId}
      label={label}
      options={[...options]}
      isOptionEqualToValue={isSame}
      getOptionLabel={(option) => wikiDataToStringWithId(option)}
      renderOption={(option) => <WikiDataItem {...option} />}
      renderChip={(option) => <WikiDataItem {...option} />}
      sortOption={(a, b) => {
        const r = compareWikiData(a, b);
        return compare(r === 0, r === -1);
      }}
      selectedOptions={query.filterInputs[filterId] ?? []}
      onChange={(selection: WikiData[]) => {
        query.updateFilter(filterId, selection);
      }}
    />
  );
};

const createDatePicker = (filter: FilterOption): React.ReactNode => (
  <Box sx={{ padding: 0.75, margin: '4px 8px 4px 16px' }}>
    <Grid
      container
      direction='row'
      wrap='nowrap'
      spacing={2}
      sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography>{filter.label}:</Typography>
      <LocalizationProvider adapterLocale='de' dateAdapter={AdapterDayjs}>
        <DateField size='small' defaultValue={dayjs(wikiDataToString(filter.options[0]))} />
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
