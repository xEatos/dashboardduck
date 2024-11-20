import { Box } from '@mui/material';
import VideoIcon from '../icons/VideoIcon';
import { Podcasts } from '@mui/icons-material';

export const MediumBadge = ({ type }: { type: 'Video' | 'Podcast' }) => (
  <Box
    style={{
      position: 'absolute',
      transform: 'translate(284px, 3px)',
      width: '32px',
      height: '32px',
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: '50%',
    }}
  >
    {type === 'Video' ? (
      <VideoIcon
        fontSize="small"
        style={{
          fill: 'white',
          position: 'absolute',
          transform: 'translate(6.3px, 6px)',
        }}
      />
    ) : (
      <Podcasts
        fontSize="small"
        style={{
          fill: 'white',
          position: 'absolute',
          transform: 'translate(6.3px, 6px)',
        }}
      />
    )}
  </Box>
);
