import { Box, Typography } from '@mui/material';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StepBox } from './ImportStepper';

interface Props {
  file: File;
}

interface ContainerProps extends Props {}

export const ValidateDataPanel: React.FC<Props> = ({ file }) => {
  return (
    <ErrorBoundary fallback={<Typography color='error'>Error</Typography>}>
      <Typography>Hello World</Typography>
      <ValidateDataPanelContainer {...{ file }} />
      <StepBox backEnable nextEnable={false} />
    </ErrorBoundary>
  );
};

export const ValidateDataPanelContainer: React.FC<ContainerProps> = ({ file }) => {
  //const { data } = _useFileWithUse(file);
  //const data = useFile(file);
  const { data } = useInject(file, async (props) => ({ text: await props.text() }));
  return (
    <Box>
      <Typography>File Content</Typography>
      <p>{data?.text}</p>
    </Box>
  );
};

export type LoadedFile = {
  obj: Record<number, any> | undefined;
  text: string | undefined;
  error?: Error;
  file: File;
};

type UseReturn<T> = {
  data: T | undefined;
  loading: boolean;
};

export const use = <T, R>(promise: (input: R) => Promise<T>, input: R): UseReturn<T> => {
  const [state, setState] = useState<UseReturn<T>>({
    data: undefined,
    loading: true
  });

  const innerCall = async () => {
    console.log('call fetchText');
    const data = await promise(input);
    setState({ data, loading: false });
  };

  useEffect(() => {
    console.log('call useEffect');
    innerCall();
  }, [promise]);

  return state;
};
const func = async (file: File) => {
  const text = await file.text();
  const loadedFile: LoadedFile = { obj: undefined, text: undefined, file };
  try {
    loadedFile.obj = JSON.parse(text);
    loadedFile.text = text;
  } catch (error: any) {
    loadedFile.error = error;
  }
  return loadedFile;
};

export const _useFileWithUse = (file: File) => {
  console.log('call _useFileWithUse');

  return use(func, file);
};

export const useFile = (file: File) => {
  console.log('call useFile');
  const [state, setState] = useState<LoadedFile | undefined>(undefined);

  const fetchText = async () => {
    console.log('call fetchText');
    const text = await file.text();
    const loadedFile: LoadedFile = { obj: undefined, text: undefined, file };
    try {
      loadedFile.obj = JSON.parse(text);
      loadedFile.text = text;
    } catch (error: any) {
      loadedFile.error = error;
    }
    setState(loadedFile);
  };

  useEffect(() => {
    console.log('call useEffect');
    fetchText();
  }, [file]);

  return state;
};

export const useInject = <T, R>(props: T, callback: (props: T) => Promise<R>): UseReturn<R> => {
  console.log('call useFile');
  const [state, setState] = useState<UseReturn<R>>({ data: undefined, loading: true });

  const call = async () => {
    const data = await callback(props);
    setState({ data, loading: false });
  };

  useEffect(() => {
    console.log('call useEffect');
    call();
  }, [props]);

  return state;
};
