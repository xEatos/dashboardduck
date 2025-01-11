import { Box, Button, Typography } from '@mui/material';
import { getUserSession, User } from '../integrationpage/IntegrationPage';
import { ParsedFile } from './ValidateDataPanel';
import React, { useEffect, useState } from 'react';
import { useIsUserAuthenticated } from '../../queries/userGetUserAuthenticated';
import { AuthenticationStatus, VerifyUploadMutation } from '../../__generated__/graphql';

interface Props {
  link: VerifyUploadMutation | null | undefined;
}

// polling in new stepper until user has verified by checking request_query_string, access_token, etc (GET_IS_VERIFIED)
// Ask user to start upload, then polling for updated until done, can not be interrupted
// if backend is done remove uploaded json file (as a flag?)

export const AuthenticatePanel: React.FC<Props> = ({ link }) => {
  const user = getUserSession();
  const [authenticationBtnClicked, setAuthenticationBtnClicked] = useState(false);
  const [authenticationDone, setAuthenticationDone] = useState(false);

  const handleOpenAuth = () => {
    setAuthenticationBtnClicked(true);
    if (link?.verifyUploadWlpVideosToWiki.url) {
      window.open(link.verifyUploadWlpVideosToWiki.url, 'wikibasetab');
    }
  };

  if (authenticationDone) {
    return <Button>Press start to begin the import</Button>;
  }

  return authenticationBtnClicked && user ? (
    <PollingForAuthenticationDone {...{ user, setAuthenticationDone }} />
  ) : (
    <Button onClick={handleOpenAuth}>Authenticate your account at bn wikibase </Button>
  );
};

const PollingForAuthenticationDone: React.FC<{
  user: User;
  setAuthenticationDone: (v: boolean) => void;
}> = ({ user, setAuthenticationDone }) => {
  const { data, error, loading } = useIsUserAuthenticated(user.userId, 1000);
  console.log('PollingForAuthenticationDone');
  console.log(data);

  useEffect(() => {
    if (data?.isAuthenticated.status === AuthenticationStatus.Authenticated) {
      console.log('Authenticated', data?.isAuthenticated.status);
      setAuthenticationDone(true);
    }
  }, [data]);

  if (error || loading) {
    return <Typography>Loading...</Typography>;
  }

  switch (data?.isAuthenticated.status) {
    case AuthenticationStatus.Pending:
      return <Typography>Authentication Pending</Typography>;
    case AuthenticationStatus.Authenticated:
      return <Typography>Authencation Complete</Typography>;
    default:
      return <Typography>Not Authenticated</Typography>;
  }
};
