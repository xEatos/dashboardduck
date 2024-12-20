import { Box, Card, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { MediumBadge } from './MediumBadge';
import { PropsWithChildren } from 'react';
import { convertDuration } from '../utils/duration';
import { clip } from '../utils/clipString';
import { Link } from 'react-router-dom';

export interface MediumCardProp {
  id: string;
  cursor: string;
  title: string;
  channel: string;
  date: string;
  duration: number;
  thumbnail: URL;
  type: 'Video' | 'Podcast';
}

const Title: React.FC<{ title: string }> = ({ title }: { title: string }) => (
  <Tooltip title={title} placement='top'>
    <Typography
      component='div'
      variant='body1'
      gutterBottom
      sx={{
        whiteSpace: 'nowrap'
      }}>
      {clip(title, '…', 30)}
    </Typography>
  </Tooltip>
);

const Channel: React.FC<{ title: string }> = ({ title }: { title: string }) => (
  <Tooltip title={'DoctorWhatson'} placement='bottom'>
    <Typography variant='body2' sx={{ color: '#606060', cursor: 'pointer' }}>
      {clip(title, '…', 20)}
    </Typography>
  </Tooltip>
);

const StatGrid: React.FC<PropsWithChildren> = (props) => (
  <Grid container direction='row' sx={{ alignItems: 'center' }} spacing={0.5}>
    {props.children}
  </Grid>
);

const StatText: React.FC<PropsWithChildren> = (props) => (
  <Typography variant='body2' sx={{ color: '#606060' }}>
    {props.children}
  </Typography>
);

//
export const MediumCard = (props: MediumCardProp) => {
  return (
    <Link
      to={`../medium/${encodeURIComponent(props.id)}`}
      style={{ textDecoration: 'none', color: 'inherit' }}>
      <MediumBadge type={props.type} />
      <Card
        sx={{ minWidth: 320, maxWidth: 320, padding: '0px', borderRadius: '8px' }}
        variant='elevation'>
        <CardMedia
          component='img'
          height={'180px'}
          width={'320px'}
          image={props.thumbnail.toString()}
          loading='lazy'
          sx={{ borderRadius: '0px 0px 8px 8px', cursor: 'pointer' }}
        />
        <CardContent style={{ paddingBottom: '16px' }}>
          <Grid container direction='column'>
            <Title title={props.title} />
            <Channel title={props.channel}></Channel>
            <Grid
              container
              direction='row'
              sx={{ paddingTop: '2px', justifyContent: 'space-between' }}>
              <StatGrid>
                <TimerOutlinedIcon />
                <StatText>{convertDuration(props.duration)}</StatText>
              </StatGrid>
              <StatGrid>
                <CalendarMonthOutlinedIcon />
                <StatText>{props.date}</StatText>
              </StatGrid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
};
