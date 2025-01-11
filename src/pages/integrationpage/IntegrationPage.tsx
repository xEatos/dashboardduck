import React from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { PseudoLoginPane } from './PseudoLoginPane';
import { CREATE_USER } from '../../mutations/useCreateUser';
import { LAZY_GET_USER } from '../../queries/useLazyGetUser';
import { IntegrationsCards } from './IntegrationCard';
import Grid from '@mui/material/Grid2';

const sessionUserKey = 'SESSION-USER-KEY';

export interface User {
  userId: string;
  email: string;
}

export const getUserSession = (): User | undefined => {
  const raw = window.sessionStorage.getItem(sessionUserKey);
  if (raw) {
    return JSON.parse(raw);
  }
  return undefined;
};

const setUserSession = (user: User): void => {
  window.sessionStorage.setItem(sessionUserKey, JSON.stringify(user));
};

export const IntegrationPage: React.FC = () => {
  console.log('IntegrationPage');
  const user = getUserSession();

  if (user) {
    return <IntegrationsCards {...user} />;
  }

  const [createUser, { data: dataCreateUser }] = useMutation(CREATE_USER);
  const [getUser, { data: dataGetUser }] = useLazyQuery(LAZY_GET_USER);

  if (dataCreateUser) {
    const user = {
      email: dataCreateUser.createUser.email,
      userId: dataCreateUser.createUser.id
    };
    return <FirstLogIn {...user} />;
  }

  if (dataGetUser) {
    const user = { email: dataGetUser.getUser.email, userId: dataGetUser.getUser.id };
    return <FirstLogIn {...user} />;
  }

  const handleOnRegister = async (value: string) => {
    createUser({ variables: { email: value } });
  };

  const handleOnLogin = (value: string) => {
    getUser({ variables: { email: value } });
  };

  return <PseudoLoginPane onLogin={handleOnLogin} onRegister={handleOnRegister} />;
};

const FirstLogIn: React.FC<User> = (user) => {
  setUserSession(user);
  return <IntegrationsCards {...user} />;
};
