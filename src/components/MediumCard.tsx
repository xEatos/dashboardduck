import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { MediumBadge } from './MediumBadge';
import { PropsWithChildren } from 'react';
import { convertDuration } from '../utils/duration';
import { clip } from '../utils/clipString';

import { MediaQuery } from '../__generated__/graphql';
import { gql, useQuery } from '@apollo/client';

export interface MediumCardProp {
  id: string;
  title: string;
  channel: string;
  date: string;
  duration: number;
  thumbnail: URL;
  type: 'Video' | 'Podcast';
}

const Title: React.FC<{ title: string }> = ({ title }: { title: string }) => (
  <Tooltip title={title} placement="top">
    <Typography
      component="div"
      variant="body1"
      gutterBottom
      sx={{
        whiteSpace: 'nowrap',
      }}
    >
      {clip(title, '…', 35)}
    </Typography>
  </Tooltip>
);

const Channel: React.FC<{ title: string }> = ({ title }: { title: string }) => (
  <Tooltip title={'DoctorWhatson'} placement="bottom">
    <Typography variant="body2" sx={{ color: '#606060', cursor: 'pointer' }}>
      {clip(title, '…', 20)}
    </Typography>
  </Tooltip>
);

const StatGrid: React.FC<PropsWithChildren> = (props) => (
  <Grid container direction="row" sx={{ alignItems: 'center' }} spacing={0.5}>
    {props.children}
  </Grid>
);

const StatText: React.FC<PropsWithChildren> = (props) => (
  <Typography variant="body2" sx={{ color: '#606060' }}>
    {props.children}
  </Typography>
);

const GET_MEDIA = gql(`
  query Media($first: Int!) {
  mediaConnections(first: $first) {
    edges {
      node {
        id
        title
        thumbnail
        publication
        duration
        channel
      }
    }
  }
}
`);

const toModel = (data: MediaQuery | undefined): MediumCardProp | undefined => {
  if (data?.mediaConnections?.edges && data.mediaConnections.edges[0].node) {
    const fe = data.mediaConnections.edges[0].node;
    return {
      id: fe.id,
      title: fe.title ?? '',
      channel: fe.channel ?? '',
      date: fe.publication ?? '',
      duration: fe.duration ?? NaN,
      thumbnail: new URL(fe.thumbnail ?? ''),
      type: 'Video',
    };
  }
  return undefined;
};

export const MediumCard = (props: MediumCardProp) => {
  const { loading, error, data } = useQuery(GET_MEDIA, {
    variables: {
      first: 10,
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  const modelData = toModel(data);

  if (modelData === undefined) {
    return <p>Error</p>;
  }

  return (
    <Box>
      <MediumBadge type={modelData.type} />
      <Card
        sx={{ maxWidth: 320, padding: '0px', borderRadius: '8px' }}
        variant="elevation"
      >
        <CardMedia
          component="img"
          height={180}
          image={modelData.thumbnail.toString()}
          loading="lazy"
          sx={{ borderRadius: '0px 0px 8px 8px', cursor: 'pointer' }}
        />
        <CardContent style={{ paddingBottom: '16px' }}>
          <Grid container direction="column">
            <Title title={modelData.title} />
            <Channel title={modelData.channel}></Channel>
            <Grid
              container
              direction="row"
              sx={{ paddingTop: '2px', justifyContent: 'space-between' }}
            >
              <StatGrid>
                <TimerOutlinedIcon />
                <StatText>{convertDuration(modelData.duration)}</StatText>
              </StatGrid>
              <StatGrid>
                <CalendarMonthOutlinedIcon />
                <StatText>{modelData.date}</StatText>
              </StatGrid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
