import React, { Suspense, useContext, useEffect, useState } from 'react';
import { useGetMedia } from '../../queries/useGetMedia';
import { SearchQueryContext } from './SearchPage';
import {
  FilterSelection,
  FilterSelectionInput,
  MediumEdge,
  PageInfo,
  WikiData
} from '../../__generated__/graphql';
import {
  compareWikiData,
  mapToWikiDataInput,
  wikiDataToStringWithId
} from '../../utils/wikiDataFunctions';
import { MediumCard, MediumCardProp } from '../../components/MediumCard';
import Grid from '@mui/material/Grid2';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert, CircularProgress, Pagination, PaginationItem, Typography } from '@mui/material';
import { WikiDataChip } from './FilterGroup';
import { AddCircle } from '@mui/icons-material';

const toModel = ({ cursor, node }: MediumEdge): MediumCardProp => ({
  id: node.id,
  cursor: cursor.toString(),
  title: node.title ?? '',
  channel: node.channel ?? '',
  date: node.publication ?? '',
  duration: node.duration ?? NaN,
  thumbnail: new URL(node.thumbnail ?? ''),
  type: node.type ?? 'Video'
});

type OffsetMap = Record<string, number>;

type PageMetaData = {
  offsetMap: OffsetMap;
  infos: PageInfo[];
};

type MediaPageState = {
  current: number;
  metaData: Record<number, PageMetaData>;
};

const defaultPagination = {
  current: 1,
  metaData: {
    1: { offsetMap: {}, infos: [] }
  }
};

export const MediaCollection: React.FC<{
  limit: number;
  filterInput: FilterSelectionInput[] | undefined;
}> = ({ limit, filterInput }) => {
  const [pagination, setPagination] = useState<MediaPageState>(defaultPagination);

  const { foundFilters, mediaPages, nextPageOffsetMap } = useGetMedia(
    limit,
    Object.entries(pagination.metaData[pagination.current].offsetMap).map(
      ([provenance, offset]) => ({ offset, provenance })
    ),
    filterInput
  );

  useEffect(() => {
    setPagination(defaultPagination);
  }, [filterInput]);

  return (
    <Grid container direction={'column'} sx={{ marginTop: '12px' }}>
      <Grid container>
        <FilterAlert filters={foundFilters} />
      </Grid>
      <Grid
        container
        sx={{
          flex: '1 1 auto',
          overflowY: 'auto',
          height: '0px',
          scrollbarColor: '#1976d2 #e4e4e4',
          scrollbarWidth: 'thin'
        }}>
        {mediaPages.flatMap((page) =>
          page.edges?.map((edge) => (
            <Grid key={page.pageInfo.provenance + edge.cursor} sx={{ padding: '6px' }}>
              <MediumCard {...toModel(edge)} />
            </Grid>
          ))
        )}
      </Grid>
      <Grid container size={{ xs: 12 }} sx={{ justifyContent: 'center', margin: '16px 0px' }}>
        <MediaPagesPagination
          pagination={pagination}
          offsetMap={nextPageOffsetMap}
          pageInfos={mediaPages.map((value) => value.pageInfo)}
          jump={(targetPagination: MediaPageState) => {
            setPagination(targetPagination);
          }}
        />
      </Grid>
    </Grid>
  );
};

export const FilterAlert: React.FC<{ filters: FilterSelection[] }> = ({ filters }) => {
  const query = useContext(SearchQueryContext);

  return filters.length > 0 ? (
    <Alert severity='info' sx={{ margin: '4px' }}>
      <Typography variant='caption'>
        We also found some faceted filter inputs, if you meant to search for content based on this
        filters instead of text add them to your filters
      </Typography>
      <Grid container sx={{ flexDirection: 'column' }}>
        {Object.entries(
          filters
            .filter(
              (fs) =>
                query.filterInputs[fs.filterId]?.find(
                  (it) => compareWikiData(it, fs.data[0]) === 0
                ) === undefined
            )
            .reduce(
              (acc: Record<string, WikiData[]>, filter) => ({
                ...acc,
                [filter.filterId]: [...(acc[filter.filterId] ?? []), filter.data[0]]
              }),
              {}
            )
        ).map(([filterId, data]) => (
          <Grid key={filterId} container sx={{ alignItems: 'center' }}>
            <Typography mr={0.5}>{filterId}: </Typography>
            {data.map((it) => (
              <WikiDataChip
                key={wikiDataToStringWithId(it) + filterId}
                wikiData={it}
                height='24px'
                overrideSx={{ margin: '0px 2px' }}
                overrideIcon={<AddCircle />}
                onDelete={() => {
                  query.updateFilter(filterId, [...(query.filterInputs[filterId] ?? []), it]);
                }}
              />
            ))}
          </Grid>
        ))}
      </Grid>
    </Alert>
  ) : null;
};

const hasNextPage = (infos: PageInfo[]): boolean =>
  infos.reduce((acc, info) => info.hasNextPage || acc, false);

const getLastPage = (metaData: Record<number, PageMetaData>): PageMetaData => {
  const highestPageNumber = Object.entries(metaData).reduce(
    (acc, [key, metaData]) =>
      acc < Number(key) && metaData.infos && metaData.infos.length > 0 ? Number(key) : acc,
    1
  );
  return metaData[highestPageNumber];
};

const MediaPagesPagination: React.FC<{
  pagination: MediaPageState;
  offsetMap: OffsetMap; // from current query of pagination.current
  pageInfos: PageInfo[]; // from current query of pagination.current
  jump: (targetPagination: MediaPageState) => void;
}> = ({ pagination, offsetMap, pageInfos, jump }) => {
  console.log('pageInfos:', pageInfos, 'hasNextPage', hasNextPage(pageInfos));
  const _pageination: MediaPageState = {
    ...pagination,
    metaData: {
      ...pagination.metaData,
      [pagination.current]: {
        ...pagination.metaData[pagination.current],
        infos: pageInfos
      },
      ...(hasNextPage(pageInfos)
        ? {
            [pagination.current + 1]: {
              ...pagination.metaData[pagination.current + 1],
              offsetMap
            }
          }
        : {})
    }
  };
  console.log('_pageination:', _pageination);
  const count = Object.entries(_pageination.metaData).length;

  return (
    <Pagination
      page={_pageination.current}
      count={Math.max(count - 1, 1)}
      siblingCount={1}
      boundaryCount={1}
      onChange={(_, targetPage) => {
        jump({ ..._pageination, current: targetPage });
      }}
      renderItem={(item) => {
        switch (item.type) {
          case 'previous': {
            return item.page === 0 ? (
              <PaginationItem component='button' {...item} disabled />
            ) : (
              <PaginationItem component='button' {...item} />
            );
          }
          case 'next': {
            return item.page && item.page <= count ? (
              <PaginationItem component='button' {...item} disabled={false} />
            ) : (
              <PaginationItem component='button' {...item} />
            );
          }
        }
        return <PaginationItem component='button' {...item} />;
      }}
    />
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
        <MediaCollection limit={50} filterInput={filerSelectionInput} />
      </Suspense>
    </ErrorBoundary>
  );
};
