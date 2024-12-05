import { AppBar, Toolbar, IconButton } from '@mui/material';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { SearchInput } from './SearchInput';
import { useNavigate } from 'react-router-dom';

export const DashboardAppBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          edge='start'
          onClick={() => {
            navigate('/');
          }}>
          <DashboardIcon fontSize='large' sx={{ fill: 'white' }} />
        </IconButton>
        <SearchInput sx={{ mr: 'auto' }} />
        <IconButton edge='end'>
          <AccountCircle fontSize='large' sx={{ fill: 'white' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
