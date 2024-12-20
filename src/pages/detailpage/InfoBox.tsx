import React, { Fragment, useEffect, useState } from 'react';
import { ValueType, WikiData } from '../../__generated__/graphql';
import { LocalDate } from '@js-joda/core';
import Grid from '@mui/material/Grid2';
import { Paper, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { WikiDataChip } from '../searchpage/FilterGroup';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { convertDuration } from '../../utils/duration';
import { wikiDataToStringWithId } from '../../utils/wikiDataFunctions';

interface InfoBoxProps {
  title?: string | null;
  thumbnail?: URL;
  categories?: WikiData[];
  publicationDate?: string;
  duration?: number;
  description?: string;
  educationlevel?: WikiData;
  educationUsage?: WikiData;
}

const NoDataAvailable: React.FC<{
  variant?: Variant;
  size?: 'Short' | 'Middle' | 'Long';
  overrideText?: string;
}> = ({ variant, size = 'Middle', overrideText }) => {
  return (
    <Typography variant={variant} sx={{ fontStyle: 'italic' }}>
      {(overrideText ?? size === 'Short')
        ? 'n.a'
        : size === 'Middle'
          ? 'No data'
          : 'No data available'}
    </Typography>
  );
};

export const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  categories,
  description,
  duration,
  educationUsage,
  educationlevel,
  publicationDate,
  thumbnail
}) => {
  return (
    <Grid container direction='column' sx={{ padding: '0px 0px' }} spacing={1}>
      <Grid container wrap='nowrap' spacing={2}>
        <img
          src={thumbnail?.toString()}
          height={'180px'}
          width={'320px'}
          style={{ borderRadius: '12px' }}
        />
        <LeftInfoBox {...{ title, categories, duration, educationlevel, educationUsage }} />
      </Grid>
      <DescriptionBox {...{ date: publicationDate, description, duration }} viewHeight={150} />
    </Grid>
  );
};

const LeftInfoBox: React.FC<InfoBoxProps> = ({
  title,
  categories,
  educationUsage,
  educationlevel
}) => {
  return (
    <Grid container direction='column' justifyContent={'space-between'}>
      <Grid container justifyContent={'space-between'} wrap='nowrap'>
        {title ? (
          <Typography component={'span'} variant='h4'>
            {title}
          </Typography>
        ) : (
          <NoDataAvailable overrideText='No Title' variant='h4' />
        )}
        {educationUsage || educationlevel ? (
          <EducationBox {...{ educationlevel, educationUsage }} />
        ) : null}
      </Grid>
      <Grid>
        <Typography component={'span'} sx={{ mr: 0.5 }}>
          Categories:
        </Typography>
        {categories?.map((category) => (
          <WikiDataChip
            key={wikiDataToStringWithId(category)}
            wikiData={category}
            overrideSx={{ mr: 0.5 }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

const EducationBox: React.FC<InfoBoxProps> = ({ educationlevel, educationUsage }) => {
  return (
    <Grid container>
      <Grid container>
        <Typography sx={{ mr: 0.5 }}>Educational Level:</Typography>
        {educationlevel ? (
          <WikiDataChip wikiData={educationlevel} />
        ) : (
          <NoDataAvailable size='Short' />
        )}
      </Grid>
      <Grid container>
        <Typography sx={{ mr: 0.5 }}>Educational Usage: </Typography>
        {educationUsage ? (
          <WikiDataChip wikiData={educationUsage} />
        ) : (
          <NoDataAvailable size='Short' />
        )}
      </Grid>
    </Grid>
  );
};

const DescriptionBox: React.FC<{
  description?: string;
  duration?: number;
  date?: string;
  viewHeight?: number;
}> = ({ date, duration, description, viewHeight }) => {
  const [isOpen, setOpen] = useState(false);

  let parsedDate = undefined;
  try {
    parsedDate = date ? LocalDate.parse(date) : undefined;
  } catch (e: any) {}

  const text = description
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
    );

  return (
    <Grid
      container
      direction='column'
      sx={{
        backgroundColor: '#f2f2f2',

        cursor: !isOpen ? 'pointer' : 'default',
        borderRadius: '12px',
        padding: '8px 16px'
      }}
      {...(!isOpen
        ? {
            onClick: () => {
              setOpen(true);
            }
          }
        : {})}>
      <Grid
        container
        sx={{
          maxHeight: !isOpen ? `${viewHeight}px` : 'auto',
          overflow: 'hidden'
        }}>
        <Grid container spacing={1} sx={{ marginLeft: '-2px' }}>
          <Grid container direction='row' sx={{ alignItems: 'center' }} spacing={0.5}>
            <TimerOutlinedIcon />
            {duration ? convertDuration(duration) : <NoDataAvailable />}
          </Grid>
          <Grid container direction='row' sx={{ alignItems: 'center' }} spacing={0.5}>
            <CalendarMonthOutlinedIcon />
            {parsedDate ? <Typography>{parsedDate.toString()}</Typography> : <NoDataAvailable />}
          </Grid>
        </Grid>
        <div>{description ? text : <NoDataAvailable size='Long' />}</div>
      </Grid>
      <Typography
        sx={{
          marginTop: !isOpen ? '-32px ' : undefined,
          padding: '4px 64px',
          background: 'radial-gradient(circle at center, rgb(242,242,242) 50%, transparent 100%)',
          alignSelf: 'center',
          cursor: 'pointer'
        }}
        {...(isOpen
          ? {
              onClick: () => {
                setOpen(false);
              }
            }
          : {})}>
        {isOpen ? '...show less' : '...show more'}
      </Typography>
    </Grid>
  );
};

export const LanguageInfoBox: React.FC<{ subtitles: string[]; spoken: string[] }> = ({
  spoken,
  subtitles
}) => (
  <Grid
    size={{ xs: 12 }}
    container
    sx={{
      padding: '8px 16px',
      border: '1.5px solid #f2f2f2',
      borderRadius: '12px',
      margin: '8px 0px'
    }}>
    {[
      { text: 'Spoken languages:', values: spoken },
      { text: 'Subtitle languages:', values: subtitles }
    ].map(({ text, values }) => (
      <Fragment key={text}>
        <Grid size={{ xs: 6 }}>
          <Typography component={'span'} sx={{ mr: 0.5 }}>
            {text}
          </Typography>
          {values.map((lang) => (
            <WikiDataChip
              overrideSx={{ mr: 0.5, marginTop: '-2px' }}
              key={lang}
              wikiData={{
                __typename: 'WikiDataLiteral',
                value: lang,
                type: ValueType.Iso639
              }}
            />
          ))}
        </Grid>
      </Fragment>
    ))}
  </Grid>
);
