import React, { useState } from 'react';
import { ImportStepper } from './ImportStepper';
import { UploadPanel } from './UploadPanel';
import { ParsedFile, ValidateDataPanel } from './ValidateDataPanel';
import { DataPreviewPanel } from './DataPreviewPanel';

export type ImportMediumTranscript = {
  language: string; // in ISO 693-1 format
  sections?: {
    heading: string;
    startTimestamp?: number;
    endTimestamp?: number;
    text: string;
  }[];
};

export type ImportMedium = {
  type: 'Video' | 'Podcast';
  title: string;
  publicationDate?: string; // in ISO 8691 format
  language?: string | string[]; // in ISO 693-1 format
  thumbnailURL: URL;
  reference: {
    URL: URL;
    publishedBy?: string;
    hostedBy?: string;
  };
  category?: string | string[];
  transcript?: ImportMediumTranscript[];
  subtitleLanguage?: string | string[]; // in ISO 693-1 format
  duration: number; // in seconds
};

export type ImportMedia = {
  media: ImportMedium[];
};

export const ImportPage: React.FC = () => {
  console.log('<ImportPage>');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [validFiles, setValidFiles] = useState<ParsedFile[]>([]);

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
          page: <ValidateDataPanel files={uploadedFiles} setValidFiles={setValidFiles} />
        },
        {
          label: 'Data Preview',
          page: <DataPreviewPanel validFiles={validFiles} />
        },
        {
          label: 'Finish',
          page: <p>3</p>
        }
      ]}
    />
  );
};
