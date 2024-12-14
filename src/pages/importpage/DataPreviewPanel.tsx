import React, { useState } from 'react';
import { ParsedFile } from './ValidateDataPanel';
import { StepBox } from './ImportStepper';
import { ImportMedium } from './ImportPage';
import { MediaGrid } from '../searchpage/MediaGridPanel';
import { Box, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface Props {
  validFiles: ParsedFile[];
}

const elementsPerPage = 50;

export const DataPreviewPanel: React.FC<Props> = ({ validFiles }) => {
  console.log(validFiles);
  const media = validFiles.flatMap((file) => (file.obj?.media as ImportMedium[]) ?? []);
  console.log(media);

  return (
    <>
      <Box sx={{ marginTop: '40px' }} />
      <DataPreviewGridView media={media} />
      <StepBox backEnable nextEnable={false} />
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
            channel: importMedium.reference.publishedBy ?? 'Unknown',
            date: importMedium.publicationDate ?? 'Unknown',
            duration: importMedium.duration,
            thumbnail: importMedium.thumbnailURL,
            title: importMedium.title
          }))}
      />
    </>
  );
};
