import React, { Suspense, useEffect, useState } from 'react';
import { User } from '../IntegrationPage';
import { ErrorBoundary } from 'react-error-boundary';
import { useLazyQuery, useMutation } from '@apollo/client';
import Grid from '@mui/material/Grid2';
import { SecretInput } from '../../../components/inputs/SecretInput';
import { SET_YOUTUBE_KEY } from '../../../mutations/useSetYouTubeKey';
import { useGetYouTubeKey } from '../../../queries/useGetYouTubeKey';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';

export const YoutubeCard: React.FC<User> = ({ userId }) => {
  return (
    <ErrorBoundary fallback={<p>Error</p>}>
      <Suspense fallback={<CircularProgress />}>
        <YoutubeCardContent userId={userId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export const YoutubeCardContent: React.FC<{ userId: string }> = ({ userId }) => {
  const [setYouTubeKey, { data }] = useMutation(SET_YOUTUBE_KEY);
  console.log('data:', data);
  const [newKey, setNewKey] = useState('');

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 4 }} sx={{ alignSelf: 'center' }}>
        <Typography sx={{ paddingTop: '12px' }}>{'Set new Key:'}</Typography>
      </Grid>
      <Grid size={{ xs: 8 }}>
        <SecretInput label={'New Key'} value={newKey} onChange={setNewKey} charCount={40} />
      </Grid>
      <Grid size={{ xs: 12 }} container sx={{ justifyContent: 'end' }}>
        <Button
          onClick={() => {
            if (newKey) {
              console.log('update:', newKey);
              setYouTubeKey({
                variables: {
                  keyInput: {
                    id: userId,
                    youTubeKey: newKey
                  }
                }
              });
            }
          }}>
          {'Set New Key'}
        </Button>
      </Grid>
    </Grid>
  );
};
