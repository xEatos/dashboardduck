import React, { PropsWithChildren, Suspense, useContext, useDeferredValue } from 'react';
import { Medium, useGetMedia } from '../../queries/useGetMedia';
import { SearchQueryContext } from './SearchPage';
import { FilterSelectionInput, ValueType } from '../../__generated__/graphql';
import { isSame, isSameWithUndef, mapToWikiDataInput } from '../../utils/wikiDataFunctions';
import { MediumCard } from '../../components/MediumCard';
import Grid from '@mui/material/Grid2';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, styled } from '@mui/material';

export interface MediaGridProps {
  media: Medium[];
}

const MediaGrid: React.FC<MediaGridProps> = ({ media }) => {
  return (
    <Grid
      container
      size={{ xs: 8 }}
      gap={2}
      spacing={2}
      sx={{
        padding: 1,
        border: '0px solid red',
        justifyContent: 'center',
        height: 'calc(100vh - 128px)',
        overflowY: 'scroll'
      }}>
      {media.map((medium) => {
        return Array(20)
          .fill(0)
          .map((_, index) => <MediumCard key={index} {...medium} />);
      })}
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
  //const deferredSearchQuery = useDeferredValue(searchQuery);

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

  //const isPending = deferredSearchQuery.freeSolo?.value !== searchQuery.freeSolo?.value;
  /*
  const isPending = isSameWithUndef(
    deferredSearchQuery.filterInputs['MediumTyp']?.[0],
    searchQuery.filterInputs['MediumTyp']?.[0]
  );
  */

  return (
    <ErrorBoundary fallback={<p>Error to retrieve Media</p>}>
      <Suspense fallback={<p>Skeleton</p>}>
        <PendingLayout isPending={false}></PendingLayout>
        <MediaGridWrapper first={50} after='0' fiterInput={filerSelectionInput} />
      </Suspense>
    </ErrorBoundary>
  );
};

const PendingLayout: React.FC<PropsWithChildren<{ isPending: boolean }>> = ({
  isPending,
  children
}) => (
  <div
    style={{
      backgroundColor: 'red',
      opacity: isPending ? 1 : 0.2,
      width: '100px',
      height: '100px'
    }}>
    {children}
  </div>
);
