import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useId, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Clear, SearchOutlined } from '@mui/icons-material';

export interface FreeSoloProps {
  label: string;
  text: string | undefined;
  onChange?: (value: string) => void;
  onClear?: () => void;
}

export const FreeSoloInput: React.FC<FreeSoloProps> = ({ text, onChange, onClear }) => {
  const id = useId();
  const [internalText, setInternalText] = useState(text);

  useEffect(() => {
    setInternalText(text);
  }, [text]);

  return (
    <Grid
      container
      flexDirection={'row'}
      wrap='nowrap'
      sx={{
        padding: '8px 8px 8px 16px',
        border: '1px solid grey',
        borderRadius: '8px',
        width: '400px'
      }}
      alignItems={'center'}>
      <Grid container flexGrow={1}>
        <TextField
          id={id}
          hiddenLabel
          fullWidth
          placeholder='What are you searching for?'
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '32' // Set your desired font size
            }
          }}
          value={internalText ?? ''}
          variant='standard'
          onChange={(event) => {
            setInternalText(event.target.value);
          }}
          onKeyUp={({ key }) => {
            if (key === 'Enter') {
              onChange?.(internalText ?? '');
            }
          }}
          {...(onClear
            ? {
                slotProps: {
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton aria-label='clear' onClick={onClear} edge='end'>
                          {<Clear />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }
              }
            : {})}
        />
      </Grid>
      <Grid>
        <IconButton
          onClick={() => {
            onChange?.(internalText ?? '');
          }}>
          <SearchOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
};
