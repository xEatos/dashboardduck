import React, { useState } from 'react';
import { ImportStepper } from './ImportStepper';
import { UploadPanel } from './UploadPanel';
import { ParsedFile, ValidateDataPanel } from './ValidateDataPanel';
import { DataPreviewPanel } from './DataPreviewPanel';
import { useMutation } from '@apollo/client';
import { VERIFY_IMPORT } from '../../mutations/useVerifyUpload';
import { WlpImportInput } from '../../__generated__/graphql';
import { AuthenticatePanel } from './AuthenticatePanel';

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
  thumbnailURL: string;
  reference: {
    URL: string;
    publishedBy?: string;
    hostedBy?: string;
  }[];
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
  const [sendImportData, { data: verifyLink }] = useMutation(VERIFY_IMPORT);
  console.log('verify link:', verifyLink);

  const handleSendImportData = (wlpImport: WlpImportInput) => {
    sendImportData({
      variables: {
        wlpImport
      }
    });
  };

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
          page: <DataPreviewPanel validFiles={validFiles} sendImportData={handleSendImportData} />
        },
        {
          label: 'Authenticate BN Wikibase Account',
          page: <AuthenticatePanel link={verifyLink} />
        },
        {
          label: 'Finish',
          page: <p>4</p>
        }
      ]}
    />
  );
};
