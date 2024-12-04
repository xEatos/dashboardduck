import { AppBar, Toolbar, IconButton } from '@mui/material';
import React from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { SearchInput } from './SearchInput';

export const DashboardAppBar: React.FC = () => {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton edge='start'>
          <AppsIcon fontSize='large' sx={{ fill: 'white' }} />
        </IconButton>
        <SearchInput sx={{ mr: 'auto' }} />
        <IconButton edge='end'>
          <AccountCircle fontSize='large' sx={{ fill: 'white' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
