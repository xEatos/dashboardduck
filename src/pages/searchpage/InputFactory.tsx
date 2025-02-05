import { Box, Checkbox, FormControlLabel, Slider, Typography } from '@mui/material';
import { FilterOption, ValueType, WikiData } from '../../__generated__/graphql';
import {
  compare,
  compareWikiData,
  isSame,
  tryCastToWikiDataLiteral,
  wikiDataToStringWithId
} from '../../utils/wikiDataFunctions';
import { LabelSearchInput } from '../../components/inputs/LabelSearchInput';
import { WikiDataItem, WikiDataItemWitoutClip } from '../../components/WikiDataItem';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import React, { useContext } from 'react';
import { SearchQueryContext } from './SearchPage';
import { DateInput } from '../../components/inputs/DateInput';
import { ValueRangeInput } from '../../components/inputs/ValueRangeInput';
import { convertDuration } from '../../utils/duration';
import { FreeSoloInput } from '../../components/inputs/FreeSoloInput';

const createLabelSearchInput = ({ filterId, label, options }: FilterOption): React.ReactNode => {
  const query = useContext(SearchQueryContext);

  return (
    <LabelSearchInput
      key={filterId}
      label={label}
      options={[...options]}
      isOptionEqualToValue={isSame}
      getOptionLabel={wikiDataToStringWithId}
      renderOption={(option) => <WikiDataItemWitoutClip {...option} />}
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

const createDatePicker = ({ filterId, label, options }: FilterOption): React.ReactNode => {
  const query = useContext(SearchQueryContext);
  return (
    <DateInput
      label={label}
      locale={'de'}
      value={query.filterInputs[filterId]?.[0] ?? options[0]}
      valueToDate={(v) => dayjs(tryCastToWikiDataLiteral(v)?.value)}
      onChange={(date) => {
        console.log(!Number.isNaN(date.valueOf));
        if (!Number.isNaN(date.valueOf)) {
          console.log(date.toISOString());
          query.updateFilter(filterId, [
            { __typename: 'WikiDataLiteral', type: ValueType.Date, value: date.toISOString() }
          ]);
        }
      }}
    />
  );
};

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

const createValueSlider = ({ filterId, options }: FilterOption): React.ReactNode => {
  const query = useContext(SearchQueryContext);
  const min = tryCastToWikiDataLiteral(options[0]);
  const max = tryCastToWikiDataLiteral(options[1]);

  return min && max && min?.value < max?.value ? (
    <ValueRangeInput
      disableSwap={true}
      min={options[0]}
      max={options[1]}
      minValue={query.filterInputs[filterId]?.[0] ?? options[0]}
      maxValue={query.filterInputs[filterId]?.[1] ?? options[1]}
      valueToNumber={(v) => Number(tryCastToWikiDataLiteral(v)?.value) ?? 0}
      numberToValue={(v) => {
        const a: WikiData = {
          __typename: 'WikiDataLiteral',
          value: v.toString(),
          type: ValueType.Number
        };
        return a;
      }}
      valueToLabel={(v) => {
        const num = Number(tryCastToWikiDataLiteral(v)?.value) ?? min.value;
        return convertDuration(num);
      }}
      onChange={(min, max) => {
        query.updateFilter(filterId, [min, max]);
      }}
    />
  ) : undefined;
};

export const createFreeTextInput = ({ filterId, label }: FilterOption): React.ReactNode => {
  const query = useContext(SearchQueryContext);
  const textData = query.filterInputs?.FreeText?.[0];

  return (
    <FreeSoloInput
      label={label}
      text={textData ? tryCastToWikiDataLiteral(textData)?.value : undefined}
      onChange={(value) => {
        query.updateFilter(filterId, [
          { __typename: 'WikiDataLiteral', value: value, type: ValueType.String }
        ]);
      }}
    />
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
    /*
    case 'TextInput':
      return createFreeTextInput(filter);
      */
    default:
      return null;
  }
};
