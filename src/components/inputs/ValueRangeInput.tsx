import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Slider, Typography } from '@mui/material';

export interface ValueRangeInputProps<T> {
  label?: React.ReactNode;
  min: T;
  max: T;
  minValue: T;
  maxValue: T;
  valueToNumber: (v: T) => number;
  numberToValue: (v: number) => T;
  valueToLabel: (v: T) => React.ReactNode;
  disableSwap: boolean;
  onChange: (min: T, max: T) => void;
}

export const ValueRangeInput = <R,>({
  label,
  min,
  max,
  minValue,
  maxValue,
  valueToLabel,
  valueToNumber,
  numberToValue,
  onChange,
  disableSwap
}: ValueRangeInputProps<R>) => {
  const [values, setValues] = useState<R[]>([minValue, maxValue]);

  useEffect(() => {
    setValues([minValue, maxValue]);
  }, [minValue, maxValue]);

  return (
    <Box sx={{ width: '300px', padding: '4px 2px 2px 14px' }}>
      {label}
      <Grid container direction='row' wrap='nowrap' spacing={2}>
        <Typography>{valueToLabel(values[0])}</Typography>
        <Slider
          value={values.map((v) => valueToNumber(v))}
          disableSwap={disableSwap}
          min={valueToNumber(min)}
          max={valueToNumber(max)}
          onChange={(_, otherValues) => {
            if (Array.isArray(otherValues)) {
              setValues(otherValues.map((v) => numberToValue(v)));
            }
          }}
          onChangeCommitted={(_, otherValues) => {
            if (Array.isArray(otherValues)) {
              onChange(numberToValue(otherValues[0]), numberToValue(otherValues[1]));
            }
          }}
        />
        <Typography>{valueToLabel(values[1])}</Typography>
      </Grid>
    </Box>
  );
};
