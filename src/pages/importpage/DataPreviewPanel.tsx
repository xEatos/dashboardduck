import React from 'react';
import { ParsedFile } from './ValidateDataPanel';
import { StepBox } from './ImportStepper';
import { ImportMedium } from './ImportPage';
import { MediaGrid } from '../searchpage/MediaGridPanel';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface Props {
  validFiles: ParsedFile[];
}
export const DataPreviewPanel: React.FC<Props> = ({ validFiles }) => {
  console.log(validFiles);
  const media = validFiles.flatMap((file) => (file.obj?.media as ImportMedium[]) ?? []);

  return (
    <>
      <Box sx={{ marginTop: '40px' }} />
      <MediaGrid
        media={media.map((importMedium, index) => ({
          id: `D${index}`,
          cursor: `${index}`,
          type: importMedium.type,
          channel: importMedium.reference.publishedBy,
          date: importMedium.publicationDate,
          duration: importMedium.duration,
          thumbnail: importMedium.thumbnailURL,
          title: importMedium.title
        }))}
      />
      <StepBox backEnable nextEnable={false} />
    </>
  );
};
