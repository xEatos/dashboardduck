import React, { useCallback, useState } from 'react';
import { DashboardAppBar } from './appbar/AppBar';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

const pagePathWithIcons = [
  { label: 'Search', path: 'search', icon: <SearchOutlinedIcon fontSize='large' /> },
  { label: 'Adapter', path: 'adapter', icon: <CableOutlinedIcon fontSize='large' /> }
];

const PageNavigation: React.FC = () => {
  const [isTextCollapsed, setTextCollapsed] = useState(false);
  const prop = 3;

  const onToggleCollapse = useCallback(() => {
    console.log(isTextCollapsed, prop);
    setTextCollapsed(!isTextCollapsed);
  }, []);

  return (
    <Grid container direction='column' sx={{ justifyContent: 'space-between', width: '250px' }}>
      <Grid container direction='column' sx={{ flexGrow: 1 }}>
        {pagePathWithIcons.map((page) => (
          <Link key={page.path} to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Grid container>
              {page.icon}
              {isTextCollapsed && <Typography>{page.label}</Typography>}
            </Grid>
          </Link>
        ))}
      </Grid>
      <Grid container direction='row' sx={{ justifyContent: 'flex-end' }}>
        <IconButton onClick={onToggleCollapse}>
          {isTextCollapsed ? (
            <KeyboardDoubleArrowLeftOutlinedIcon fontSize='large' />
          ) : (
            <KeyboardDoubleArrowRightOutlinedIcon fontSize='large' />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const AppPage: React.FC = () => {
  return (
    <>
      <DashboardAppBar />
      <Grid container direction='row'>
        <PageNavigation />
        <div style={{ border: '1px solid black' }}></div>
      </Grid>
    </>
  );
};
