import React, { useEffect, useState } from 'react';
import { DashboardAppBar } from './appbar/AppBar';
import Grid from '@mui/material/Grid2';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';

const pagePathWithIcons = [
  { label: 'Search', path: 'search', icon: <SearchOutlinedIcon fontSize='large' /> },
  { label: 'Import', path: 'import', icon: <ImportExportOutlinedIcon fontSize='large' /> }
  //{ label: 'TestPage', path: 'test', icon: <BugReportOutlinedIcon fontSize='large' /> }
];

const drawerWidthOpen = 240;
const drawerWidthClosed = 64;

const PageNavigation: React.FC = () => {
  const [isTextCollapsed, setTextCollapsed] = useState(false);
  const location = useLocation();
  const navigation = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(location);

  useEffect(() => {
    setCurrentLocation(location);
  }, [location]);

  const onToggleCollapse = () => {
    setTextCollapsed(!isTextCollapsed);
  };

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: isTextCollapsed ? drawerWidthClosed : drawerWidthOpen,

        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isTextCollapsed ? drawerWidthClosed : drawerWidthOpen,
          boxSizing: 'border-box'
        }
      }}>
      <Toolbar />
      <Grid
        container
        direction='column'
        sx={{
          justifyContent: 'space-between',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
        <Grid container direction='column'>
          {pagePathWithIcons.map((page) => (
            <Grid
              key={page.path}
              onClick={() => {
                if (!currentLocation.pathname.includes(page.path)) {
                  navigation(page.path);
                }
              }}
              container
              alignItems='center'
              sx={{
                padding: '8px',
                paddingLeft: '14.5px',
                width: isTextCollapsed ? drawerWidthClosed : drawerWidthOpen,
                backgroundColor: location.pathname.includes(page.path) ? 'lightgrey' : '',
                cursor: 'pointer'
              }}>
              {page.icon}
              {!isTextCollapsed && (
                <Typography variant='h6' sx={{ paddingLeft: '8px' }}>
                  {page.label}
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          direction='row'
          sx={{ justifyContent: isTextCollapsed ? 'center' : 'flex-end' }}>
          <IconButton onClick={onToggleCollapse}>
            {isTextCollapsed ? (
              <KeyboardDoubleArrowRightOutlinedIcon fontSize='large' />
            ) : (
              <KeyboardDoubleArrowLeftOutlinedIcon fontSize='large' />
            )}
          </IconButton>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export const AppPage: React.FC = () => {
  console.log('Render AppPage');
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DashboardAppBar />
      <PageNavigation />
      <Box component='main' sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
