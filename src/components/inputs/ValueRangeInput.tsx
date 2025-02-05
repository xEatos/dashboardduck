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
  width?: string | number;
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
  disableSwap,
  width
}: ValueRangeInputProps<R>) => {
  const [values, setValues] = useState<R[]>([minValue, maxValue]);

  useEffect(() => {
    setValues([minValue, maxValue]);
  }, [minValue, maxValue]);

  return (
    <Box sx={{ padding: '2px 4px 4px 2px' }}>
      {label}
      <Grid container direction={'row'} size={{ xs: 12 }} alignItems={'center'}>
        <Grid size={{ xs: 2 }} textAlign={'end'}>
          <Typography>{valueToLabel(values[0])}</Typography>
        </Grid>
        <Grid size={{ xs: 8 }} sx={{ padding: '6px 16px 0px 16px' }}>
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
        </Grid>
        <Grid size={{ xs: 2 }} textAlign={'start'}>
          <Typography>{valueToLabel(values[1])}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
