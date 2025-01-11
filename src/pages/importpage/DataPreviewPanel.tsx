import React, { useState } from 'react';
import { ParsedFile } from './ValidateDataPanel';
import { StepBox } from './ImportStepper';
import { ImportMedium } from './ImportPage';
import { MediaGrid } from '../searchpage/MediaGridPanel';
import { Box, Pagination, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getUserSession } from '../integrationpage/IntegrationPage';
import { WlpImportInput, WlpVideoInput } from '../../__generated__/graphql';

interface Props {
  validFiles: ParsedFile[];
  sendImportData: (wlpImport: WlpImportInput) => void;
}

const elementsPerPage = 50;

export const DataPreviewPanel: React.FC<Props> = ({ validFiles, sendImportData }) => {
  const user = getUserSession();
  console.log('DataPreviewPanel - user:', user);
  const media = validFiles.flatMap((file) => (file.obj?.media as ImportMedium[]) ?? []);

  if (user === undefined) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography>Please login in first to authenticate this import</Typography>
      </Box>
    );
  }

  const wlpVideos: WlpVideoInput[] = media.map((medium) => {
    return {
      watchId: new URL(medium.reference[0].URL).searchParams.get('v')!!,
      categories: Array.isArray(medium.category)
        ? medium.category
        : medium.category
          ? [medium.category]
          : []
    };
  });

  return (
    <>
      <Box sx={{ marginTop: '40px' }} />
      <DataPreviewGridView media={media} />
      <StepBox
        backEnable
        onNext={() => {
          sendImportData({
            userId: user.userId,
            wlpVideos
          });
        }}
        nextEnable
      />
    </>
  );
};

const DataPreviewGridView: React.FC<{ media: ImportMedium[] }> = ({ media }) => {
  const [page, setPage] = useState(0);

  return (
    <>
      <Pagination
        count={Math.ceil(media.length / elementsPerPage)}
        color='primary'
        onChange={(_, value) => {
          setPage(value - 1);
        }}
      />
      <Box />
      <MediaGrid
        media={media
          .slice(page * elementsPerPage, (page + 1) * elementsPerPage)
          .map((importMedium, index) => ({
            id: `D${index}`,
            cursor: `${index}`,
            type: importMedium.type,
            channel: importMedium.reference[0].publishedBy ?? 'Unknown',
            date: importMedium.publicationDate ?? 'Unknown',
            duration: importMedium.duration,
            thumbnail: new URL(importMedium.thumbnailURL),
            title: importMedium.title
          }))}
      />
    </>
  );
};
