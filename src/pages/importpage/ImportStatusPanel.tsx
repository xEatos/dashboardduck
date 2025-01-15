import React, { useEffect, useState } from 'react';
import { getUserSession } from '../integrationpage/IntegrationPage';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetUploadStatus } from '../../queries/useGetUploadStatus';
import { UploadBar } from '../../components/UploadBar';
import { StepBox } from './ImportStepper';

export const ImportStatusPanel: React.FC<{ uploadId: string; reset: () => void }> = ({
  uploadId,
  reset
}) => {
  const user = getUserSession();

  const [isImportDoneOrError, setIsImportDoneOrError] = useState<string | undefined>(undefined);

  const render =
    isImportDoneOrError === 'Done' ? (
      <Typography color='success'>Upload done</Typography>
    ) : user ? (
      <UploadProgess uploadId={uploadId} setIsImportDoneOrError={setIsImportDoneOrError} />
    ) : (
      <Typography color='error'>Error</Typography>
    );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '40px'
      }}>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>{render}</Box>
      <StepBox
        {...(isImportDoneOrError === 'Done'
          ? {
              finishEnable: true,
              onFinish: reset
            }
          : { finishEnable: false })}
      />
    </Box>
  );
};

export const UploadProgess: React.FC<{
  uploadId: string;
  setIsImportDoneOrError: (v: string) => void;
}> = ({ uploadId, setIsImportDoneOrError }) => {
  const { data, error, loading } = useGetUploadStatus(uploadId, 1000);
  console.log('data:', data);

  useEffect(() => {
    if (data?.getUploadStatus.message.split(',')[2] == 'Done') {
      setIsImportDoneOrError('Done');
    }
  });

  if (error || loading) {
    return <CircularProgress />;
  }

  if (data) {
    const [index, size, status] = data.getUploadStatus.message.split(',');
    console.log('index:', index, 'size:', size, 'status:', status);
    if (status === 'Done') {
      return <Typography>Upload Done</Typography>;
    } else if (status === 'OnGoing') {
      return (
        <UploadBar
          value={index}
          maxValue={size}
          convert={(v: string | number) => Number(v)}
          toLabel={(v: string | number) => Number(v)}
        />
      );
    } else {
      return <Typography>No Upload</Typography>;
    }
  } else {
    return <Typography>...</Typography>;
  }
};
