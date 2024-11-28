import Grid from '@mui/material/Grid2';
import React, { useCallback, useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { IconButton } from '@mui/material';

export interface AccordionItemProps {
  header: React.ReactNode;
  isOpen?: boolean;
  children: React.ReactNode;
  childrenWhenClosed: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  header,
  isOpen,
  children,
  childrenWhenClosed
}) => {
  const [open, setOpen] = useState<boolean>(isOpen ?? true);

  useEffect(() => {
    setOpen(isOpen ?? open);
  }, [isOpen]);

  const ExpandMore = useCallback(
    () => (
      <IconButton
        onClick={() => {
          setOpen(true);
        }}>
        <ExpandMoreIcon fontSize='small' />{' '}
      </IconButton>
    ),
    [setOpen]
  );

  const ExpandLess = useCallback(
    () => (
      <IconButton
        onClick={() => {
          setOpen(false);
        }}>
        <ExpandLessIcon fontSize='small' />{' '}
      </IconButton>
    ),
    []
  );

  return (
    <Grid
      container
      direction='column'
      sx={{ border: '1px solid grey', borderRadius: '8px', maxWidth: '400px', minWidth: '250px' }}>
      <Grid
        container
        direction='row'
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '4px',
          borderBottom: '1px solid grey'
        }}>
        {header}
        {open ? <ExpandLess /> : <ExpandMore />}
      </Grid>
      <div style={{ display: open ? 'flex' : 'none', flexDirection: 'column' }}>{children}</div>
      <div style={{ display: !open ? 'flex' : 'none' }}>{childrenWhenClosed}</div>
    </Grid>
  );
};
