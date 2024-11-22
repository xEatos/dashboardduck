import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { FixedMap } from '../utils/fixedMap';

export interface LabelSerachProps {
  onChange?: (activeLabels: string[]) => void;
  _labels: string[];
  name: string;
  initActiveLabels?: string[];
  sortFunc?: (a: string, b: string) => [-1, 0, 1];
}

interface Label {
  label: string;
  isActive: boolean;
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const getDiff = (left: Label[], right: Label[]): Label[] => {
  const l = left.map((v) => v.label);
  const r = right.map((v) => v.label);
  const leftItemsNotInRight = l.filter((leftValue) => !r.includes(leftValue));
  const rightItemNotInRight = r.filter((rightValue) => !l.includes(rightValue));
  return [...leftItemsNotInRight, ...rightItemNotInRight].map((v) => ({
    label: v,
    isActive: true,
  }));
};

interface LabelState {
  currentActiveLabels: Label[];
  labels: FixedMap<string, boolean>;
}

// pressing enter-key on item not working correctly
// somhow the retun of newValues is incorrect in onChange((event, newValue) => {})
export const LabelSearchInput: React.FC<LabelSerachProps> = ({
  _labels,
  name,
  initActiveLabels,
  onChange,
  sortFunc,
}) => {
  const allMap = FixedMap.of<string, boolean>().setBatch(
    _labels.map((value) => [value, false]),
  );
  const allMapWithInitActive = initActiveLabels
    ? allMap.setBatch(initActiveLabels.map((value) => [value, false]))
    : allMap;

  const [labels, setLabels] = useState<LabelState>({
    labels: allMapWithInitActive,
    currentActiveLabels: [],
  });

  console.log('labels', labels);

  const removeLabel = (label: string) => {
    setLabels({
      currentActiveLabels: labels.currentActiveLabels.filter(
        (other) => other.label != label,
      ),
      labels: labels.labels.set(label, false),
    });
  };

  const addLabel = (label: string) => {
    setLabels({
      currentActiveLabels: [
        ...labels.currentActiveLabels,
        { label, isActive: true },
      ],
      labels: labels.labels.set(label, true),
    });
  };

  return (
    <Paper square sx={{ padding: 2 }}>
      <Grid
        container
        direction='row'
        wrap='nowrap'
        spacing={2}
        sx={{ alignItems: 'center' }}
      >
        <Typography>{name}</Typography>
        <Autocomplete
          style={{ width: '300px' }}
          multiple
          value={labels.currentActiveLabels}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          options={labels.labels.mapToArray((key, value) => ({
            label: key,
            isActive: value,
          }))}
          renderTags={() => null}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option, state, ownerState) => {
            const { key, ...optionProps } = props;
            return (
              <li
                key={key}
                {...optionProps}
                /*
                onClick={(event) => {
                  event.preventDefault();
                  option.isActive
                    ? removeLabel(option.label)
                    : addLabel(option.label);
                }}*/
              >
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={option.isActive}
                  /*
                  onClick={(event) => {
                    event.preventDefault();
                    option.isActive
                      ? removeLabel(option.label)
                      : addLabel(option.label);
                  }}*/
                />
                {option.label}
              </li>
            );
          }}
          onChange={(event, newCurrentActiveLabels, reason) => {
            event.preventDefault();
            console.log('pass:', newCurrentActiveLabels, reason);
            const allFalse = labels.labels.mapValues(() => false);
            const allFalseExpectActiveLabel = allFalse.setBatch(
              newCurrentActiveLabels.map((l) => [l.label, true]),
            );
            setLabels({
              currentActiveLabels: allFalseExpectActiveLabel
                .filter((_, v) => v)
                .mapToArray((k, v) => ({
                  label: k,
                  isActive: v,
                })),
              labels: allFalseExpectActiveLabel,
            });
          }}
          renderInput={(params) => <TextField {...params} placeholder={name} />}
        />
      </Grid>
      <Grid>
        {labels.currentActiveLabels.map(({ label }) => (
          <Chip
            key={label}
            label={label}
            variant='outlined'
            onDelete={() => {
              setLabels({
                currentActiveLabels: labels.currentActiveLabels.filter(
                  (other) => other.label != label,
                ),
                labels: labels.labels.set(label, false),
              });
            }}
          />
        ))}
      </Grid>
    </Paper>
  );
};
