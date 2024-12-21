import { Box, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { Fragment, Suspense, useState } from 'react';
import { NoDataAvailable } from './InfoBox';
import { convertDuration } from '../../utils/duration';
import { AccordionGroup } from './AccordionGroup';
import { ErrorBoundary } from 'react-error-boundary';
import { useGetTranscripts } from '../../queries/useGetTranscript';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export interface Transcript {
  language: string;
  chapters: Chapter[];
}
export interface Chapter {
  id?: string;
  heading?: string;
  from?: number;
  to?: number;
}

interface ChapterWithToggle extends Chapter {
  isOpen: boolean;
}

export const TranscriptBox: React.FC<{
  transcripts: Transcript[];
  mediumUrl?: string;
}> = ({ transcripts, mediumUrl }) => {
  const [language, setLanguage] = useState(transcripts.length > 0 ? transcripts[0].language : '');
  const [allOpen, setAllOpen] = useState(false);

  const handleChapterStates = (otherLanguage: string) => {
    const chapterStates: ChapterWithToggle[] =
      transcripts
        .find(({ language }) => language === otherLanguage)
        ?.chapters?.map((chapter) => ({
          ...chapter,
          isOpen: false
        })) ?? [];
    return chapterStates;
  };

  const [toggleChapters, setToggleChapters] = useState(handleChapterStates(language));

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
    setToggleChapters(handleChapterStates(event.target.value));
  };

  const handleChangeToggleChapter = (indicies: number[], newOpenState: boolean) => {
    if (indicies.length === toggleChapters.length) {
      setAllOpen(newOpenState);
    }
    const c = [...toggleChapters];
    indicies.forEach((id) => {
      c[id] = { ...c[id], isOpen: newOpenState };
    });
    setToggleChapters(c);
  };

  if (transcripts.length === 0) {
    return <p>Transcripts: No data</p>;
  }

  return (
    <>
      <Grid container size={{ xs: 12 }}>
        <Grid size={{ xs: 11 }}>
          <Typography component={'span'} sx={{ margin: '0px 4px' }}>
            Transcript languages:{' '}
          </Typography>
          <Select
            size='small'
            labelId='transcriptLanguageLabel'
            id='transcriptLanguageId'
            value={language}
            onChange={handleChangeLanguage}>
            {transcripts.map(({ language }) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid size={{ xs: 1 }} justifyContent={'end'}>
          <Grid container wrap='nowrap' justifyContent={'space-between'}>
            <Box />
            <IconButton
              sx={{ mr: '8px' }}
              onClick={() => {
                handleChangeToggleChapter(
                  toggleChapters.map((_, i) => i),
                  !allOpen
                );
              }}>
              {allOpen ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <AccordionGroup
        parts={toggleChapters.map(({ id, heading, from, to, isOpen }) => {
          return {
            id,
            details: (id?: string) => <TranscriptText id={id} />,
            isOpen: isOpen,
            summary: <ChapterSummary {...{ heading, from, to, url: mediumUrl }} />
          };
        })}
        onChange={handleChangeToggleChapter}
      />
    </>
  );
};

const TranscriptText: React.FC<{ id?: string }> = ({ id }) => {
  return id ? (
    <ErrorBoundary fallback={<p>Error finding Transcript</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        <TranscriptTextContainer id={id} />
      </Suspense>
    </ErrorBoundary>
  ) : (
    <NoDataAvailable size='Long' />
  );
};

const TranscriptTextContainer: React.FC<{ id: string }> = ({ id }) => {
  const transcripts = useGetTranscripts([id]);
  return transcripts && transcripts?.length > 0 ? (
    transcripts[0].text
      ?.replaceAll('\n\n', '\n')
      .split('\n')
      .map((textPart, index) =>
        textPart.length === 0 ? (
          <br key={index + 'br'}></br>
        ) : (
          <Fragment key={index}>
            <Typography>{textPart}</Typography>
          </Fragment>
        )
      )
  ) : (
    <NoDataAvailable size='Long' />
  );
};

const ChapterSummary: React.FC<{
  heading?: string;
  from?: number;
  to?: number;
  url?: string;
}> = ({ heading, from, to, url }) => {
  const newUrl = buildYoutubeTimestampLink(url, from);
  console.log('newUrl:', newUrl);
  return (
    <>
      {heading ? (
        <Typography sx={{ width: '90%', flexShrink: 0 }}>{heading}</Typography>
      ) : (
        <NoDataAvailable overrideText='No title available' />
      )}
      <Grid
        container
        sx={{ cursor: newUrl ? 'pointer' : 'default' }}
        onClick={(event) => {
          console.log('url', newUrl);
          if (newUrl) {
            event.preventDefault();
            window.open(newUrl, '_blank');
          }
        }}>
        <a style={{ display: 'inherit' }} {...(newUrl ? { href: newUrl } : {})}>
          {from !== undefined ? (
            convertDuration(from)
          ) : (
            <NoDataAvailable overrideStyle={{ mr: 0.5 }} size='Short' />
          )}
          {' - '}
          {to !== undefined ? convertDuration(to) : <NoDataAvailable size='Short' />}
        </a>
      </Grid>
    </>
  );
};

export const buildYoutubeTimestampLink = (url?: string, from?: number): string | undefined => {
  if (!url || from === undefined) {
    return undefined;
  }
  try {
    const parsedURL = new URL(url);
    if (parsedURL.host.includes('youtube.com') && parsedURL.searchParams.get('v')) {
      parsedURL.searchParams.set('t', from.toString());
      const a = parsedURL.toString();
      console.log('a:', a);
      return a;
    }
  } catch (error: any) {
    return undefined;
  }
};
