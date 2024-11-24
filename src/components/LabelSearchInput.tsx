import {
  Autocomplete,
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
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';

export interface LabelSerachProps<T> {
  label: React.ReactNode;
  options: T[];
  initSelectedOptions?: T[];
  isOptionEqualToValue: (option: T, value: T) => boolean;
  getOptionLabel: (option: T) => string;
  renderOption: (option: T, isSelected: boolean) => React.ReactNode;
  renderChip: (option: T) => React.ReactNode;
  onChange?: (selectedOptions: T[]) => void;
  sortOption?: (a: T, b: T) => -1 | 0 | 1;
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

//
export const LabelSearchInput = <R,>({
  label,
  options,
  initSelectedOptions,
  isOptionEqualToValue,
  getOptionLabel,
  renderChip,
  renderOption,
  onChange,
  sortOption,
}: LabelSerachProps<R>) => {
  const [selectedOptions, setOptions] = useState<R[]>(
    initSelectedOptions ?? [],
  ); //

  // i dont want to lift the selectedOption state,
  // so we may use a useEffect to intercept changes in the props to update the internal state
  // prototype? -> hp-frontend
  // https://github.com/xEatos/hp-frontend/blob/main/haushaltsplan-app/src/app/reactCycleTest.tsx
  useEffect(() => {
    onChange?.(selectedOptions);
  });

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
          getOptionLabel={getOptionLabel}
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
            <TextField
              {...params}
              placeholder={`Selected: ${selectedOptions.length}`}
            />
          )}
        />
      </Grid>
      <SimpleTreeView>
        <TreeItem itemId={'bla'} label={<Typography>Blub</Typography>} />
      </SimpleTreeView>
      <Grid container spacing={0.75} sx={{ paddingTop: 1 }}>
        {selectedOptions.sort(sortOption).map((value) => {
          console.log(value);
          return (
            <Chip
              key={getOptionLabel(value)}
              variant='outlined'
              label={renderChip(value)}
              onDelete={() =>
                setOptions(selectedOptions.filter((option) => option != value))
              }
            />
          );
        })}
      </Grid>
    </Paper>
  );
};
