import React, { Suspense, useContext } from 'react';
import { Medium, useGetMedia } from '../../queries/useGetMedia';
import { SearchQueryContext } from './SearchPage';
import { FilterSelectionInput, ValueType } from '../../__generated__/graphql';
import { mapToWikiDataInput } from '../../utils/wikiDataFunctions';
import { MediumCard } from '../../components/MediumCard';
import Grid from '@mui/material/Grid2';
import { ErrorBoundary } from 'react-error-boundary';

export interface MediaGridProps {
  media: Medium[];
}

export const MediaGrid: React.FC<MediaGridProps> = ({ media }) => {
  return (
    <Grid
      container
      size={{ xs: 8 }}
      gap={2}
      spacing={2}
      sx={{
        padding: 2,
        border: '0px solid red',
        height: 'calc(100vh - 256px)',
        overflowY: 'scroll'
      }}>
      {media.map((medium, index) => (
        <MediumCard key={index} {...medium} />
      ))}
    </Grid>
  );
};

const MediaGridWrapper: React.FC<{
  first: number;
  after: string | undefined;
  fiterInput: FilterSelectionInput[];
}> = ({ first, after, fiterInput }) => {
  const data = useGetMedia(first, after, fiterInput);
  return <MediaGrid media={data} />;
};

export const MediaGridPanel: React.FC = () => {
  const searchQuery = useContext(SearchQueryContext);

  const filerSelectionInput: FilterSelectionInput[] = Object.entries(searchQuery.filterInputs).map(
    ([filterId, data]) => {
      const [resources, literals] = mapToWikiDataInput(data);
      return { filterId, resources, literals };
    }
  );

  if (searchQuery.freeSolo && searchQuery.freeSolo.value.length > 0) {
    filerSelectionInput.push({
      filterId: 'Text',
      literals: [{ value: searchQuery.freeSolo.value, type: ValueType.String }]
    });
  }

  return (
    <ErrorBoundary fallback={<p>Error to retrieve Media</p>}>
      <Suspense fallback={<p>Skeleton</p>}>
        <MediaGridWrapper first={50} after={undefined} fiterInput={filerSelectionInput} />
      </Suspense>
    </ErrorBoundary>
  );
};
