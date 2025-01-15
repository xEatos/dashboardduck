import React, { Suspense, useState } from 'react';
import { User } from '../IntegrationPage';
import { useSuspenseGetUserConsumerToken } from '../../../queries/useSuspenseGetUserConsumerToken';
import Grid from '@mui/material/Grid2';
import { SecretInput } from '../../../components/inputs/SecretInput';
import { ErrorBoundary } from 'react-error-boundary';
import consumerRights from '../../../assets/ConsumerRights.png';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_CONSUMER } from '../../../mutations/useCreateConsumer';
import { Command, WikibaseUserConsumer } from './WikibaseCard';

export const MirahezeCard: React.FC<User> = (props) => (
  <ErrorBoundary fallback={<p>Error!</p>}>
    <Suspense fallback={<CircularProgress />}>
      <WikibaseCardContent {...props} />
    </Suspense>
  </ErrorBoundary>
);

const WikibaseCardContent: React.FC<User> = ({ userId }) => {
  const { getConsumerToken } = useSuspenseGetUserConsumerToken(userId); // TODO change to include a wiki id
  switch (getConsumerToken.__typename) {
    case 'NoConsumerRegistered': {
      return <WikibaseNoConsumerRegistered userId={getConsumerToken.id} />;
    }
    case 'UserConsumer': {
      const { id, key, secret } = getConsumerToken;
      return <WikibaseUserConsumer {...{ id, ckey: key, secret }} />;
    }
  }
};

const urlPrefix = 'https://preferably-valid-ibex.ngrok-free.app/oAuth/';

interface UserConsumer {
  userId: string;
  key?: string;
  secret?: string;
}

const WikibaseNoConsumerRegistered: React.FC<{ userId: string }> = ({ userId }) => {
  const [setConsumer, { data }] = useMutation(CREATE_CONSUMER);
  const [consumerToken, setConsumerToken] = useState<UserConsumer>({ userId });

  const url = urlPrefix + userId;

  const handleOnFinish = () => {
    if (consumerToken.key?.length === 32 && consumerToken.secret?.length === 40) {
      setConsumer({
        variables: {
          consumerInput: {
            id: userId,
            key: consumerToken.key,
            secret: consumerToken.secret
          }
        }
      });
    }
  };

  if (data) {
    const { id, key, secret } = data.createOrUpdateConsumer;
    return <WikibaseUserConsumer {...{ id, ckey: key, secret }} />;
  }

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Follow these three steps to register a Consumer at Wikibase - BorgNetzwerk
      </Typography>
      <Grid container rowGap={4}>
        <Grid size={{ xs: 1 }}>
          <Typography>{'Step 1)'}</Typography>
        </Grid>
        <Grid container size={{ xs: 11 }} spacing={1}>
          <Command
            id='open'
            label='Pleas open the Miraheze Meta Page and add the following data that is provided below:'
            copyText='https://meta.miraheze.org/wiki/Special:OAuthConsumerRegistration/propose/oauth1a'
          />
        </Grid>
        <Grid size={{ xs: 1 }}>
          <Typography>{'Step 2)'}</Typography>
        </Grid>
        <Grid container size={{ xs: 11 }} spacing={1}>
          <Command id='name' label='Application name:' copyText='DashboardDuck App' />
          <Command
            id='desc'
            label='Application description:'
            copyText='DashboardDuck is an app for curated scientific videos and podcast.'
          />
          <Command id='callback' label='OAuth "callback" URL:' copyText={url} />
        </Grid>
        <Grid size={{ xs: 1 }}>
          <Typography>{'Step 3)'}</Typography>
        </Grid>
        <Grid size={{ xs: 11 }} container>
          <Grid size={{ xs: 3 }}>
            <Typography>{'Set these rights like show in the image:'}</Typography>
          </Grid>
          <Grid size={{ xs: 9 }}>
            <img src={consumerRights} width={570} alt='ConsumerRights' />
          </Grid>
        </Grid>
        <Grid size={{ xs: 1 }}>
          <Typography>{'Step 4)'}</Typography>
        </Grid>
        <Grid size={{ xs: 11 }} container spacing={1}>
          <Grid size={{ xs: 11 }}>
            <Typography>{`After Clicking "Propose consumer", please enter the displayed consumer key and secret below`}</Typography>
          </Grid>
          <Grid size={{ xs: 11 }}>
            <SecretInput
              label='Consumer Key (also called Application Key)'
              required
              charCount={50}
              isHidden={false}
              value={consumerToken.key ?? ''}
              onChange={(key) => {
                console.log('key:', key);
                setConsumerToken({ ...consumerToken, key });
              }}
            />
          </Grid>
          <Grid size={{ xs: 11 }}>
            <SecretInput
              label='Consumer Secret (also called Application Secret)'
              required
              charCount={50}
              value={consumerToken.secret ?? ''}
              onChange={(secret) => {
                setConsumerToken({ ...consumerToken, secret });
              }}
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 1 }}>
          <Typography>{'Step 5)'}</Typography>
        </Grid>
        <Grid size={{ xs: 11 }} container sx={{ justifyContent: 'end' }} spacing={1}>
          <Button onClick={handleOnFinish}>Finish</Button>
        </Grid>
      </Grid>
    </>
  );
};
