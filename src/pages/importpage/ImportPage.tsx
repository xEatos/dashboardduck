import React, { Suspense, useEffect, useState } from 'react';
import { ImportStepper } from './ImportStepper';
import { UploadPanel } from './UploadPanel';
import { ParsedFile, ValidateDataPanel } from './ValidateDataPanel';
import { DataPreviewPanel } from './DataPreviewPanel';
import { useMutation } from '@apollo/client';
import { VERIFY_IMPORT } from '../../mutations/useVerifyUpload';
import { WlpImportInput } from '../../__generated__/graphql';
import { AuthenticatePanel } from './AuthenticatePanel';
import { START_IMPORT } from '../../mutations/useStartUpload';
import { ImportStatusPanel } from './ImportStatusPanel';
import { getUserSession, User } from '../integrationpage/IntegrationPage';
import { CircularProgress, Typography } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { useHasRunningImports } from '../../queries/useGetHasRunningImport';
import { client } from '../../App';

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
  categories?: string | string[];
  transcript?: ImportMediumTranscript[];
  subtitleLanguage?: string | string[]; // in ISO 693-1 format
  duration: number; // in seconds
};

export type ImportMedia = {
  media: ImportMedium[];
};

export const ImportPage: React.FC = () => {
  console.log('<ImportPage>');
  const user = getUserSession();

  return (
    <ErrorBoundary fallback={<Typography color='error'>Error</Typography>}>
      <Suspense fallback={<CircularProgress />}>
        {user ? (
          <ImportPageContent {...user} />
        ) : (
          <Typography variant='h6'>Please, Login first to start an upload</Typography>
        )}
      </Suspense>
    </ErrorBoundary>
  );
};

const ImportPageContent: React.FC<User> = ({ userId }) => {
  console.log('ImportPageContent - userId:', userId);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [validFiles, setValidFiles] = useState<ParsedFile[]>([]);
  const [activeJobId, setActiveJobId] = useState<string | undefined>(undefined);
  const [sendImportData, { data: verifyLink }] = useMutation(VERIFY_IMPORT);
  const [startImport, { data: startMsg }] = useMutation(START_IMPORT);
  const hasRunningJobsData = useHasRunningImports(userId);

  const initStep = hasRunningJobsData.hasUserRunningImport.uploadId === 'UNKNOWN' ? 0 : 4;
  /*
  const uploadId =
    hasRunningJobsData.hasUserRunningImport.uploadId === 'UNKNOWN'
      ? startMsg?.startWlpVideosImport.message
      : hasRunningJobsData.hasUserRunningImport.uploadId;
  */

  useEffect(() => {
    if (hasRunningJobsData?.hasUserRunningImport.uploadId !== 'UNKNOWN') {
      setActiveJobId(hasRunningJobsData.hasUserRunningImport.uploadId);
    }
  }, [hasRunningJobsData]);

  useEffect(() => {
    if (startMsg) {
      setActiveJobId(startMsg.startWlpVideosImport.message);
    }
  }, [startMsg]);

  const handleReset = () => {
    setUploadedFiles([]);
    setValidFiles([]);
    setActiveJobId(undefined);
  };

  console.log('verify link:', verifyLink);
  console.log('uploadId:', activeJobId);
  console.log('startMsg:', startMsg);
  console.log('hasRunningJobsData:', hasRunningJobsData.hasUserRunningImport);

  client.cache.reset();

  const handleSendImportData = (wlpImport: WlpImportInput) => {
    sendImportData({
      variables: {
        wlpImport
      }
    });
  };

  const handleStartImport = (userId: string) => {
    startImport({
      variables: {
        userId
      }
    });
  };

  return (
    <ImportStepper
      initStep={initStep}
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
          page: <AuthenticatePanel link={verifyLink} startUpload={handleStartImport} />
        },
        {
          label: startMsg?.startWlpVideosImport.message !== 'Failed' ? 'Progress or Done' : 'Error',
          page:
            activeJobId && activeJobId !== 'Failed' ? (
              <ImportStatusPanel uploadId={activeJobId} reset={handleReset} />
            ) : (
              <p>PAGEERROR</p>
            )
        }
      ]}
    />
  );
};
