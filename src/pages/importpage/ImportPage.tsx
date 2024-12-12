import React, { useState } from 'react';
import { UploadCard } from '../../components/UploadCard';
import Grid from '@mui/material/Grid2';
import { ImportExamplePanel } from './ImportExample';
import { Button, Typography } from '@mui/material';
import { importMediaSchema, ValidateObject } from './utils/schemaValidation';
import { ImportStepper } from './ImportStepper';
import { UploadPanel } from './UploadPanel';
import { ValidateDataPanel } from './ValidateDataPanel';

type ImportMediumTranscript = {
  language: string; // in ISO 693-1 format
  sections?: {
    heading: string;
    startTimestamp?: number;
    endTimestamp?: number;
    text: string;
  }[];
};

type ImportMedium = {
  type: 'Video' | 'Podcast';
  title: string;
  publicationDate: string; // in ISO 8691 format
  language?: string | string[]; // in ISO 693-1 format
  thumbnailURL: URL;
  reference: {
    URL: URL;
    publishedBy: string;
    hostedBy?: string;
  };
  category?: string;
  transcript?: ImportMediumTranscript[];
  subtitleLanguage?: string | string[]; // in ISO 693-1 format
  duration: number; // in seconds
};

type ImportMedia = {
  media: ImportMedium[];
};

export const ImportPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  return (
    <ImportStepper
      initStep={0}
      steps={[
        {
          label: 'Upload Data',
          page: <UploadPanel {...{ uploadedFiles, setUploadedFiles }} />
        },
        {
          label: 'Validate Data Check',
          page: <ValidateDataPanel file={uploadedFiles[0]} />
        },
        {
          label: 'Data Preview',
          page: <p>2</p>
        },
        {
          label: 'Finish',
          page: <p>3</p>
        }
      ]}
    />
  );
};
