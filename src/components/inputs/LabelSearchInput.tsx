import { Autocomplete, Box, Checkbox, Chip, TextField } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid2';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export interface LabelSerachProps<T> {
  label: React.ReactNode;
  options: T[];
  isOptionEqualToValue: (option: T, value: T) => boolean;
  getOptionLabel: (option: T) => string;
  renderOption: (option: T, isSelected: boolean) => React.ReactNode;
  renderChip: (option: T) => React.ReactNode;
  sortOption?: (a: T, b: T) => -1 | 0 | 1;

  selectedOptions: T[];
  onChange(selectedOptions: T[]): void;
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export const LabelSearchInput = <R,>({
  label,
  options,
  isOptionEqualToValue,
  getOptionLabel,
  renderChip,
  renderOption,
  sortOption,
  selectedOptions,
  onChange
}: LabelSerachProps<R>) => {
  return (
    <Box sx={{ padding: 0.75, margin: '2px 4px 2px 8px' }}>
      <Grid container direction='column'>
        <Grid
          container
          direction='row'
          wrap='nowrap'
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          {label}:
          <Autocomplete
            sx={{ flexGrow: 1 }}
            multiple
            value={selectedOptions}
            isOptionEqualToValue={isOptionEqualToValue}
            options={options.sort(sortOption)}
            renderTags={() => null}
            getOptionLabel={getOptionLabel}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              const isSelected =
                selectedOptions.find((opt) => isOptionEqualToValue(opt, option)) !== undefined;
              return (
                <li
                  key={key}
                  {...optionProps}
                  style={{ height: 'auto', margin: '0px 0px', padding: '0px 0px' }}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} checked={isSelected} />
                  {renderOption(option, isSelected)}
                </li>
              );
            }}
            onChange={(event, newSelectOptions) => {
              event.preventDefault();
              onChange(newSelectOptions);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                hiddenLabel
                size='small'
                placeholder={`Selected: ${selectedOptions.length}`}
              />
            )}
          />
        </Grid>
        <Grid container spacing={0.75} sx={{ paddingTop: 1 }}>
          {selectedOptions.sort(sortOption).map((value) => {
            return (
              <Chip
                key={getOptionLabel(value)}
                variant='outlined'
                label={renderChip(value)}
                onDelete={() => {
                  const newSelectOptions = selectedOptions.filter((option) => option != value);
                  onChange(newSelectOptions);
                }}
              />
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};
