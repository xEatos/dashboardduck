import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getUserSession, User } from '../integrationpage/IntegrationPage';
import React, { useEffect, useState } from 'react';
import { useIsUserAuthenticated } from '../../queries/userGetUserAuthenticated';
import { AuthenticationStatus, VerifyUploadMutation } from '../../__generated__/graphql';
import { StepBox } from './ImportStepper';
import { UploadBar } from '../../components/UploadBar';

interface Props {
  link: VerifyUploadMutation | null | undefined;
  startUpload: (userId: string) => void;
}

// polling in new stepper until user has verified by checking request_query_string, access_token, etc (GET_IS_VERIFIED)
// Ask user to start upload, then polling for updated until done, can not be interrupted
// if backend is done remove uploaded json file (as a flag?)

export const AuthenticatePanel: React.FC<Props> = ({ link, startUpload }) => {
  const user = getUserSession();
  const [authenticationBtnClicked, setAuthenticationBtnClicked] = useState(false);
  const [authenticationDone, setAuthenticationDone] = useState(false);

  const handleOpenAuth = () => {
    setAuthenticationBtnClicked(true);
    if (link?.verifyUploadWlpVideosToWiki.url) {
      window.open(link.verifyUploadWlpVideosToWiki.url, 'wikibasetab');
    }
  };

  const renderCenterPart = authenticationDone ? (
    <Typography variant='h6'>Please press next to begin the import</Typography>
  ) : authenticationBtnClicked && user ? (
    <PollingForAuthenticationDone {...{ user, setAuthenticationDone }} />
  ) : (
    <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Typography component={'strong'} gutterBottom>
        Authorize Dashboard-Duck to access Borgnetzwerk-Wikibase functions on your behalf.
      </Typography>
      <Button variant='outlined' onClick={handleOpenAuth}>
        Authorize
      </Button>
    </Grid>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '40px'
      }}>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>{renderCenterPart}</Box>
      <StepBox
        {...(authenticationDone
          ? {
              backEnable: true,
              nextEnable: true,
              onNext: () => {
                if (user) {
                  startUpload(user.userId);
                }
              }
            }
          : { backEnable: true, nextEnable: false })}
      />
    </Box>
  );
};

const PollingForAuthenticationDone: React.FC<{
  user: User;
  setAuthenticationDone: (v: boolean) => void;
}> = ({ user, setAuthenticationDone }) => {
  const { data, error, loading } = useIsUserAuthenticated(user.userId, 1000);

  useEffect(() => {
    if (data?.isAuthenticated.status === AuthenticationStatus.Authenticated) {
      console.log('Authenticated', data?.isAuthenticated.status);
      setAuthenticationDone(true);
    }
  }, [data]);

  if (error || loading) {
    return <CircularProgress />;
  }

  switch (data?.isAuthenticated.status) {
    case AuthenticationStatus.Pending:
      return <Typography variant='h6'>Authorization Pending</Typography>;
    case AuthenticationStatus.Authenticated:
      return <Typography variant='h6'>Authorization Complete</Typography>;
    default:
      return <Typography variant='h6'>Not Authorized</Typography>;
  }
};
