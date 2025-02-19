import {
  IconButton,
  Pagination,
  Paper,
  Popper,
  PopperPlacementType,
  Typography
} from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export type Task = {
  label: string;
  content: string;
  status: 'Done' | 'InWork';
};

export interface TaskPopperProps {
  target: HTMLElement | null;
  open?: boolean;
  tasks: Task[];
  currentTask: number;
  placement: PopperPlacementType;
  onClose: () => void;
  onChange: (targetTask: number) => void;
  onTaskStatusChange: (targetTask: number, status: 'Done' | 'InWork') => void;
}

const toggleTaskStatus = (status: 'Done' | 'InWork'): 'Done' | 'InWork' =>
  status === 'Done' ? 'InWork' : 'Done';

export const TaskPopper: React.FC<TaskPopperProps> = ({
  target,
  open,
  tasks,
  currentTask,
  placement,
  onClose,
  onChange,
  onTaskStatusChange
}) => {
  return (
    <Popper
      sx={{ zIndex: 1201 }}
      open={open ?? true}
      anchorEl={target}
      placement={placement}
      disablePortal={true}>
      <Paper>
        <Grid
          container
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '250px',
            minWidth: '400px',
            maxWidth: '400px',
            padding: '16px',
            backgroundColor: tasks[currentTask].status === 'Done' ? '#E8F5E9' : undefined
          }}>
          <Grid container sx={{ flexDirection: 'column' }}>
            <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Grid container sx={{ alignItems: 'center' }}>
                <Typography variant='h6'>Task: {tasks[currentTask].label}</Typography>
                <IconButton
                  onClick={() => {
                    onTaskStatusChange(currentTask, toggleTaskStatus(tasks[currentTask].status));
                  }}>
                  <CheckIcon
                    fontSize='medium'
                    sx={{ fill: tasks[currentTask].status === 'Done' ? '#2e7d32' : undefined }}
                  />
                </IconButton>
              </Grid>
              <IconButton sx={{ marginBottom: '7px' }} onClick={onClose}>
                <CloseIcon fontSize='small' />
              </IconButton>
            </Grid>
            <Typography>{tasks[currentTask].content}</Typography>
          </Grid>
          <Grid container sx={{ alignSelf: 'center' }}>
            <Pagination
              page={currentTask + 1}
              count={Object.entries(tasks).length}
              onChange={(_, targetTask) => {
                onChange(targetTask - 1);
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Popper>
  );
};
