import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { FixedMap } from '../utils/fixedMap';

export interface LabelSerachProps<T> {
  options: T[];
  renderOption: (option: T, isSelected: boolean) => React.ReactNode;
  renderChip: (option: T) => string;
  label: React.ReactNode;
  initSelectedOptions?: T[];
  isOptionEqualToValue: (option: T, value: T) => boolean;
  sortOption?: (a: T, b: T) => -1 | 0 | 1;
  onChange?: (selectedOptions: T[]) => void;
}

interface Label {
  label: string;
  isActive: boolean;
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

interface LabelState {
  currentActiveLabels: Label[];
  labels: FixedMap<string, boolean>;
}

// pressing enter-key on item not working correctly
// somhow the retun of newValues is incorrect in onChange((event, newValue) => {})
export const LabelSearchInput = <R,>({
  options,
  initSelectedOptions,
  renderChip,
  renderOption,
  label,
  isOptionEqualToValue,
  onChange,
  sortOption,
}: LabelSerachProps<R>) => {
  const [selectedOptions, setOptions] = useState<R[]>([]);

  useEffect(() => {
    onChange?.(selectedOptions);
  });

  console.log('options: ', selectedOptions);

  return (
    <Paper square sx={{ padding: 2 }}>
      <Grid
        container
        direction='row'
        wrap='nowrap'
        spacing={2}
        sx={{ alignItems: 'center' }}
      >
        {label}
        <Autocomplete
          style={{ width: '300px' }}
          multiple
          value={selectedOptions}
          isOptionEqualToValue={isOptionEqualToValue}
          options={options.sort?.(sortOption) ?? options}
          renderTags={() => null}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            const isSelected =
              selectedOptions.find((opt) =>
                isOptionEqualToValue(opt, option),
              ) !== undefined;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={isSelected}
                />
                {renderOption(option, isSelected)}
              </li>
            );
          }}
          onChange={(event, newSelectOptions) => {
            event.preventDefault();
            setOptions(newSelectOptions);
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder={'...'} />
          )}
        />
      </Grid>
      <Grid container spacing={0.75} sx={{ paddingTop: 1 }}>
        {selectedOptions.sort(sortOption).map((value) => {
          return (
            <Chip
              key={renderChip(value)}
              variant='outlined'
              label={renderChip(value)}
              onDelete={() =>
                setOptions(selectedOptions.filter((option) => option != value))
              }
            ></Chip>
          );
        })}
      </Grid>
    </Paper>
  );
};
