import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';

interface Props {
  onLogin: (value: string) => void;
  onRegister: (value: string) => void;
}

export const PseudoLoginPane: React.FC<Props> = ({ onLogin, onRegister }) => {
  const [input, setInput] = useState('');

  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{ paddingTop: 2 }}>
      <Grid container spacing={2} width={450}>
        <Grid size={{ xs: 12 }} textAlign={'center'}>
          <Typography variant='h4'>Integration Panel</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            sx={{ width: 450 }}
            id='email-input'
            value={input}
            label='Email'
            variant='outlined'
            placeholder='max.mustermann@mail.de'
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Button
            variant='outlined'
            onClick={() => {
              onLogin(input);
            }}>
            Log In
          </Button>
        </Grid>
        <Grid size={{ xs: 6 }} textAlign={'right'}>
          <Button
            variant='outlined'
            onClick={() => {
              onRegister(input);
            }}>
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
