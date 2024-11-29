import Grid from '@mui/material/Grid2';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { IconButton, styled } from '@mui/material';
import { reactoNodeIsEmpty } from '../utils/functions';

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

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Grid
        container
        direction='column'
        sx={{
          border: '1px solid grey',
          borderRadius: '8px',
          maxWidth: '400px',
          minWidth: '400px'
        }}>
        <Grid
          container
          direction='row'
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px',
            borderBottom: open || !reactoNodeIsEmpty(childrenWhenClosed) ? '1px solid grey' : null,
            backgroundColor: '#f3f3f3',
            borderRadius:
              open || !reactoNodeIsEmpty(childrenWhenClosed)
                ? '8px 8px 0px 0px'
                : reactoNodeIsEmpty(childrenWhenClosed)
                  ? '8px 8px 8px 8px'
                  : '8px 8px 0px 0px'
          }}>
          {header}
          {open ? <ExpandLess /> : <ExpandMore />}
        </Grid>
        <div
          ref={divRef}
          className='childrenDiv'
          style={
            open
              ? {
                  maxHeight: '500px',
                  transition: 'max-height 0.7s linear'
                }
              : {
                  maxHeight: '0px',
                  transition: 'height 0.7s linear'
                }
          }>
          <div style={{ display: open ? 'flex' : 'none', flexDirection: 'column' }}>{children}</div>
        </div>
        <div
          style={{
            display: !open ? 'flex' : 'none',
            flexWrap: 'wrap',
            alignItems: 'center',
            ...(!open && !reactoNodeIsEmpty(childrenWhenClosed)
              ? { gap: '8px', padding: '8px' }
              : {})
          }}>
          {childrenWhenClosed}
        </div>
      </Grid>
    </>
  );
};
