import { Box, Checkbox, FormControlLabel, Paper, Slider, Typography } from '@mui/material';
import {
  FilterOption,
  ValueType,
  WikiData,
  WikiDataLiteral,
  WikiDataLiteralInput,
  WikiDataResource,
  WikiDataResourceInput
} from '../../__generated__/graphql';
import {
  compare,
  compareWikiData,
  isSame,
  mapWikiDataToValue,
  wikiDataToString,
  wikiDataToStringWithId
} from '../../utils/wikiDataFunctions';
import { LabelSearchInput } from '../../components/inputs/LabelSearchInput';
import { WikiDataItem } from '../../components/WikiDataItem';
import Grid from '@mui/material/Grid2';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import React, { useContext } from 'react';
import { SearchQueryContext } from '../../App';

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

const createCheckBox = (filter: FilterOption): React.ReactNode => {
  const query = useContext(SearchQueryContext);

  return (
    <Box sx={{ padding: '2px 2px 2px 14px' }}>
      <FormControlLabel
        control={<Checkbox />}
        label={filter.label}
        onChange={(_, checked) => {
          query.updateFilter(
            filter.filterId,
            checked
              ? [
                  {
                    __typename: 'WikiDataLiteral',
                    value: 'Transcript',
                    type: ValueType.Boolean
                  }
                ]
              : []
          );
        }}
      />
    </Box>
  );
};

const createValueSlider = (filter: FilterOption): React.ReactNode => {
  const query = useContext(SearchQueryContext);

  const [value, setValue] = React.useState<number[]>([
    mapWikiDataToValue(filter.options[0]) as number,
    1000
  ]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: '300px', padding: '4px 2px 2px 14px' }}>
      <Grid container direction='row' wrap='nowrap' spacing={2}>
        <Typography>{value[0]}</Typography>
        <Slider value={value} disableSwap min={0} max={1200} onChange={handleChange} />
        <Typography>{value[1]}</Typography>
      </Grid>
    </Box>
  );
};

export const filterToInputFactory = (filter: FilterOption): React.ReactNode => {
  switch (filter.filterType) {
    case 'LabelSearch':
      return createLabelSearchInput(filter);
    case 'Datepicker':
      return createDatePicker(filter);
    case 'Checkbox':
      return createCheckBox(filter);
    case 'ValueSlider':
      return createValueSlider(filter);
    default:
      return null;
  }
};
