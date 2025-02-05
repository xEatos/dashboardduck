import React, { Suspense, useContext } from 'react';
import { Medium, useGetMedia } from '../../queries/useGetMedia';
import { SearchQueryContext } from './SearchPage';
import { FilterSelectionInput, ValueType } from '../../__generated__/graphql';
import { mapToWikiDataInput } from '../../utils/wikiDataFunctions';
import { MediumCard } from '../../components/MediumCard';
import Grid from '@mui/material/Grid2';
import { ErrorBoundary } from 'react-error-boundary';
import { CircularProgress, Typography } from '@mui/material';

export interface MediaGridProps {
  media: Medium[];
}

export const MediaCollection: React.FC<{
  first: number;
  after: string | undefined;
  fiterInput: FilterSelectionInput[];
}> = ({ first, after, fiterInput }) => {
  const media = useGetMedia(first, after, fiterInput);

  return (
    <>
      {media.map((medium, index) => (
        <MediumCard key={index} {...medium} />
      ))}
    </>
  );
};

export const MediaGridPanel: React.FC = () => {
  const searchQuery = useContext(SearchQueryContext);

  const filerSelectionInput: FilterSelectionInput[] = Object.entries(searchQuery.filterInputs).map(
    ([filterId, data]) => {
      const [resources, literals] = mapToWikiDataInput(data);
      return { filterId, resources, literals };
    }
  );

  return (
    <ErrorBoundary fallback={<p>Error to retrieve Media</p>}>
      <Suspense fallback={<CircularProgress />}>
        <MediaCollection first={50} after={undefined} fiterInput={filerSelectionInput} />
      </Suspense>
    </ErrorBoundary>
  );
};
