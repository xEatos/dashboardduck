import React from 'react';
import Grid from '@mui/material/Grid2';
import { DateField, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { Box, TextField, TextFieldProps, TextFieldVariants } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

export interface DateInputProps<T> {
  locale: string;
  label: React.ReactNode;
  value: T;
  valueToDate: (v: T) => Dayjs | null;
  onChange: (otherDate: Dayjs) => void;
}

const SmallTextField: React.FC<TextFieldProps> = (params) => <TextField {...params} size='small' />;

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
          <DatePicker
            slots={{
              textField: SmallTextField
            }}
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
