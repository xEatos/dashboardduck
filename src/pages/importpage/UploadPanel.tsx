import React from 'react';
import { UploadCard } from '../../components/UploadCard';
import { ImportExamplePanel } from './ImportExample';
import { StepBox } from './ImportStepper';
import Grid from '@mui/material/Grid2';

interface Props {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
}

export const UploadPanel: React.FC<Props> = ({ uploadedFiles, setUploadedFiles }) => {
  return (
    <>
      <Grid
        container
        direction='column'
        size={{ xs: 12 }}
        sx={{ alignContent: 'center', alignItems: 'center' }}>
        <UploadCard
          fileTypes={['application/json']}
          maxFiles={1}
          maxSize={Number.POSITIVE_INFINITY}
          onChange={setUploadedFiles}
        />
      </Grid>
      <StepBox nextEnable={uploadedFiles.length > 0} />
      <Grid
        container
        direction='column'
        size={{ xs: 12 }}
        sx={{ alignContent: 'center', alignItems: 'center' }}>
        <ImportExamplePanel />
      </Grid>
    </>
  );
};
