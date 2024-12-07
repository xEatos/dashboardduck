import React from 'react';
import { UploadCard } from '../../components/UploadCard';
import Grid from '@mui/material/Grid2';

export const ImportPage: React.FC = () => {
  return (
    <Grid container justifyContent={'center'}>
      <UploadCard />
    </Grid>
  );
};
