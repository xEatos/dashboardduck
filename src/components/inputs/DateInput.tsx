import React from 'react';
import Grid from '@mui/material/Grid2';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { Box } from '@mui/material';

export interface DateInputProps<T> {
  locale: string;
  label: React.ReactNode;
  value: T;
  valueToDate: (v: T) => Dayjs | null;
  onChange: (otherDate: Dayjs) => void;
}

export const DateInput = <R,>({
  label,
  value,
  valueToDate,
  locale,
  onChange
}: DateInputProps<R>) => {
  return (
    <Box sx={{ padding: 0.75, margin: '4px 8px 4px 16px' }}>
      <Grid
        container
        direction='row'
        wrap='nowrap'
        spacing={2}
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        {label}
        <LocalizationProvider adapterLocale={locale} dateAdapter={AdapterDayjs}>
          <DateField
            size='small'
            value={valueToDate(value)}
            onChange={(otherDate) => {
              if (otherDate) {
                onChange(otherDate);
              }
            }}
          />
        </LocalizationProvider>
      </Grid>
    </Box>
  );
};
