import React, { Fragment, Suspense } from 'react';
import Grid from '@mui/material/Grid2';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { WikiData } from '../../__generated__/graphql';
import { wikiDataToStringWithId } from '../../utils/wikiDataFunctions';
import { useGetMedium } from '../../queries/useGetMedium';
import { InfoBox, LanguageInfoBox, NoDataAvailable } from './InfoBox';
import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  MenuItem,
  Paper,
  Select
} from '@mui/material';
import { TranscriptBox } from './TranscriptBox';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';

interface MediumLoaderData {
  params: { mediumId: string };
}

export const mediumLoader: LoaderFunction<MediumLoaderData> = (context) => {
  return { mediumId: { __typename: 'WikiDataResource', id: context.params.mediumId, label: '' } };
};

export interface DetailPageProps {
  mediumId: WikiData;
}

export const DetailPage: React.FC<{ offset?: number }> = ({ offset = 0 }) => {
  const mediumProps = useLoaderData();

  return (
    <>
      <Suspense fallback={<CircularProgress />}>
        <DetailPageContainer offset={offset} id={decodeURIComponent(mediumProps.mediumId.id)} />
      </Suspense>
    </>
  );
};

export const DetailPageContainer: React.FC<{ id: string; offset: number }> = ({ id, offset }) => {
  const data = useGetMedium(id);

  if (!data) {
    return <p>No Data</p>;
  }

  console.log(data);

  let mediumUrl = undefined;
  let thumbnailUrl = undefined;
  try {
    thumbnailUrl = data.thumbnail ? new URL(data.thumbnail) : undefined;
    mediumUrl = data.thumbnail
      ? new URL(
          `https://www.youtube.com/watch?v=${data.thumbnail.split('/').filter((_, index, ary) => index === ary.length - 2)}`
        ).toString()
      : undefined;
  } catch (e: any) {}

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component={Paper} sx={{ padding: '24px 0px' }}>
        <Box sx={{ minHeight: `calc(100vh - ${offset + 48}px)` }}>
          <InfoBox
            title={data.title}
            categories={data.categories}
            description={data.caption?.text}
            duration={data.duration ? data.duration : undefined}
            publicationDate={data.publication ? data.publication : undefined}
            educationUsage={undefined}
            educationlevel={undefined}
            thumbnail={thumbnailUrl}
          />

          <LanguageInfoBox spoken={data.languages ?? []} subtitles={data.subtitleLanguages ?? []} />
          {data.transcripts ? (
            <TranscriptBox
              mediumUrl={mediumUrl}
              transcripts={data.transcripts.map((transcript) => ({
                language: transcript.language,
                chapters:
                  transcript.chapters?.map(({ id, heading, startTimestamp, endTimestamp }) => ({
                    id: id ?? undefined,
                    heading: heading ?? undefined,
                    from: startTimestamp ?? undefined,
                    to: endTimestamp ?? undefined
                  })) ?? []
              }))}
            />
          ) : (
            <NoDataAvailable overrideText='No Transcript available' />
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};
