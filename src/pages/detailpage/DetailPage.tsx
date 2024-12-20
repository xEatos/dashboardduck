import React, { Fragment, Suspense } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { WikiData } from '../../__generated__/graphql';
import { wikiDataToStringWithId } from '../../utils/wikiDataFunctions';
import { useGetMedium } from '../../queries/useGetMedium';
import { InfoBox, LanguageInfoBox } from './InfoBox';
import { Box, Container, CssBaseline, MenuItem, Paper, Select } from '@mui/material';
import { TranscriptBox } from './TranscriptBox';

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
  console.log(mediumProps.mediumId);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
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
            thumbnail={data.thumbnail ? new URL(data.thumbnail) : undefined}
          />

          <LanguageInfoBox spoken={data.languages ?? []} subtitles={data.subtitleLanguages ?? []} />
          <TranscriptBox chapters={} />
        </Box>
      </Container>
    </React.Fragment>
  );
};
