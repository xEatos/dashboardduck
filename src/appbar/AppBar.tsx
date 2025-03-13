import { AppBar, Toolbar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import { Task, TaskPopper } from '../components/TaskPopper';
import TaskIcon from '@mui/icons-material/Task';
import dashboardDuckLogo from '../assets/1_1_transparent.png';

const defaultTasks = [
  {
    label: 'A1',
    content:
      'Suche nach einem Video mit dem Titel: Achim Spiller: Nachhaltige Ernährung - Ringvorlesung "Tier oder Tofu? Was isst die Zukunft?"'
  },
  {
    label: 'A2',
    content:
      'Suche nach einem beliebigen Video, welches das Thema “History” beinhaltet und vom  Kanal: Universität Göttingen stammen muss.'
  },
  {
    label: 'A3',
    content:
      'Suche nach einem Video, das nach dem 01.01.2023 erschienen ist und das Thema “Fettleber” beinhaltet.'
  },
  {
    label: 'A4',
    content:
      'Suche nach einem Video das zwischen 2013 und 2014 veröffentlicht wurde, welches eine Länge von mindestens 60 Minuten hat und über Computer Science handelt.'
  },
  {
    label: 'A5',
    content: 'Suche nach einem Video in englischer Sprache.'
  }
];

export const DashboardAppBar: React.FC = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tasks, setTasks] = useState<Task[]>(
    defaultTasks.map((task) => ({ ...task, status: 'InWork' }))
  );
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(0);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleOnTaskChange = (targetTask: number) => {
    setTask(targetTask);
  };

  const handleOnTaskStatusChange = (targetTask: number, status: 'Done' | 'InWork') => {
    const cTasks = [...tasks];
    cTasks[targetTask].status = status;
    setTasks(cTasks);
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        '& .MuiToolbar-root': { padding: '0px 8px' }
      }}>
      <Toolbar>
        <img
          src={dashboardDuckLogo}
          style={{
            backgroundColor: 'white',
            borderRadius: '25%',
            padding: '2px',
            marginRight: 'auto'
          }}
          width={51}
          alt='ConsumerRights'
          onClick={() => {
            navigate('/');
          }}
        />
        <IconButton onClick={handleOnClick} edge='end'>
          <TaskIcon fontSize='large' sx={{ fill: 'white' }} />
        </IconButton>
        <TaskPopper
          placement='bottom-end'
          target={anchorEl}
          currentTask={task}
          tasks={tasks}
          open={open}
          onClose={handleOnClose}
          onChange={handleOnTaskChange}
          onTaskStatusChange={handleOnTaskStatusChange}
        />
      </Toolbar>
    </AppBar>
  );
};
