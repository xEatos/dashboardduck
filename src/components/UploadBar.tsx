import { Box, useTheme } from '@mui/material';
import React from 'react';

interface Props<T> {
  value: T;
  maxValue: T;
  convert: (v: T) => number;
  toLabel: (v: T) => React.ReactNode;
  width?: number | string;
}

export const UploadBar = <R,>({ value, maxValue, convert, toLabel, width }: Props<R>) => {
  const theme = useTheme();
  const numMaxValue = convert(maxValue);
  const ratio = 100 / numMaxValue;
  const valuePercentage = convert(value) * ratio;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'nowrap',
        width: width ?? '100%'
      }}>
      <Box
        sx={{
          width: `${valuePercentage}%`,
          border: '1px solid black',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          backgroundColor: theme.palette.primary.main
        }}></Box>
      <Box
        sx={{
          display: 'flex',
          width: `${100 - valuePercentage}%`,
          border: '1px solid black',
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px',
          justifyContent: 'flex-end',
          backgroundColor: theme.palette.primary.light,
          paddingRight: 1,
          color: 'white'
        }}>
        {toLabel(value)} / {toLabel(maxValue)}
      </Box>
    </Box>
  );
};
