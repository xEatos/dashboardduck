import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { Fragment, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StepBox } from './ImportStepper';
import { ErrorLogger, importMediaSchema, logger, ValidateObject } from './utils/schemaValidation';

interface Props {
  files: File[];
  setValidFiles: (it: ParsedFile[]) => void;
}

type Data<T> = {
  data: T | undefined;
};

export type ParsedFile = {
  obj: Record<string, any> | undefined;
  text: string | undefined;
  error?: Error;
  file: File;
  validateError?: string[];
};

export const ValidateDataPanel: React.FC<Props> = ({ files, setValidFiles }) => {
  console.log('<ValidateDataPanel>');
  const [parsedFiles, setParsedFiles] = useState<Data<ParsedFile[]>>({
    data: undefined
  });
  /*
  [
        new Promise<string>((resolve) => {
          setTimeout(resolve, 2000, 'bla');
        })
      ]
  */
  //files.map((file) => file.text())
  useEffect(() => {
    const parse = async () => {
      const fileTexts = await Promise.all(files.map((file) => file.text()));
      setParsedFiles({
        data: fileTexts.map((text, index): ParsedFile => {
          try {
            const obj = JSON.parse(text);
            return {
              file: files[index],
              obj,
              text
            };
          } catch (error: any) {
            return {
              file: files[index],
              obj: {},
              text: undefined,
              error
            };
          }
        })
      });
    };
    parse();
  }, files);

  const validatedFiles =
    parsedFiles.data &&
    parsedFiles.data.map((it) => {
      const isValidFile = it.obj
        ? ValidateObject.of(
            it.obj,
            [importMediaSchema],
            new ErrorLogger(`${it.file.name}`)
          ).isValid()
        : false;
      return {
        ...it,
        validateError: isValidFile ? undefined : logger.get(`${it.file.name}`)?.get()
      };
    });

  return (
    <>
      <Box sx={{ display: 'flex', direction: 'column', marginTop: '40px' }}>
        <CheapSuspense fallback={<p>Loading...</p>}>
          {validatedFiles && (
            <Grid container sx={{ flexGrow: 1 }}>
              {validatedFiles.map((it) => (
                <ValidationResult {...it} />
              ))}
            </Grid>
          )}
        </CheapSuspense>
      </Box>
      <StepBox
        backEnable
        nextEnable={validatedFiles?.reduce(
          (accu, it) => accu || !(it.error || it.validateError),
          false
        )}
        nextOption={
          validatedFiles?.reduce((accu, it) => accu && !(it.error || it.validateError), true)
            ? 'NEXT'
            : 'NEXT WITH ONLY VALID FILES'
        }
        onNext={() => {
          setValidFiles(validatedFiles?.filter((it) => !(it.error || it.validateError)) ?? []);
        }}
      />
    </>
  );
};

const CheapSuspense: React.FC<PropsWithChildren & { fallback?: ReactNode | undefined }> = ({
  children,
  fallback
}) => (children === undefined ? fallback : children);

const ValidationResult: React.FC<ParsedFile> = (it) => {
  console.log('<ValidationResult>');
  const hasErrors = it.validateError || it.error;
  return (
    <Grid
      container
      spacing={2}
      component={Paper}
      variant='outlined'
      size={{ xs: 12 }}
      sx={{ borderWidth: 1.5, padding: '8px', margin: '8px 16px', flexGrow: 1 }}>
      <Grid
        size={{ xs: 12 }}
        sx={{ borderBottom: hasErrors ? '1.5px solid rgb(224, 224, 224)' : undefined }}>
        <Typography
          variant='h5'
          component={'span'}
          sx={{ mr: '4px', fontStyle: 'italic', textDecoration: 'underline' }}>
          {it.file.name}
        </Typography>
        <Typography variant='body2' component={'span'} sx={{ color: '#606060' }}>
          ({Math.ceil(it.file.size / 1024)}KB)
        </Typography>
        <Typography
          variant='h6'
          component={'span'}
          color={hasErrors ? 'error' : 'success'}
          sx={{ marginLeft: '12px', textDecoration: 'underline' }}>
          {hasErrors ? 'ERROR' : 'VALID'}
        </Typography>
      </Grid>
      {hasErrors && (
        <Fragment key={`${it.file.name}`}>
          {it.error && (
            <ShowError
              type='Syntax-Error'
              typeColor='rgb(255, 168, 168)'
              msg={it.error?.message ?? 'Unknown Error'}
            />
          )}
          {logger
            .get(`${it.file.name}`)
            ?.get()
            .map((msg, index) => (
              <ShowError key={index} type='SchemaError' typeColor='rgb(255, 215, 156)' msg={msg} />
            ))}
        </Fragment>
      )}
    </Grid>
  );
};

const ShowError: React.FC<{ msg: string; type: string; typeColor?: string }> = ({
  msg,
  type,
  typeColor
}) => (
  <>
    <Grid size={{ xs: 2 }}>
      <Typography
        sx={{
          backgroundColor: typeColor,
          border: '1.5px solid rgb(166,166,166)',
          borderRadius: '6px'
        }}
        align={'center'}>{`(${type})`}</Typography>
    </Grid>
    <Grid size={{ xs: 10 }}>
      <Typography color='error' sx={{ flexGrow: 1 }}>
        {msg}
      </Typography>
    </Grid>
  </>
);
