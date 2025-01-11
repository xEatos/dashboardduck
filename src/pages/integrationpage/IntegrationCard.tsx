import { Box, Card, CardActions, CardContent, SxProps, Theme, Typography } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { User } from './IntegrationPage';
import Grid from '@mui/material/Grid2';
import { WikibaseCard } from './integrationContent/WikibaseCard';
import { YoutubeCard } from './integrationContent/YoutubeCard';

interface Props {
  id: string;
  label: string;
  content: React.ReactNode;
  logo: URL;
  overrideSx?: SxProps<Theme>;
}

export const IntegrationCard: React.FC<Props> = (props) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenClick = () => {
    setOpen(!isOpen);
  };

  return (
    <Card sx={{ maxWidth: 450, ...props.overrideSx }}>
      <CardActions disableSpacing>
        <Grid container sx={{ flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
          {isOpen ? (
            <>
              <img src={props.logo.toString()} height={48} />
              <Typography variant='h6'>{props.label}</Typography>
            </>
          ) : (
            <Box />
          )}
          <ExpandMore
            expand={isOpen}
            onClick={handleOpenClick}
            aria-expanded={isOpen}
            aria-label='show more'>
            <ExpandMoreIcon />
          </ExpandMore>
        </Grid>
      </CardActions>
      <CardContent>
        {!isOpen ? (
          <Grid container sx={{ justifyContent: 'center' }}>
            <img
              src={props.logo.toString()}
              width='400'
              alt={props.label}
              style={{ margin: '4px', cursor: 'pointer' }}
              onClick={handleOpenClick}
            />
          </Grid>
        ) : (
          props.content
        )}
      </CardContent>
    </Card>
  );
};

export const IntegrationsCards: React.FC<User> = (props) => {
  return (
    <Grid container spacing={1} m={1}>
      <Grid>
        <IntegrationCard
          id='youtube'
          label='YouTube'
          logo={
            new URL(
              'https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png'
            )
          }
          overrideSx={{ maxWidth: 'auto', width: '500px' }}
          content={<YoutubeCard {...props} />}
        />
      </Grid>
      <Grid>
        <IntegrationCard
          id='Wikibase'
          label='Wikibase BorgNetzwerk'
          logo={
            new URL(
              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Wikibase_logo.svg/640px-Wikibase_logo.svg.png'
            )
          }
          overrideSx={{ maxWidth: 'auto', width: '860px' }}
          content={<WikibaseCard {...props} />}
        />
      </Grid>
    </Grid>
  );
  // https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Wikibase_logo.svg/640px-Wikibase_logo.svg.png
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)'
      }
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)'
      }
    }
  ]
}));
