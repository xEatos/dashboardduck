import { Clear, CloudUpload, Description, UploadFile } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Stack,
  styled,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { convertDownLevelIteration, union } from '../utils/functions';

type UploadContentProps = {
  file: File;
  success: Boolean;
  onHandleRemove: (fileName: File) => void;
};

const UploadContent = (props: UploadContentProps) => {
  return (
    <CardActions
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <Stack
        direction={'row'}
        sx={{ display: 'flex', alignItems: 'center', paddingRight: '24px' }}
        spacing={{ sm: 1 }}>
        <Description />
        <Box>
          <Typography variant='body1'>{props.file.name}</Typography>
          <Typography variant='body2' sx={{ color: props.success ? 'green' : 'red' }}>
            {props.success ? 'File successfully uploaded' : 'File upload failed'}
          </Typography>
        </Box>
      </Stack>
      <IconButton onClick={() => props.onHandleRemove(props.file)}>
        <ClearIcon />
      </IconButton>
    </CardActions>
  );
};

// Move to style ts
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

export interface UploadCardProps {
  fileTypes: string[];
  files: File[];
  setFiles: (files: File[]) => void;
  maxSize: number;
  maxFiles: number;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  files,
  setFiles,
  fileTypes,
  maxSize,
  maxFiles
}) => {
  const handleOnFilesSelected = (otherFiles: FileList) => {
    const fs = convertDownLevelIteration(otherFiles).filter((file) =>
      fileTypes.includes(file.type)
    );
    setFiles(union(fs, files, (a, b) => a.name === b.name));
  };

  return (
    <Card
      variant='outlined'
      sx={{ minWidth: 450, maxWidth: 450, margin: '40px 8px 8px 8px', borderWidth: '0px' }}>
      <CardContent
        sx={{
          border: '1px solid grey',
          borderRadius: '4px',
          margin: '4px',
          height: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
        }}
        onDrop={(event) => {
          event.preventDefault();
          handleOnFilesSelected(event.dataTransfer.files);
        }}>
        <UploadFile fontSize='large' />
        <Typography variant='body1'>{'Drag and drop file here to upload'}</Typography>
        <Typography variant='body2'>{'Or click the "Select files..." button below.'}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant='outlined'
          component='label'
          role={undefined}
          tabIndex={-1}
          startIcon={<CloudUpload />}>
          Select files
          <VisuallyHiddenInput
            type='file'
            accept='application/json'
            onChange={(event) => {
              handleOnFilesSelected(event.target.files ?? new FileList());
            }}
            multiple
          />
        </Button>
      </CardActions>
      <Collapse in={files.length > 0}>
        <CardContent>
          {files.map((file) => (
            <UploadContent
              key={file.name}
              file={file}
              success // if not successfull show error
              onHandleRemove={(fileToRemove: File) => {
                setFiles(files.filter((f) => f.name !== fileToRemove.name));
              }}
            />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};
